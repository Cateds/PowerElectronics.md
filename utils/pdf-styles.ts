export const PDF_STYLES = `
@page { size: A4; }

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: "Inter", -apple-system, "Helvetica Neue", sans-serif;
  font-size: 10pt;
  line-height: 1.7;
  color: #5a6a72;
}

/* ── Cover ── */

.cover {
  page-break-after: always;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  text-align: center;
}

.cover h1 {
  font-size: 24pt;
  font-family: "Noto Serif SC", serif;
  color: #2a3840;
  letter-spacing: -0.01em;
  margin-bottom: 0.4em;
}

.cover .sub {
  font-size: 12pt;
  color: #6a999b;
  font-weight: 500;
  margin-bottom: 1.2em;
}

.cover .author {
  font-size: 11pt;
  color: #8a969e;
  margin-bottom: 0.3em;
}

.cover .date {
  font-size: 9pt;
  color: #8a969e;
}

.cover .license {
  margin-top: 1em;
  font-size: 9pt;
  color: #8a969e;
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
}

.cover .license svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: #6a999b;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.cover .license a {
  color: #6a999b;
  text-decoration: none;
}

.cover .links {
  margin-top: 2.5em;
  display: flex;
  gap: 1.5em;
}

.cover .links a {
  display: inline-flex;
  align-items: center;
  gap: 0.35em;
  font-size: 9pt;
  color: #6a999b;
  text-decoration: none;
  border: 1px solid #d4dce2;
  border-radius: 8px;
  padding: 0.3em 0.75em;
}

.cover .links a svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* ── TOC ── */

.toc {
  page-break-after: always;
  padding-top: 0.5cm;
}

.toc h2 {
  font-size: 16pt;
  font-family: "Noto Serif SC", serif;
  color: #2a3840;
  border-bottom: 2px solid #6a999b;
  padding-bottom: 0.3em;
  margin-bottom: 0.8em;
}

.toc ul {
  list-style: none;
  padding-left: 0;
}

.toc li {
  padding: 0.25em 0;
  border-bottom: 1px dotted #d4dce2;
  font-size: 10pt;
}

.toc li a {
  color: #5a6a72;
  text-decoration: none;
}

.toc li a:hover {
  color: #6a999b;
}

.toc-group {
  margin-bottom: 0.8em;
}

.toc-group h3 {
  font-size: 11pt;
  font-family: "Noto Serif SC", serif;
  color: #4a7a7c;
  margin: 0.5em 0 0.2em;
  font-weight: 600;
}

/* ── Articles ── */

.article {
  page-break-before: always;
}

.a-title {
  font-size: 16pt;
  font-family: "Noto Serif SC", serif;
  color: #2a3840;
  letter-spacing: -0.01em;
  border-bottom: 2px solid #6a999b;
  padding-bottom: 0.25em;
  margin-bottom: 0.5em;
}

/* ── Two-column content ── */

.a-content {
  column-count: 2;
  column-gap: 1.5cm;
  column-rule: 1px solid #e2e8ec;
  column-fill: auto;
  font-size: 10pt;
  line-height: 1.7;
  orphans: 3;
  widows: 3;
}

/* ── Typography ── */

.a-content h2 {
  font-family: "Noto Serif SC", serif;
  font-size: 12pt;
  color: #2a3840;
  margin: 0.8em 0 0.3em;
  page-break-after: avoid;
}

.a-content h3 {
  font-family: "Noto Serif SC", serif;
  font-size: 11pt;
  color: #2a3840;
  margin: 0.6em 0 0.25em;
  page-break-after: avoid;
}

.a-content h4 {
  font-family: "Noto Serif SC", serif;
  font-size: 10pt;
  color: #2a3840;
  margin: 0.5em 0 0.2em;
  page-break-after: avoid;
}

.a-content p {
  margin: 0.4em 0;
  text-align: justify;
}

.a-content a {
  color: #4a7a7c;
  text-decoration: underline;
  text-decoration-color: rgba(106, 153, 155, 0.4);
}

.a-content ul,
.a-content ol {
  margin: 0.4em 0;
  padding-left: 1.5em;
}

.a-content li {
  margin: 0.15em 0;
}

.a-content li > ul,
.a-content li > ol {
  margin: 0.1em 0;
}

/* ── Code blocks ── */

.a-content pre {
  background: #f0f4f6;
  border-radius: 8px;
  padding: 0.7em 1em;
  font-size: 8.5pt;
  line-height: 1.5;
  overflow-x: auto;
  column-span: all;
  margin: 0.5em 0;
  break-inside: avoid;
}

.a-content :not(pre) > code {
  background: rgba(106, 153, 155, 0.14);
  color: #4a7a7c;
  border-radius: 4px;
  padding: 1px 4px;
  font-size: 9pt;
  font-family: "JetBrains Mono", "Fira Code", monospace;
}

.a-content pre code {
  background: none;
  color: inherit;
  padding: 0;
  font-size: inherit;
  border-radius: 0;
}

/* ── Tables ── */

.a-content table {
  width: 100%;
  border-collapse: collapse;
  font-size: 9pt;
  margin: 0.5em 0;
  break-inside: avoid;
}

.a-content th {
  background: #f0f4f6;
  color: #2a3840;
  font-weight: 600;
  text-align: left;
  padding: 0.4em 0.6em;
  border-bottom: 2px solid #d4dce2;
}

.a-content td {
  padding: 0.35em 0.6em;
  border-bottom: 1px solid #e2e8ec;
}

.a-content tr:last-child td {
  border-bottom: none;
}

/* ── Blockquotes ── */

.a-content blockquote {
  border-left: 3px solid #6a999b;
  background: rgba(106, 153, 155, 0.14);
  border-radius: 0 6px 6px 0;
  padding: 0.4em 0.8em;
  margin: 0.5em 0;
}

.a-content blockquote p {
  margin: 0.2em 0;
}

/* ── Custom containers (VitePress tip/note/warning) ── */

.a-content .custom-block {
  border-radius: 8px;
  padding: 0.6em 1em;
  margin: 0.5em 0;
  break-inside: avoid;
}

.a-content .tip.custom-block,
.a-content .note.custom-block {
  background: rgba(106, 153, 155, 0.14);
  border: 1px solid rgba(106, 153, 155, 0.3);
}

.a-content .warning.custom-block {
  background: rgba(234, 179, 8, 0.08);
  border: 1px solid rgba(234, 179, 8, 0.3);
}

.a-content .danger.custom-block {
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.a-content .custom-block-title {
  font-weight: 600;
  color: #2a3840;
  font-size: 10.5pt;
  margin-bottom: 0.2em;
}

/* ── Details / Summary ── */

.a-content details {
  margin: 0.5em 0;
  border: 1px solid #d4dce2;
  border-radius: 8px;
  background: #f8fafb;
  break-inside: avoid;
}

.a-content details[open] {
  border-color: rgba(106, 153, 155, 0.4);
}

.a-content summary {
  padding: 0.3em 0.8em;
  font-weight: 600;
  color: #2a3840;
  list-style: none;
}

.a-content details > :not(summary) {
  margin: 0 0.8em 0.5em;
}

/* ── MathJax ── */

mjx-container {
  overflow-x: auto;
}

mjx-container > svg {
  display: inline-block;
  margin: auto;
}

mjx-container[display="true"] {
  display: block;
  text-align: center;
  margin: 0.8em 0;
}

mjx-container[display="true"] svg {
  max-width: 100%;
}

mjx-container[display="true"] svg {
  max-width: 100%;
}

mjx-assistive-mml {
  display: none !important;
}

/* ── Images ── */

.a-content img {
  max-width: 100%;
  border-radius: 6px;
  margin: 0.3em 0;
}

.a-content p > img:only-child {
  display: block;
  margin: 0.5em auto;
  max-width: 90%;
}

/* ── Horizontal rules ── */

.a-content hr {
  border: none;
  border-top: 1px solid #e2e8ec;
  margin: 0.8em 0;
}

/* ── Strong / Emphasis ── */

.a-content strong {
  color: #2a3840;
  font-weight: 600;
}

.a-content em {
  font-style: italic;
}

/* ── Header anchors (hide permalink icons) ── */

.a-content a.header-anchor {
  display: none;
}

/* ── Part label ── */

.part-label {
  font-family: "Noto Serif SC", serif;
  font-size: 11pt;
  color: #6a999b;
  font-weight: 600;
  margin-bottom: 0.3em;
}
`;