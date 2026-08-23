# Coherence

Slides split every idea across a dozen disconnected boxes with no hierarchy. **Coherence**
takes your uploaded class materials — PowerPoint slides, PDFs, Word docs, images, notes — and
reformats them into **one unified, coherent study guide**, automatically choosing the right
structure for the subject:

- **Math-type courses** (statistics, calculus, accounting, finance, any calculation-heavy
  subject) get an SVG decision tree, formula boxes, and tabbed unit guides.
- **Info-type courses** (management, marketing, psychology, history, any concept-driven
  subject) get comparison card grids, mega-bucket sections, and labeled rows.

The style rules themselves live in [`rulebook.md`](rulebook.md) — a fully-specified formatting
system built around reducing working-memory load: structure before detail, one thing at a time,
parallel items visually parallel, redundancy stripped, color coding only for concepts that
actually recur.

## How it works

This is a **static site with no backend**. Everything happens in your browser:

1. Drop in your files. `.pptx`/`.pdf`/`.docx` are parsed client-side with JavaScript the moment
   you add them — nothing is uploaded anywhere at this step.
2. Enter your own OpenAI API key. When you click reformat, the extracted text (plus the
   rulebook) is sent **directly from your browser to OpenAI's API** — no server this project
   runs ever sees your files or your key. Standard OpenAI usage charges from your own account
   apply per reformat.
3. You get back one self-contained HTML study guide — preview it, download it, or copy the
   source.

## Running it locally

No build step. Any static file server works:

```bash
python -m http.server 8000
# or
npx serve .
```

Then open `http://localhost:8000`.

## Deploying

This repo is set up to be served directly by GitHub Pages from the repository root (Settings →
Pages → Deploy from branch → `main` / `/root`).

## Project structure

```
index.html        the app shell
assets/style.css  styling
assets/extract.js client-side .pptx/.pdf/.docx/image extraction
assets/app.js     UI wiring + the OpenAI call
rulebook.md       the formatting rulebook sent to the model as its system prompt
```

## Privacy

Your API key and uploaded files never touch any server controlled by this project. The key can
optionally be remembered in your browser's local storage (opt-in checkbox) purely for your own
convenience; it is never transmitted anywhere except directly to OpenAI's API from your browser.

## License

MIT — see [LICENSE](LICENSE).
