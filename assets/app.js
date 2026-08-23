/* Coherence — turns scattered slides/docs into one unified study guide.
   Everything runs client-side. Your API key and files go straight from
   your browser to OpenAI; nothing passes through any server we run. */

const MAX_SOURCE_CHARS = 150000; // soft cap so one huge upload can't blow the context window
const KEY_STORAGE = 'coherence_openai_key';
const REMEMBER_STORAGE = 'coherence_remember_key';
const PREFS_STORAGE = 'coherence_prefs';

let files = []; // { id, file, name, sizeLabel, kind: 'text'|'image'|'pending'|'error', text, dataUrl, error }
let rulebookText = null;
let lastGeneratedHtml = '';
let generating = false;

const $ = (sel) => document.querySelector(sel);

const dropzone = $('#dropzone');
const fileInput = $('#fileInput');
const fileListEl = $('#fileList');
const pasteText = $('#pasteText');
const apiKeyEl = $('#apiKey');
const rememberKeyEl = $('#rememberKey');
const modelEl = $('#modelInput');
const courseTypeEl = $('#courseType');
const courseNameEl = $('#courseName');
const professorEl = $('#professor');
const toolContextEl = $('#toolContext');
const generateBtn = $('#generateBtn');
const statusEl = $('#status');
const warningsEl = $('#warnings');
const outputSection = $('#outputSection');
const previewFrame = $('#previewFrame');
const codeView = $('#codeView');
const downloadBtn = $('#downloadBtn');
const copyBtn = $('#copyBtn');
const viewTabs = document.querySelectorAll('.view-tab');

init();

function init() {
  loadPrefs();

  dropzone.addEventListener('click', () => fileInput.click());
  dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('drag'); });
  dropzone.addEventListener('dragleave', () => dropzone.classList.remove('drag'));
  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('drag');
    addFiles(e.dataTransfer.files);
  });
  fileInput.addEventListener('change', () => {
    addFiles(fileInput.files);
    fileInput.value = '';
  });

  generateBtn.addEventListener('click', generate);

  downloadBtn.addEventListener('click', downloadHtml);
  copyBtn.addEventListener('click', copyHtml);

  viewTabs.forEach(tab => tab.addEventListener('click', () => {
    viewTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const view = tab.dataset.view;
    previewFrame.classList.toggle('hidden', view !== 'preview');
    codeView.classList.toggle('hidden', view !== 'code');
  }));

  [apiKeyEl, rememberKeyEl, modelEl, courseTypeEl].forEach(el => {
    el.addEventListener('change', savePrefs);
  });
}

function loadPrefs() {
  try {
    const remember = localStorage.getItem(REMEMBER_STORAGE) === '1';
    rememberKeyEl.checked = remember;
    if (remember) {
      const key = localStorage.getItem(KEY_STORAGE);
      if (key) apiKeyEl.value = key;
    }
    const prefs = JSON.parse(localStorage.getItem(PREFS_STORAGE) || '{}');
    if (prefs.model) modelEl.value = prefs.model;
    if (prefs.courseType) courseTypeEl.value = prefs.courseType;
  } catch (e) { /* ignore corrupt prefs */ }
}

function savePrefs() {
  localStorage.setItem(REMEMBER_STORAGE, rememberKeyEl.checked ? '1' : '0');
  if (rememberKeyEl.checked) {
    localStorage.setItem(KEY_STORAGE, apiKeyEl.value.trim());
  } else {
    localStorage.removeItem(KEY_STORAGE);
  }
  localStorage.setItem(PREFS_STORAGE, JSON.stringify({
    model: modelEl.value.trim(),
    courseType: courseTypeEl.value
  }));
}

function addFiles(fileListRaw) {
  for (const file of fileListRaw) {
    const id = `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 8)}`;
    const entry = { id, file, name: file.name, sizeLabel: formatBytes(file.size), status: 'pending' };
    files.push(entry);
    renderFileList();
    extractOne(entry);
  }
}

async function extractOne(entry) {
  try {
    const result = await extractFile(entry.file);
    entry.status = 'done';
    entry.kind = result.kind;
    if (result.kind === 'text') entry.text = result.text;
    if (result.kind === 'image') entry.dataUrl = result.dataUrl;
  } catch (e) {
    entry.status = 'error';
    entry.error = e.message || String(e);
  }
  renderFileList();
}

function removeFile(id) {
  files = files.filter(f => f.id !== id);
  renderFileList();
}

