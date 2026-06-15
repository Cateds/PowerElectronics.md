import { PDF_STYLES } from "./pdf-styles";
import { escapeHtml } from "./escape-html";

interface BuildHtmlOptions {
  siteTitle: string;
  tag: string;
  siteUrl: string;
  githubUrl: string;
  authorUrl: string;
  authorName: string;
  parts: PartDef[];
}

interface PartDef {
  label: string;
  startIndex: number;
}

interface ArticleData {
  path: string;
  title: string;
  content: string;
  folder: string;
  sortKey: string;
}

export function buildHtml(
  articles: ArticleData[],
  opts: BuildHtmlOptions,
): string {
  let tocHtml = "";
  for (const part of opts.parts) {
    const end = opts.parts.find((p) => p.startIndex > part.startIndex)?.startIndex ?? articles.length;
    tocHtml += `<div class="toc-group">
    <h3>${escapeHtml(part.label)}</h3>
    <ul>`;
    for (let i = part.startIndex; i < end; i++) {
      tocHtml += `<li><a href="#page-${i}">${escapeHtml(articles[i].title || "(无标题)")}</a></li>`;
    }
    tocHtml += `</ul>
  </div>`;
  }

  let articlesHtml = "";
  for (let i = 0; i < articles.length; i++) {
    const a = articles[i];
    const part = opts.parts.find((p) => i === p.startIndex);
    articlesHtml += `
  <div class="article" id="page-${i}">
    ${part ? `<div class="part-label">${escapeHtml(part.label)}</div>` : ""}
    <h1 class="a-title">${escapeHtml(a.title || "")}</h1>
    <div class="a-content">
      ${a.content}
    </div>
  </div>\n`;
  }

  const date = new Date().toISOString().split("T")[0];

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>${escapeHtml(opts.siteTitle)}</title>
<style>
  ${PDF_STYLES}
</style>
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&amp;family=Inter:wght@400;500;600&amp;display=swap"
/>
</head>
<body>
  <div class="cover">
    <h1>${escapeHtml(opts.siteTitle)}</h1>
    <p class="sub">课程笔记${opts.tag ? ` · ${escapeHtml(opts.tag)}` : ""}</p>
    <p class="author">by ${escapeHtml(opts.authorName)}</p>
    <p class="date">${date}</p>
    <p class="license">
      <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
      <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>
    </p>
    <div class="links">
      <a href="${opts.siteUrl}">
        <svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
        在线阅读
      </a>
      <a href="${opts.githubUrl}">
        <svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
        GitHub
      </a>
      <a href="${opts.authorUrl}">
        <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        Cateds
      </a>
    </div>
  </div>

  <div class="toc">
    <h2>目录</h2>
    ${tocHtml}
  </div>

  ${articlesHtml}
</body>
</html>`;
}

export type { ArticleData, BuildHtmlOptions, PartDef };