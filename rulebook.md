# UNIFIED LEARNING GUIDE STYLE RULES
### The style this tool applies to every reformat

**How to read this document:**
Every rule is tagged with one of three labels:

- `[UNIVERSAL]` — applies to every course and every output, no exceptions
- `[MATH]` — applies only when the current course is a **math-type course** (defined below)
- `[INFO]` — applies only when the current course is an **info-type course** (defined below)

---

**COURSE TYPE CLASSIFICATION — DETERMINE THIS FIRST**

All courses fall into exactly two types. Classify before doing anything else.

**Math-type course** → use all `[MATH]` rules:
A course where the primary output is formulas, calculation procedures, and decision paths that determine which formula or method to use. The study material produces step-by-step quantitative processes. Output is built around SVG decision trees, formula boxes, and tab-based learning guides.
Ex: statistics, econometrics, calculus, chemistry problem sets, physics, accounting, finance — any calculation-heavy course.

**Info-type course** → use all `[INFO]` rules:
A course where the primary output is concepts, definitions, comparisons, and theory. The study material produces ideas that need to be distinguished from each other, not calculated. Output is built around card grids, mega-bucket banners, and labeled rows.
Ex: management, marketing, psychology, history, sociology, information systems — any concept- or theory-driven course.

**When in doubt:** Does the source material have formulas and tell you which one to use under which condition? → Math-type. Does it have concepts that need to be compared side-by-side and distinguished from each other? → Info-type. If genuinely ambiguous, make the more conservative call based on which structure the majority of the source material fits, and proceed — do not ask a clarifying question.

---

## SECTION 1 — DESIGN PHILOSOPHY `[UNIVERSAL]`

This style was built for a learner with inattentive ADHD, tuned around working memory, processing speed, sustained attention, and reading comprehension limits — and a strong reliance on visual-spatial processing, semantic clustering (connecting ideas by meaning), and story memory (concrete examples stick far better than abstract definitions). Applying it benefits any reader: it is a lower-cognitive-load format, not a niche one.

**The cognitive design principle behind every rule:** Every formatting decision must either reduce the number of items working memory must juggle at once, or make a chunk label instantly visible so retrieval is automatic rather than effortful. One well-placed visual indicator outperforms three written reminders every time.

**Before adding any element, ask:** Does this reduce working memory load? Does it let the eye find the right thing without reading everything first? Does it eliminate a redundant step the brain would otherwise take? If the answer to all three is no — remove it.

---

## SECTION 2 — OPERATING STANDARDS `[UNIVERSAL]`

**Zero-Revision Standard:** Output must require zero follow-up correction. Make the best decision based on these rules rather than leaving anything ambiguous or half-finished. The measure of success is output the reader can use immediately for studying.

**Completeness Mandate:** Do not stop extracting, building, or checking when you feel you have enough. Continue until nothing remains. This applies to: reading source material, checking parallelism, auditing for redundancy, and applying color coding.

**Source Fidelity Rule:** Do not add content beyond what is present in the source material unless it is necessary to make the structure coherent. If inferring something not directly stated, flag it inline with `[INFERRED]`. If drawing from outside knowledge not in the source, flag it inline with `[EXTERNAL]`.

**Full Scan Rule:** Read every piece of source content before generating any output — do not summarize, skip, or weight recent content more heavily than earlier content. Slides near the end of a deck matter as much as slides at the start.

**Self-Check Before Delivery — run this before finalizing:**
- Did I read every piece of source material, not just recent parts?
- Did I continue past the point of "enough" until nothing remained?
- Does my output match the formatting rules for this course's type?
- Have I flagged anything inferred or external?
- Did I run the full reformat protocol (Section 10) for this course type?
- Is this output revision-ready with zero further prompting needed?

---

## SECTION 3 — VOCABULARY `[UNIVERSAL]`

- **Course type:** Either "math-type" or "info-type." Classify at the start. See top of document.
- **Bucket:** A top-level category grouping. In math-type courses: the major topic divisions that become tabs. In info-type courses: the major themes that become mega-bucket banner sections.
- **Criteria:** The italic recognition/condition text placed *along* arrows in SVG flowcharts. Never inside destination boxes. `[MATH]`
- **Tick:** A short vertical line at the end of a horizontal collector line that visually anchors it to its endpoint. `[MATH]`
- **Horizontal collector line:** The horizontal bar that connects multiple destination boxes and funnels them into a single downward arrow toward the next step. `[MATH]`
- **Note-line:** A ⚠️ warning or exception pulled out of a bullet list and rendered with extra vertical space above it. Applied via `.note-line` CSS class. `[MATH]`
- **Super-tab:** The top-level tab bar that switches between entire units. Uses `switchUnit()` JS. `[MATH]`
- **Inner tab:** The tab bar within a unit that switches between buckets. Uses `switchInnerTab()` or `switchTab()` JS. `[MATH]`
- **Mega-bucket:** A large colored header banner that marks a zone in info-type course output. `[INFO]`
- **Two-dimension labeled row:** `.ai-dim` structure used when items vary along exactly two axes. `[INFO]`
- **Confusion buster:** A side-by-side comparison card placed before any concept pair that is easily mixed up. `[INFO]`
- **Beautiful bracket:** A margin annotation that moves metadata out of the reading flow. `[INFO]`
- **"Ex:":** Always this prefix for examples. Never "e.g." or "e.g.," anywhere in any output. `[UNIVERSAL]`