function renderFileList() {
  fileListEl.innerHTML = '';
  for (const entry of files) {
    const row = document.createElement('div');
    row.className = 'file-row';
    const badge = entry.status === 'pending' ? '<span class="badge badge-pending">reading…</span>'
      : entry.status === 'error' ? `<span class="badge badge-error" title="${escapeHtml(entry.error)}">failed</span>`
      : `<span class="badge badge-ok">${entry.kind === 'image' ? 'image' : 'text'}</span>`;
    row.innerHTML = `
      <span class="file-name">${escapeHtml(entry.name)}</span>
      <span class="file-size">${entry.sizeLabel}</span>
      ${badge}
      <button type="button" class="file-remove" aria-label="Remove ${escapeHtml(entry.name)}">✕</button>
    `;
    row.querySelector('.file-remove').addEventListener('click', () => removeFile(entry.id));
    fileListEl.appendChild(row);
  }
}

function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

async function loadRulebook() {
  if (rulebookText) return rulebookText;
  const resp = await fetch('rulebook.md');
  if (!resp.ok) throw new Error('Could not load rulebook.md');
  rulebookText = await resp.text();
  return rulebookText;
}

function buildSystemPrompt(rulebook) {
  return `You are an expert learning-material reformatter. You will be given raw text (and possibly images) extracted from a student's uploaded class materials — slides, PDFs, docs, or notes. Your job is to transform this scattered source material into ONE unified, coherent, hierarchical study guide by rigorously applying the rulebook below.

${rulebook}

=== OUTPUT CONTRACT (read carefully — this overrides anything above about delivery mechanics) ===

1. This is a single, one-shot generation for one upload of material. There is no multi-session combined guide and no other delivery tool — you are a single API call producing one file.
2. Your ENTIRE response must be exactly one complete, standalone HTML document: it starts with <!DOCTYPE html> and ends with </html>. No commentary, no markdown code fences, no explanation before or after — just the raw HTML.
3. Embed all CSS in a <style> tag and all JS in a <script> tag inside the document, using the exact class names, variable names, and hex values given in Section 6b (math-type) or Section 6c (info-type) for the classified course type. The file must open correctly standalone in a browser with no external dependencies other than the Google Fonts import for math-type.
4. Follow the full Reformat Protocol in Section 10 for the classified course type, including the self-checks in Steps 10 and 11, before producing your final output — but do not show your work; only the final HTML.
5. If course type is not explicitly given in the course context below, classify it yourself per the "When in doubt" guidance at the top of the rulebook and proceed — do not ask a clarifying question, since no further turns are possible.
6. Never fabricate content not present in the source material. If you must infer something to make the structure work, mark it inline with [INFERRED]. If you use outside knowledge not present in the source, mark it inline with [EXTERNAL].
7. Use every piece of the source material provided — do not drop slides, pages, or sections for brevity.`;
}

function buildUserContent(meta, combinedText, images) {
  const courseTypeLine = meta.courseType === 'auto'
    ? 'Not specified — classify it yourself from the material below, per the rulebook.'
    : meta.courseType === 'math'
      ? 'MATH-TYPE (already classified — do not re-classify, just apply the [MATH] rules).'
      : 'INFO-TYPE (already classified — do not re-classify, just apply the [INFO] rules).';

  const text = `COURSE CONTEXT
- Course name/code: ${meta.courseName || 'Not specified'}
- Professor: ${meta.professor || 'Not specified'}
- Tool context (Ex: "Excel only", "calculator allowed"): ${meta.toolContext || 'Not specified'}
- Course type: ${courseTypeLine}

=== SOURCE MATERIAL (verbatim extracted from the uploaded files) ===

${combinedText}`;

  if (images.length === 0) return text;

  const parts = [{ type: 'text', text }];
  for (const dataUrl of images) {
    parts.push({ type: 'image_url', image_url: { url: dataUrl } });
  }
  return parts;
}

async function callOpenAI({ apiKey, model, systemPrompt, userContent, onProgress }) {
  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      stream: true,
      temperature: 0.3,
      max_tokens: 16000,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userContent }
      ]
    })
  });

  if (!resp.ok || !resp.body) {
    let msg = `OpenAI API error (HTTP ${resp.status})`;
    try {
      const errJson = await resp.json();
      if (errJson && errJson.error && errJson.error.message) msg = errJson.error.message;
    } catch (e) { /* ignore */ }
    throw new Error(msg);
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let full = '';
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop();
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('data:')) continue;
      const data = trimmed.slice(5).trim();
      if (data === '[DONE]') continue;
      try {
        const json = JSON.parse(data);
        const delta = json.choices && json.choices[0] && json.choices[0].delta && json.choices[0].delta.content;
        if (delta) {
          full += delta;
          if (onProgress) onProgress(full.length);
        }
      } catch (e) { /* partial chunk, ignore */ }
    }
  }
  return full;
}

function extractHtmlFromResponse(raw) {
  let s = raw.trim();
  const fenceMatch = s.match(/```(?:html)?\s*([\s\S]*?)```/i);
  if (fenceMatch) s = fenceMatch[1].trim();
  const start = s.search(/<!DOCTYPE html>/i);
  if (start > 0) s = s.slice(start);
  return s;
}

