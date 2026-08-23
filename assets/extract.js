/* Client-side extraction of text (and images) from uploaded course material.
   Everything here runs in the browser — no file ever leaves the machine
   except as content sent directly to the AI provider the user configures. */

const RELS_NS = 'http://schemas.openxmlformats.org/package/2006/relationships';

function xmlText(str) {
  return new DOMParser().parseFromString(str, 'application/xml');
}

/** Resolves an OOXML relationship Target (often "../foo/bar.xml") against the
 *  directory containing the .rels file, the way ZIP part paths require. */
function resolveOoxmlPath(baseDir, target) {
  if (/^[a-z]+:\/\//i.test(target)) return null; // external URL, not a zip part
  const baseParts = baseDir.split('/').filter(Boolean);
  const targetParts = target.split('/').filter(Boolean);
  for (const part of targetParts) {
    if (part === '..') baseParts.pop();
    else if (part !== '.') baseParts.push(part);
  }
  return baseParts.join('/');
}

function getAllText(xmlDoc, tagName) {
  const nodes = xmlDoc.getElementsByTagName(tagName);
  const out = [];
  for (let i = 0; i < nodes.length; i++) out.push(nodes[i].textContent);
  return out.join(' ');
}

async function extractPptx(file) {
  const zip = await JSZip.loadAsync(file);

  // Resolve slide order via presentation.xml + its rels (falls back to filename sort).
  let orderedSlidePaths = [];
  try {
    const presXml = xmlText(await zip.file('ppt/presentation.xml').async('string'));
    const relsXml = xmlText(await zip.file('ppt/_rels/presentation.xml.rels').async('string'));
    const relMap = {};
    const rels = relsXml.getElementsByTagName('Relationship');
    for (let i = 0; i < rels.length; i++) {
      relMap[rels[i].getAttribute('Id')] = rels[i].getAttribute('Target');
    }
    const sldIds = presXml.getElementsByTagName('p:sldId');
    for (let i = 0; i < sldIds.length; i++) {
      const rId = sldIds[i].getAttribute('r:id') || sldIds[i].getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships', 'id');
      const target = relMap[rId];
      if (target) {
        const resolved = resolveOoxmlPath('ppt', target);
        if (resolved) orderedSlidePaths.push(resolved);
      }
    }
  } catch (e) {
    orderedSlidePaths = [];
  }
  if (orderedSlidePaths.length === 0) {
    orderedSlidePaths = Object.keys(zip.files)
      .filter(p => /^ppt\/slides\/slide\d+\.xml$/.test(p))
      .sort((a, b) => {
        const na = parseInt(a.match(/slide(\d+)\.xml$/)[1], 10);
        const nb = parseInt(b.match(/slide(\d+)\.xml$/)[1], 10);
        return na - nb;
      });
  }

  const parts = [];
  let slideNum = 0;
  for (const slidePath of orderedSlidePaths) {
    slideNum++;
    const slideEntry = zip.file(slidePath);
    if (!slideEntry) continue;
    const slideXml = xmlText(await slideEntry.async('string'));
    const slideText = getAllText(slideXml, 'a:t').trim();

    // Find the matching notes slide, if any, via this slide's own rels file.
    let notesText = '';
    try {
      const relsPath = slidePath.replace(/^(.*)\/([^/]+)$/, '$1/_rels/$2.rels');
      const relsEntry = zip.file(relsPath);
      if (relsEntry) {
        const relsXml = xmlText(await relsEntry.async('string'));
        const rels = relsXml.getElementsByTagName('Relationship');
        for (let i = 0; i < rels.length; i++) {
          if (/notesSlide/.test(rels[i].getAttribute('Type') || '')) {
            const target = rels[i].getAttribute('Target');
            const notesPath = resolveOoxmlPath('ppt/slides', target);
            const notesEntry = notesPath ? zip.file(notesPath) : null;
            if (notesEntry) {
              const notesXml = xmlText(await notesEntry.async('string'));
              notesText = getAllText(notesXml, 'a:t').trim();
            }
          }
        }
      }
    } catch (e) { /* best effort */ }

    let block = `--- Slide ${slideNum} ---\n${slideText || '(no text on this slide)'}`;
    if (notesText) block += `\n[Speaker notes: ${notesText}]`;
    parts.push(block);
  }
  return parts.join('\n\n');
}

async function extractDocx(file) {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

async function extractPdf(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const parts = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items.map(it => it.str).join(' ');
    parts.push(`--- Page ${i} ---\n${text}`);
  }
  return parts.join('\n\n');
}

async function extractTxt(file) {
  return await file.text();
}

async function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Extracts a single uploaded file into either { kind: 'text', text } or
 * { kind: 'image', dataUrl }. Throws on unsupported types.
 */
async function extractFile(file) {
  const name = file.name.toLowerCase();
  if (name.endsWith('.pptx')) {
    return { kind: 'text', text: await extractPptx(file) };
  }
  if (name.endsWith('.docx')) {
    return { kind: 'text', text: await extractDocx(file) };
  }
  if (name.endsWith('.pdf')) {
    return { kind: 'text', text: await extractPdf(file) };
  }
  if (name.endsWith('.txt') || name.endsWith('.md')) {
    return { kind: 'text', text: await extractTxt(file) };
  }
  if (/\.(png|jpe?g|gif|webp)$/.test(name)) {
    return { kind: 'image', dataUrl: await fileToDataUrl(file) };
  }
  throw new Error(`Unsupported file type: ${file.name}`);
}