---

## SECTION 4 — LEARNING STYLE RULES `[UNIVERSAL]`

**Rule 1 — Structure before detail.** Always present the container (bucket, category, path) before its contents. Never introduce a concept mid-list without first naming what group it belongs to.

**Rule 2 — Navigation over reading.** Pull information rather than push it. Tabs, clickable nodes, and collapsible sections outperform flat scrollable content. Reduce the number of items visible at once.

**Rule 3 — Redundancy is clutter, not reinforcement.** If a visual element already communicates something, remove the text that says the same thing. One well-placed visual indicator outperforms three written reminders. Repeated information is not reinforcement — it is clutter that competes for attention and interferes with comprehension.

**Rule 4 — Parallelism is non-negotiable.** Items that are conceptually parallel must be visually parallel: same grammatical form, same line count, same vertical position, same content order within cards. Violations must be caught before delivery. See Section 5b for the full parallelism checklist.

**Rule 5 — One thing at a time into working memory.** Design to hide complexity behind a click or a tab. Don't show everything at once.

**Rule 6 — Active retrieval beats passive reading.** Build for interaction. Clicking to retrieve information is more effective than seeing everything displayed at once.

**Rule 7 — Visual correctness is the final check.** Output must be visually correct, not just logically correct.

**Rule 12 — Surgical, protected structure.** Every element earns its place. Nothing extraneous is added beyond what the source material and these rules call for.

**Rule 13 — Merge parallel structures to reduce cognitive load.** When two sections are nearly identical in structure and purpose, collapse them into one with an inline modifier rather than duplicating structure.

**Rule 15 — This is infrastructure, not a one-off document.** Every guide, flowchart, and protocol should be built as a reusable, internally consistent system — the same rules should feel exactly the same across every course and every session.

---

## SECTION 5 — FORMATTING RULES

### 5a. ALL CAPS for Key Contrast Words `[UNIVERSAL]`

When similar items differ in one key way, identify the SINGLE word that captures the difference and write it in ALL CAPS. This makes the distinguishing word pre-attentively visible — the eye catches it before conscious reading begins.

- Maximum one or two words in ALL CAPS per item. If you find yourself capping more than two words, you haven't found the right word yet.
- ALL CAPS and color coding serve different purposes and can both be applied to the same word simultaneously.

### 5b. Parallelism Checklist `[UNIVERSAL]`

Any time two titles appear next to each other, verify all of these before finalizing:
- Grammatical form: all noun phrases, or all gerunds, or all verbs — never mixed within one group
- Title length: no extra qualifiers on one title that don't appear on the others in the same group
- Articles: remove "The" or "A" from a title if other items in the same group don't have them
- Content order within cards: the same type of information (definition, example, fix) at the same vertical position in each parallel card
- Visual alignment: parallel boxes placed side by side must have their tops aligned at the same height

### 5c. Remove Redundancy `[UNIVERSAL]`

- If information is already conveyed by structure, position, color, or a visual element — do not also state it in text.
- Cut any clause that restates what was just said, adds no new information, or exists only to pad a statement.
- Apply `text-wrap:balance` per relevant CSS class declaration (not as a global rule) to prevent orphan lines. Any wrapped line under approximately 5 words is worse than rewriting the sentence to avoid the wrap.

### 5d. Examples `[UNIVERSAL]`

- Examples go directly below their definitions. Never separated by other content.
- Always prefixed "Ex:" — never "e.g." or "e.g.,"
- Never remove specific examples, names, statistics, or memorable stories present in the source, even when trimming surrounding text.

### 5e. Color Coding `[UNIVERSAL]`

- Color ONLY terms that are foundational concepts appearing repeatedly because later ideas are built on top of them. Do not color terms that appear only once or in only one section.
- Color every form and variant of each term throughout the document, including ALL CAPS variants (keep them uppercase).
- A color legend appears ONCE at the very top of any module/section that uses color coding.
- Do not force a color system where concepts don't genuinely recur.
- In math-type courses: establish one consistent color per major topic bucket for this document; document the assignment at the top. `[MATH]`
- In info-type courses: use the fixed class system in Section 6c, extended with new classes as needed for terms that actually recur. `[INFO]`

### 5f. Structure and Hierarchy `[UNIVERSAL]`

- Maximum two levels of hierarchy: a top-level zone marker, and sub-sections inside it.
- No title repetition: if a header already names the category, do not repeat that name as a sub-header inside the section.
- Horizontal spread preferred: parallel things sit side by side, never stacked vertically one after another.