function setStatus(msg, kind) {
  statusEl.textContent = msg || '';
  statusEl.className = 'status' + (kind ? ` status-${kind}` : '');
}

function setWarnings(list) {
  warningsEl.innerHTML = '';
  if (!list.length) { warningsEl.classList.add('hidden'); return; }
  warningsEl.classList.remove('hidden');
  for (const w of list) {
    const li = document.createElement('div');
    li.className = 'warning-item';
    li.textContent = w;
    warningsEl.appendChild(li);
  }
}

async function generate() {
  if (generating) return;

  const apiKey = apiKeyEl.value.trim();
  const model = modelEl.value.trim() || 'gpt-4o';
  const readyFiles = files.filter(f => f.status === 'done');
  const failedFiles = files.filter(f => f.status === 'error');
  const pendingFiles = files.filter(f => f.status === 'pending');
  const pasted = pasteText.value.trim();

  const warnings = [];
  failedFiles.forEach(f => warnings.push(`Skipped "${f.name}" — ${f.error}`));

  if (!apiKey) { setStatus('Enter your OpenAI API key first.', 'error'); apiKeyEl.focus(); return; }
  if (pendingFiles.length) { setStatus('Still reading uploaded files — try again in a moment.', 'error'); return; }
  if (readyFiles.length === 0 && !pasted) { setStatus('Upload at least one file or paste some material first.', 'error'); return; }

  const textBlocks = [];
  const images = [];
  for (const f of readyFiles) {
    if (f.kind === 'text') textBlocks.push(`##### FILE: ${f.name} #####\n${f.text}`);
    else if (f.kind === 'image') images.push(f.dataUrl);
  }
  if (pasted) textBlocks.push(`##### PASTED TEXT #####\n${pasted}`);

  let combinedText = textBlocks.join('\n\n');
  if (combinedText.length > MAX_SOURCE_CHARS) {
    combinedText = combinedText.slice(0, MAX_SOURCE_CHARS);
    warnings.push(`Source material was long and got truncated to ~${MAX_SOURCE_CHARS.toLocaleString()} characters to stay within a safe context size. Consider splitting large uploads into one unit at a time.`);
  }
  if (images.length > 0 && !/gpt-4o|vision|4\.1|omni/i.test(model)) {
    warnings.push(`Model "${model}" may not support image input — images will likely be ignored. Try "gpt-4o" if you need images read.`);
  }

  setWarnings(warnings);
  generating = true;
  generateBtn.disabled = true;
  generateBtn.textContent = 'Reformatting…';
  outputSection.classList.add('hidden');
  setStatus('Loading rulebook…', 'busy');

  try {
    const rulebook = await loadRulebook();
    const systemPrompt = buildSystemPrompt(rulebook);
    const userContent = buildUserContent({
      courseName: courseNameEl.value.trim(),
      professor: professorEl.value.trim(),
      toolContext: toolContextEl.value.trim(),
      courseType: courseTypeEl.value
    }, combinedText || '(no text extracted — see attached images)', images);

    setStatus('Generating your unified guide… this can take a minute for large decks.', 'busy');

    const raw = await callOpenAI({
      apiKey, model, systemPrompt, userContent,
      onProgress: (len) => setStatus(`Generating your unified guide… ${len.toLocaleString()} characters so far.`, 'busy')
    });

    const html = extractHtmlFromResponse(raw);
    if (!/<html/i.test(html)) {
      throw new Error('The model did not return a valid HTML document. Try again, or try a different model.');
    }

    lastGeneratedHtml = html;
    previewFrame.srcdoc = html;
    codeView.textContent = html;
    outputSection.classList.remove('hidden');
    outputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setStatus(`Done — ${html.length.toLocaleString()} characters generated.`, 'ok');
  } catch (e) {
    setStatus(e.message || String(e), 'error');
  } finally {
    generating = false;
    generateBtn.disabled = false;
    generateBtn.textContent = 'Reformat my material';
  }
}

function downloadHtml() {
  if (!lastGeneratedHtml) return;
  const name = (courseNameEl.value.trim() || 'study-guide').replace(/[^a-z0-9\-_ ]/gi, '').trim().replace(/\s+/g, '-') || 'study-guide';
  const blob = new Blob([lastGeneratedHtml], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name}.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function copyHtml() {
  if (!lastGeneratedHtml) return;
  try {
    await navigator.clipboard.writeText(lastGeneratedHtml);
    copyBtn.textContent = 'Copied!';
    setTimeout(() => { copyBtn.textContent = 'Copy HTML'; }, 1500);
  } catch (e) {
    setStatus('Could not copy to clipboard — select and copy from the Code tab instead.', 'error');
  }
}