### 5g. Bullets — Subject-Conditional Rule `[SUBJECT-CONDITIONAL]`

These two rules apply to different course types and different output structures:

- **`[MATH]`:** Bullet points are mandatory for all prose content inside callout boxes (`.box` class). Never use paragraph-style text inside callout boxes — always convert to bullets.
- **`[INFO]`:** Do NOT use bullet points anywhere in restructured output. Use cards, labeled rows, and grids instead.

### 5h. Grouping Mixed-Category Lists `[MATH]`

When a list contains items of different types (Ex: a definition followed by format rules), group the sub-items under a parent bullet with a label ("Format:", "Decision:", "By appearance:", etc.) and indent them. Trigger: if two bullets answer *different questions* about the same thing (what it IS vs. how it's WRITTEN), they are categorically different and need grouping.

### 5i. ⚠️ Note-Line Rule `[MATH]`

When a ⚠️ appears inside a bullet list as if it were equal to other bullets, it is wrong. Pull it out of the list, apply the `.note-line` CSS class, and give it more vertical space above it. The ⚠️ itself serves as the visual bullet. Apply when the note is a warning or exception — categorically different from the surrounding list items.

### 5j. Two-Dimension Labeled Rows `[INFO]`

Use this structure when a group of parallel items each vary along EXACTLY two dimensions. HTML syntax:

```html
<div class="ai-dim">
  <span class="ai-lbl">Label:</span>
  <span class="ai-val">Value goes here</span>
</div>
```

Critical: `.ai-lbl` must have `white-space:nowrap` so the label word never breaks across two lines. Keep values to one line — trim aggressively until it fits.

### 5k. Confusion Busters `[INFO]`

When two concepts are frequently confused because they look similar on the surface, add a side-by-side comparison box BEFORE the individual full cards. The box has a 2px solid `#D4537E` (pink) border. Inside is a CSS grid with two columns — left card has pink background (`.cbl`), right card has teal background (`.cbg`). Each side states the single word or phrase that marks the exact point of difference, then the stage at which the problem occurs.

### 5l. The Beautiful Bracket `[INFO]`

The bracket moves metadata out of the reading flow into the margin so the reading flow stays clean. Use it when a group of items shares one overarching characteristic that would otherwise need to be stated redundantly inside each card — or when something breaks the standard pattern and needs calling out in the margin.

USE for: exceptions, distinctions, margin metadata.
DO NOT USE for: clean categorized lists that fit neatly under a plain header.

**CRITICAL: Bracket label text must NEVER be italic. Bold, 10px Arial, no italic.**

LEFT bracket CSS:
```css
.bracket-wrap { position:relative; display:flex; flex-direction:column; gap:8px }
.bracket-wrap::before { content:''; position:absolute; left:-8px; top:-3px; bottom:-3px; width:15px;
  border-top:2.5px solid #E82020; border-left:2.5px solid #E82020; border-bottom:2.5px solid #E82020;
  border-radius:3px 0 0 3px }
.bracket-wrap::after { content:''; position:absolute; left:-53px; top:50%;
  transform:translateY(-50%); width:45px; height:2.5px; background:#E82020 }
.bracket-label { position:absolute; right:calc(100% + 57px); top:50%; transform:translateY(-50%);
  color:#E82020; font-size:10px; font-weight:700; text-align:right; line-height:1.5;
  font-family:Arial,sans-serif; white-space:nowrap }
```

RIGHT bracket CSS:
```css
.bracket-wrap-r { position:relative; display:flex; flex-direction:column; gap:9px }
.bracket-wrap-r::before { content:''; position:absolute; right:-8px; top:-3px; bottom:-3px; width:15px;
  border-top:2.5px solid #E82020; border-right:2.5px solid #E82020; border-bottom:2.5px solid #E82020;
  border-radius:0 3px 3px 0 }
.bracket-wrap-r::after { content:''; position:absolute; right:-53px; top:50%;
  transform:translateY(-50%); width:45px; height:2.5px; background:#E82020 }
.bracket-label-r { position:absolute; left:calc(100% + 57px); top:50%; transform:translateY(-50%);
  color:#E82020; font-size:10px; font-weight:700; text-align:left; line-height:1.5;
  font-family:Arial,sans-serif; white-space:nowrap }
```

HTML pattern (LEFT bracket — `.bracket-label` span must be the FIRST child inside `.bracket-wrap`):
```html
<div class="bracket-wrap">
  <span class="bracket-label">Label text<br>second line</span>
  <div class="sc agI"><!-- first card --></div>
  <div class="sc asI"><!-- second card --></div>
</div>
```

### 5m. Math-Type Specific Formatting Rules `[MATH]`

- **Concept-first, formula-second, example-third.** Name the concept, state when to use it, give the formula, then give the example. Never reverse this order.
- **Label and value on the same line.** When a label describes a specific value or formula, they go on the SAME line — never the label on one line and the value on the next.
- **Greek letters lowercase unless the source explicitly capitalizes them** (Ex: μ is always lowercase, including subscript forms μ₀, μ₁, unless the source material capitalizes it for a specific reason).
- **Criteria belong on arrows, not in boxes.** Italic recognition/condition text goes along the arrow. Destination box contains only title + action/formula. Never repeat the destination name as an arrow label.

---

## SECTION 6 — TYPOGRAPHY & COLOR SYSTEM

### 6a. Output Format `[UNIVERSAL]`

The restructured material is delivered as a single standalone HTML file containing `<!DOCTYPE html>`, `<head>`, `<style>`, and `<body>` — no external file dependencies, no separate CSS/JS files, no build step. It must open correctly by itself in any browser.

### 6b. Math-Type Course Typography & CSS Architecture `[MATH]`

**Fonts:**
- Primary body: DM Sans (weights 300, 400, 500, 600, 700)
- Header: DM Serif Display (serif, weight 400)
- Monospace: JetBrains Mono — formulas, inline code, box-label tags, step counters
- Google Fonts import: `@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');`

**Full CSS — use these exact variable names, class names, and hex values. Do not substitute:**

```css
:root {
  --bg: #f4f2ed;
  --surface: #ffffff;
  --navy: #1a2744;
  --navy-light: #253360;
  --step-bg: #e8f5e9;      --step-border: #2e7d32;   --step-text: #1b5e20;
  --excel-bg: #e3f2fd;     --excel-border: #1565c0;  --excel-text: #0d47a1;
  --warn-bg: #fff8e1;      --warn-border: #f57f17;   --warn-text: #e65100;
  --def-bg: #f3e5f5;       --def-border: #6a1b9a;    --def-text: #4a148c;
  --danger-bg: #fce4ec;    --danger-border: #c62828; --danger-text: #b71c1c;
  --decision-bg: #e0f7fa;  --decision-border: #006064; --decision-text: #004d40;
  --mono: 'JetBrains Mono', monospace;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: #1a1a2e; line-height: 1.65; }

/* HEADER */
.header { background: var(--navy); color: white; padding: 44px 48px 36px; position: relative; overflow: hidden; }
.header::after { content: ''; position: absolute; bottom: -30px; right: -30px; width: 220px; height: 220px; border-radius: 50%; background: rgba(255,255,255,0.04); }
.header-tag { font-family: var(--mono); font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #7eb3ff; margin-bottom: 10px; }
.header h1 { font-family: 'DM Serif Display', serif; font-size: 38px; font-weight: 400; line-height: 1.2; margin-bottom: 10px; }
.header-sub { font-size: 14px; color: #a8b8d8; font-weight: 300; max-width: 600px; }

/* TOC NAV BAR */
.toc { background: var(--navy-light); padding: 20px 48px; display: flex; flex-wrap: wrap; gap: 8px 24px; }
.toc a { color: #7eb3ff; text-decoration: none; font-size: 13px; font-weight: 500; letter-spacing: 0.3px; }
.toc a:hover { color: white; }
.toc-sep { color: #3a4a6a; font-size: 13px; }

/* MAIN CONTENT */
.main { max-width: 900px; margin: 0 auto; padding: 40px 32px 80px; }

/* SECTION HEADERS */
.section-header { display: flex; align-items: center; gap: 14px; margin: 52px 0 24px; padding-bottom: 12px; border-bottom: 2.5px solid var(--navy); }
.section-num { background: var(--navy); color: white; font-family: var(--mono); font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 4px; letter-spacing: 1px; flex-shrink: 0; }
.section-header h2 { font-family: 'DM Serif Display', serif; font-size: 26px; font-weight: 400; color: var(--navy); }
.anchor-target { scroll-margin-top: 20px; }

/* SUBSECTIONS */
.subsection { margin: 32px 0 20px; }
.subsection h3 { font-size: 16px; font-weight: 700; color: var(--navy); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
.subsection h3::before { content: ''; display: inline-block; width: 4px; height: 18px; background: var(--navy); border-radius: 2px; flex-shrink: 0; }

/* CALLOUT BOXES */
.box { border-radius: 8px; padding: 16px 20px; margin: 14px 0; border-left: 4px solid; }
.box-label { font-family: var(--mono); font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px; opacity: 0.8; }
.box p { font-size: 14.5px; margin-bottom: 6px; }
.box ul { padding-left: 18px; margin: 0; }
.box ul li { font-size: 14.5px; margin-bottom: 6px; line-height: 1.55; }
.box ul li:last-child { margin-bottom: 0; }
.box-steps  { background: var(--step-bg);    border-color: var(--step-border);    color: var(--step-text); }
.box-excel  { background: var(--excel-bg);   border-color: var(--excel-border);   color: var(--excel-text); }
.box-warn   { background: var(--warn-bg);    border-color: var(--warn-border);    color: var(--warn-text); }
.box-def    { background: var(--def-bg);     border-color: var(--def-border);     color: var(--def-text); }
.box-danger { background: var(--danger-bg);  border-color: var(--danger-border);  color: var(--danger-text); }
.box-decide { background: var(--decision-bg); border-color: var(--decision-border); color: var(--decision-text); }

/* INLINE CODE */
code { font-family: var(--mono); font-size: 13px; background: rgba(21,101,192,0.1); color: #0d47a1; padding: 1px 6px; border-radius: 3px; font-weight: 600; }

/* FORMULA LINES */
.formula-line { font-family: var(--mono); font-size: 13.5px; background: #1a2744; color: #7eb3ff; padding: 10px 16px; border-radius: 6px; margin: 8px 0; display: block; }
.formula-line .comment { color: #546e7a; font-size: 12px; }

/* NOTE LINES */
.note-line { display: block; margin-top: 10px; padding-top: 10px; border-top: 1px dashed currentColor; font-size: 13.5px; }

/* SCENARIO CARDS */
.scenario-card { background: var(--surface); border: 1.5px solid #dde3f0; border-radius: 10px; margin: 20px 0; overflow: hidden; }
.scenario-card-header { background: var(--navy); color: white; padding: 12px 20px; font-weight: 700; font-size: 14px; display: flex; align-items: center; gap: 10px; }
.scenario-badge { background: rgba(255,255,255,0.15); font-family: var(--mono); font-size: 10px; letter-spacing: 1px; padding: 2px 8px; border-radius: 3px; }
.scenario-card-body { padding: 18px 20px; }
.scenario-card-body > p { font-size: 14px; margin-bottom: 10px; color: #444; }
.scenario-card-body > ul { padding-left: 18px; margin: 8px 0 10px; }
.scenario-card-body > ul > li { font-size: 14px; margin-bottom: 6px; color: #444; line-height: 1.55; }

/* STEPS LIST */
.steps-list { list-style: none; padding: 0; counter-reset: step; }
.steps-list > li { counter-increment: step; display: flex; gap: 12px; margin-bottom: 16px; align-items: flex-start; font-size: 14.5px; }
.steps-list > li::before { content: counter(step); background: var(--navy); color: white; font-family: var(--mono); font-size: 11px; font-weight: 700; min-width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }
.step-inner { flex: 1; }
.step-inner ul { padding-left: 18px; margin-top: 6px; }
.step-inner ul li { font-size: 14px; margin-bottom: 4px; line-height: 1.5; }

/* TABLES */
.compare-table { width: 100%; border-collapse: collapse; font-size: 14px; margin: 14px 0; }
.compare-table th { background: var(--navy); color: white; padding: 10px 14px; text-align: left; font-weight: 600; font-size: 13px; }
.compare-table td { padding: 10px 14px; border-bottom: 1px solid #e8eaf0; vertical-align: top; }
.compare-table tr:nth-child(even) td { background: #f7f8fc; }
.compare-table tr:hover td { background: #eef2fc; }
.error-table { width: 100%; border-collapse: collapse; font-size: 14px; margin: 14px 0; }
.error-table th { padding: 10px 14px; font-weight: 700; font-size: 13px; text-align: center; }
.error-table td { padding: 12px 14px; text-align: center; border: 1px solid #dde3f0; }
.error-table .header-row th { background: var(--navy); color: white; }
.error-table .correct { background: #e8f5e9; color: #2e7d32; font-weight: 600; }
.error-table .type1 { background: var(--danger-bg); color: var(--danger-text); font-weight: 600; }
.error-table .type2 { background: var(--warn-bg); color: var(--warn-text); font-weight: 600; }

/* LAYOUT */
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin: 14px 0; }
@media (max-width: 600px) { .two-col { grid-template-columns: 1fr; } }
.concept-block { background: var(--surface); border: 1.5px solid #dde3f0; border-radius: 8px; padding: 14px 16px; font-size: 14px; }
.concept-block .block-title { display: block; color: var(--navy); font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
.concept-block ul { padding-left: 18px; margin: 0; }
.concept-block ul li { margin-bottom: 6px; line-height: 1.55; }
.concept-block ul li:last-child { margin-bottom: 0; }

/* PILLS */
.pill { display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 12px; font-weight: 700; font-family: var(--mono); }

/* DIVIDERS */
hr.section-break { border: none; border-top: 1px solid #dde3f0; margin: 28px 0; }
.dtree-divider { border: none; border-top: 1.5px dashed #c5cae9; margin: 16px 0; }

/* TEXT-BASED DECISION TREE (simple in-bucket aids only — NOT the master decision tree) */
.dtree { background: var(--surface); border: 2px solid var(--navy); border-radius: 12px; padding: 28px 28px 22px; margin: 20px 0 32px; }
.dtree-q { font-weight: 700; font-size: 15px; color: var(--navy); margin-bottom: 12px; padding: 10px 14px; background: #eef2fc; border-radius: 6px; }
.dtree-row { display: flex; gap: 12px; margin-bottom: 10px; align-items: flex-start; }
.dtree-tag { font-family: var(--mono); font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 4px; flex-shrink: 0; margin-top: 2px; }
.dtree-tag.yes { background: #c8e6c9; color: #1b5e20; } .dtree-tag.no { background: #ffcdd2; color: #b71c1c; }
.dtree-body { font-size: 14px; line-height: 1.55; }
.dtree-body strong { color: var(--navy); }

/* SUPER TABS */
.super-bar { display: flex; gap: 0; background: #0f1a30; border-bottom: 3px solid #7986cb; padding: 0 48px; }
.super-btn { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700; padding: 16px 36px; border: none; border-bottom: 3px solid transparent; background: transparent; color: #a8b8d8; cursor: pointer; letter-spacing: 0.4px; margin-bottom: -3px; transition: color 0.15s; }
.super-btn:hover { color: white; } .super-btn.active { color: white; border-bottom: 3px solid #7986cb; }
.unit-panel { display: none; } .unit-panel.active { display: block; }

/* INNER TABS */
.tab-bar { display: flex; flex-wrap: wrap; gap: 6px; padding: 18px 48px 0; background: var(--navy-light); border-bottom: 2.5px solid var(--navy); }
.tab-btn { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; padding: 8px 18px; border: none; border-bottom: 3px solid transparent; background: transparent; color: #a8b8d8; cursor: pointer; margin-bottom: -2.5px; }
.tab-btn.active { color: white; border-bottom: 3px solid white; }
.tab-panel { display: none; } .tab-panel.active { display: block; }
```

**Math-type color system — establish per document:**
Assign one consistent color per major topic bucket. Document assignments at the top of the guide. Carry throughout every box, flowchart, and section. Apply to box fills, border colors, text, AND SVG arrow/marker colors. Pick colors that are visually distinct from each other and from the semantic box colors above (warn/danger/step/etc).

### 6c. Info-Type Course Typography & CSS Architecture `[INFO]`

**Fonts:** `font-family:'Georgia',serif` for ALL body text. Arial is used ONLY for bracket label text (`.bracket-label` and `.bracket-label-r`). Do not use Arial elsewhere.

**CSS color variable system:**
```css
:root {
  --bg:#F7F6F3; --surface:#FFFFFF;
  --border:#E4E2DC; --border2:#D0CEC6;
  --text:#1A1916; --text2:#5C5A54; --text3:#8C8A84;
  --purple:#534AB7; --purple-bg:#EEEDFE; --purple-text:#3C3489;
  --teal:#0F6E56; --teal-bg:#E1F5EE; --teal-text:#085041;
  --amber:#854F0B; --amber-bg:#FAEEDA; --amber-text:#633806;
  --coral:#993C1D; --coral-bg:#FAECE7; --coral-text:#712B13;
  --blue:#185FA5; --blue-bg:#E6F1FB; --blue-text:#0C447C;
  --pink:#D4537E; --pink-bg:#FBEAF0; --pink-text:#72243E;
  --radius:10px; --radius-lg:14px;
}
body { font-family:'Georgia',serif; background:var(--bg); color:var(--text); line-height:1.6; margin:0; }
.mega-bucket { padding:22px 28px; border-radius:var(--radius-lg); margin:28px 0 18px; }
.card-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:16px; margin:16px 0; }
.sc { background:var(--surface); border:1.5px solid var(--border); border-radius:var(--radius); padding:16px 18px; }
.ai-dim { display:flex; gap:8px; margin-bottom:6px; align-items:baseline; }
.ai-lbl { white-space:nowrap; font-weight:700; color:var(--text2); font-size:13px; }
.ai-val { font-size:14px; }
.cb-wrap { border:2px solid var(--pink); border-radius:var(--radius-lg); padding:16px; margin:20px 0; }
.cb-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.cbl { background:var(--pink-bg); border-radius:var(--radius); padding:14px; }
.cbg { background:var(--teal-bg); border-radius:var(--radius); padding:14px; }
```

Style every `.mega-bucket` using one of the palette pairs above (Ex: `background:var(--purple-bg); border-left:4px solid var(--purple); color:var(--purple-text);`), one distinct color per theme, consistent throughout the document.

**Fixed color-coding spans for recurring foundational terms:**
```html
<span class="kp">term</span>   <!-- one palette color, e.g. pink -->
<span class="kpu">term</span>  <!-- a second palette color, e.g. purple -->
<span class="ka">term</span>   <!-- a third palette color, e.g. amber -->
<span class="kt">term</span>   <!-- a fourth palette color, e.g. teal -->
```
Identify which foundational terms genuinely recur throughout THIS course's source material and assign each its own class/color from the palette in Section 6c, defined once as `.kp/.kpu/.ka/.kt { color: var(--X); font-weight:600; }` (add more classes from the remaining palette colors — blue, coral — if more than four recurring terms need coding). Only apply classes where terms actually appear in the current material. Wrap every form/variant of the term (including ALL CAPS forms, keeping them uppercase). Never double-nest spans.

---

## SECTION 7 — SVG FLOWCHART RULES `[MATH]`

The master decision tree is always built as an SVG embedded in HTML — never as a text-based div or list structure. Text-based `.dtree` divs may be used for simple in-bucket decision aids only.

**Shape conventions:**
- START box: `<rect>` with large rx (rx=8), purple fill `#CECBF6`, stroke `#534AB7`
- Decision diamonds: `<polygon>` with 4 points (top, right, bottom, left)
- Destination boxes: `<rect>` with rx=6, section color fill and stroke
- Junction/intermediate nodes: `<rect>` with rx=6, smaller height than destination boxes
- Criteria: `<text>` with `class="fc-si"` (italic), placed along arrows, never inside boxes
- Collector line: horizontal `<line>` spanning outer boxes only; two vertical tick lines at the outer ends only (no inner ticks)

**SVG marker template (one per section color, defined in `<defs>`):**
```svg
<defs>
  <style>
    .fc-q  { font-family:'DM Sans',sans-serif; font-size:12px; font-weight:700; }
    .fc-t  { font-family:'DM Sans',sans-serif; font-size:11px; font-weight:700; }
    .fc-s  { font-family:'DM Sans',sans-serif; font-size:9.5px; }
    .fc-si { font-family:'DM Sans',sans-serif; font-size:9.5px; font-style:italic; }
    .fc-lbl{ font-family:'DM Sans',sans-serif; font-size:9.5px; font-weight:700; }
    .fc-conn      { stroke:#9fa8da; stroke-width:1.5; fill:none; }
    .fc-conn-main { stroke:#7986cb; stroke-width:2;   fill:none; }
  </style>
  <marker id="arr-NAME" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
    <polygon points="0 0,7 3.5,0 7" fill="SECTION_COLOR"/>
  </marker>
</defs>
```

**Arrow direction rules:**
- Arrows arriving at a diamond: connect to the **top point**
- Arrows leaving a diamond for a binary branch: exit from **left and right points**
- Arrows leaving a diamond for a sequential next step: exit from **bottom point**
- Arrows from a horizontal collector: exit from a single downward line at the midpoint
- When criteria on the same fan all exit from the same point, all criteria text must sit at the same latitudinal y position

**Analytical positioning rules — never guess and iterate:**
- Arrow midpoint for criteria text: `midpoint_x = (x1 + x2) / 2`, `midpoint_y = (y1 + y2) / 2`
- Tick length: both ticks on a collector must be equal — set both to the same pixel height
- Text alignment: `text-anchor="end"` for left-side arrows, `text-anchor="start"` for right-side, `text-anchor="middle"` for centered

**Collector line rule:**
- Horizontal collector spans from outer left edge of leftmost box to outer right edge of rightmost box — extending slightly past the box edges
- Two vertical tick lines at the outer ends only — no vertical lines from intermediate boxes
- A single downward arrow exits at the midpoint

**Box content rules:**
- Title appears exactly once — never in both arrow label AND box header
- Parameter definitions stacked one per line before formulas
- Condition notes (Ex: TRUE/FALSE, known/unknown) go immediately under the function they modify, indented with `→` prefix
- Indented sub-items in SVG: shift x-anchor right using `text-anchor="start"` with a larger x value — do not re-center
- Examples directly below definitions, prefixed "Ex:" — never "e.g."

**Sizing:** Give the SVG a generous `viewBox` and compute all coordinates so nothing overlaps or clips — plan node positions on a grid before writing the SVG markup.

---

## SECTION 8 — TAB SYSTEM & JS ARCHITECTURE

**Single-unit inner-tab JS (switchTab) — for a standalone math-type guide: `[MATH]`**
```javascript
function switchTab(id) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  event.target.classList.add('active');
  window.scrollTo({ top: document.querySelector('.tab-bar').offsetTop - 20, behavior: 'smooth' });
}
document.querySelector('.tab-btn').classList.add('active');
```
If the source material spans multiple clearly distinct units, use the super-tab pattern instead: an outer `.unit-panel`/`switchUnit()` bar switching between units, each containing its own inner `.tab-bar`/`switchInnerTab()` switching between that unit's buckets, with all tab-panel IDs prefixed per unit (Ex: `id="tab-u2-tree"`) to avoid ID collisions.

**Info-type module tab JS (go function): `[INFO]`**
```javascript
function go(id, tab) {
  document.querySelectorAll('.module').forEach(m => m.classList.remove('on'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('on'));
  document.getElementById(id).classList.add('on');
  tab.classList.add('on');
}
```
Module divs use IDs like `id='m1'`, `id='m2'`. All have class `'module'`. Active one also has class `'on'`. First module starts with class `'on'`.

---

## SECTION 9 — STRUCTURAL DISCIPLINE `[UNIVERSAL]`

When two elements don't align visually or sizes don't match, reason about the CAUSE (more content in one box? inconsistent structure between "parallel" items?) and fix the underlying structure rather than patching with arbitrary pixel values. Never guess a pixel value — compute it, or restructure so the two elements are naturally symmetric (same content order, same element types).

---

## SECTION 10 — REFORMAT PROTOCOL `[UNIVERSAL with conditional branches]`

**Step 1 — Read source material completely.** Read every piece. Do not summarize, skip, or weight recent content more heavily. Do not begin formatting until the full scan is done.

**Step 2 — Classify course type.** Math-type (formulas, decision paths, calculation procedures) or info-type (concepts, comparisons, theory). Apply all subsequent steps from the correct branch.

**Step 3 — Map top-level structure.**
- `[MATH]`: Identify the major topic divisions (buckets) that will become tabs. Assign every piece of source content to exactly one bucket.
- `[INFO]`: Identify 2–4 major themes that will become mega-bucket banner sections.

**Step 4 — Identify parallel groups and plan layout.**
- `[MATH]`: Find decision paths (what condition determines which formula). Plan SVG flowchart structure — START → diamonds → criteria on arrows → destination boxes.
- `[INFO]`: Find every group of items that should be compared. Plan two-column or three-column grid layouts. Check if any group varies along exactly two dimensions → use `.ai-dim` labeled rows.

**Step 5 — Apply ALL CAPS contrast words.** Within each parallel group, find the single word that marks the sharpest distinction between items. Apply ALL CAPS to that word only. Maximum one or two words per item.

**Step 6 — Apply color coding.**
- `[MATH]`: Establish and use one color per bucket. Apply to box fills, border colors, text, and SVG markers.
- `[INFO]`: Apply a `kp/kpu/ka/kt`-style span system to foundational recurring terms actually present in the source material. Add the legend once at the top of the document.

**Step 7 — Handle special structures.**
- `[MATH]`: Build the SVG master decision tree — START box → decision diamonds → criteria along arrows → destination boxes with title + formula only. All formulas in `.formula-line` elements. Step-by-step procedures use `.steps-list`.
- `[INFO]`: Identify easily confused concept pairs → add confusion buster boxes before their full cards. Move any shared characteristic from card body to a bracket margin annotation where applicable.

**Step 8 — Place examples.** Examples go directly below their definitions. Prefixed "Ex:". Preserve ALL examples from source — never remove any.

**Step 9 — Strip redundancy.** Remove text already conveyed by structure, color, or visual. Apply `text-wrap:balance` per relevant CSS class. Eliminate orphan lines under ~5 words.

**Step 10 — Parallelism audit.** Check EVERY group of parallel items before finalizing:
- Grammatical form matches ✓
- Title length matches ✓
- Article usage consistent ✓
- Content order within cards matches ✓
- Visual alignment matches ✓

**Step 11 — Visual self-check (math-type only): `[MATH]`**
- Criteria on arrows (not in boxes) ✓
- Ticks equal length on both ends of collector ✓
- No inner collector ticks ✓
- Fan arrow criteria at same latitudinal y-level ✓
- "Ex:" not "e.g." ✓
- Greek letters lowercase where the source uses them lowercase ✓
- Label and value on same line ✓
- All ⚠️ notes pulled out of lists as `.note-line` ✓
- All section colors consistent ✓

---

## SECTION 11 — WHAT NOT TO DO `[UNIVERSAL]`

- Do NOT add content not in the source material without an `[INFERRED]` or `[EXTERNAL]` flag.
- Do NOT add headers that repeat information already conveyed by a visual structure above them.
- Do NOT force color coding where concepts don't genuinely recur across sections.
- Do NOT leave orphan lines. Rewrite or trim to eliminate them.
- Do NOT present parallel items at different vertical positions.
- Do NOT guess at pixel values without reasoning through the cause first.
- Do NOT use "The" as an article in a group header title if other items in the same group don't have it.
- Do NOT use "e.g." or "e.g.," anywhere. Always "Ex:".
- Do NOT put criteria inside SVG destination boxes. Criteria go on arrows only. `[MATH]`
- Do NOT build two nearly identical sections when one with a modifier will do.
- **`[INFO]`:** Do NOT use bullet points anywhere in restructured info-type course output.
- **`[MATH]`:** Do NOT use paragraph-style text inside callout boxes — always bullets.
- Do NOT make bracket label text italic. Bold, 10px Arial, no italic. `[INFO]`

---

## SECTION 12 — CORE DESIGN PRINCIPLES `[UNIVERSAL]`

**"Good output" is a tool, not a document.** Every guide is designed to be *used* during a high-stakes moment (exam, homework) — a decision aid that replicates the mental process, not just a reference that contains the content.

**The bracket design principle:** By the time the reader reaches bracketed items, the brain has already offloaded the margin annotation and can focus entirely on the content of each card. One well-placed visual indicator outperforms three written reminders.

**The chunking insight:** The entire restructuring system is an applied chunking system. Mega-bucket headers are chunks. Color coding is chunking — seeing a color means the brain retrieves the definition without re-reading. Every design decision either reduces the number of items working memory must juggle, or makes a chunk label instantly visible so retrieval is automatic rather than effortful.
