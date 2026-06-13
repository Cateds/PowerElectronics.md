import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve, sep } from "node:path";
import { posix } from "node:path";

const SITE_TITLE = "Power Electronics";
const SITE_URL = "https://cateds.github.io/PowerElectronics.md/";
const SITE_DESCRIPTION =
  "Lecture notes for Power Electronics (PE) course @ 2025-2026 Spring, Glasgow College, UESTC.";

const INDEX_FILE = "index.md";
const LECTURE_FILE_RE = /^lec(\d+)\.md$/;

interface SourceDoc {
  title: string;
  sourceRelPath: string;
  sourceRelDir: string;
  pageUrl: string;
  body: string;
  kind: "home" | "lecture";
}

interface GenerateLlmsOptions {
  root?: string;
  log?: (message: string) => void;
}

export interface LlmsFile {
  fileName: "llms.txt" | "llms-full.txt";
  content: string;
}

export interface GenerateLlmsResult {
  sourceFiles: string[];
  files: LlmsFile[];
}

export interface WriteLlmsResult extends GenerateLlmsResult {
  outputFiles: string[];
}

interface WriteLlmsOptions extends GenerateLlmsOptions {
  outDir?: string;
}

export function buildLlmsFiles(options: GenerateLlmsOptions = {}): GenerateLlmsResult {
  const root = resolve(options.root ?? process.cwd());
  const docsDir = join(root, "docs");
  const docs = readSourceDocs(docsDir);

  return {
    sourceFiles: docs.map((doc) => join(docsDir, doc.sourceRelPath)),
    files: [
      { fileName: "llms.txt", content: buildLlmsIndex(docs) },
      { fileName: "llms-full.txt", content: buildLlmsFull(docs) },
    ],
  };
}

export function writeLlmsFiles(options: WriteLlmsOptions = {}): WriteLlmsResult {
  const root = resolve(options.root ?? process.cwd());
  const outDir = resolve(root, options.outDir ?? "docs/.vitepress/dist");
  const result = buildLlmsFiles({ root });

  mkdirSync(outDir, { recursive: true });

  const outputFiles = result.files.map((file) => {
    const outputPath = join(outDir, file.fileName);
    writeFileSync(outputPath, file.content, "utf-8");
    return outputPath;
  });

  options.log?.(`Generated ${outputFiles.map((file) => toProjectPath(root, file)).join(" and ")}`);

  return { ...result, outputFiles };
}

export function generateLlms(options: WriteLlmsOptions = {}): WriteLlmsResult {
  return writeLlmsFiles(options);
}

export function isLlmsSourcePath(filePath: string, root = process.cwd()): boolean {
  const docsDir = join(resolve(root), "docs");
  const rel = toPosixPath(filePath.startsWith(docsDir) ? filePath.slice(docsDir.length + 1) : filePath);

  return rel === INDEX_FILE || /^lectures\/lec\d+\.md$/.test(rel);
}

function readSourceDocs(docsDir: string): SourceDoc[] {
  const indexPath = join(docsDir, INDEX_FILE);
  const lecturesDir = join(docsDir, "lectures");
  const docs: SourceDoc[] = [];

  if (existsSync(indexPath)) {
    docs.push(readDoc(docsDir, INDEX_FILE, "home"));
  }

  const lectureFiles = readdirSync(lecturesDir)
    .filter((file) => LECTURE_FILE_RE.test(file))
    .sort((a, b) => lectureNumber(a) - lectureNumber(b));

  for (const file of lectureFiles) {
    docs.push(readDoc(docsDir, `lectures/${file}`, "lecture"));
  }

  return docs;
}

function readDoc(docsDir: string, sourceRelPath: string, kind: SourceDoc["kind"]): SourceDoc {
  const fullPath = join(docsDir, sourceRelPath);
  const raw = readFileSync(fullPath, "utf-8");
  const body = stripFrontmatter(raw).trim();
  const title = extractTitle(raw, body, kind === "home" ? SITE_TITLE : basename(sourceRelPath, ".md"));
  const sourceRelDir = toPosixPath(dirname(sourceRelPath));

  return {
    title,
    sourceRelPath,
    sourceRelDir: sourceRelDir === "." ? "" : sourceRelDir,
    pageUrl: pageUrlFor(sourceRelPath),
    body: rewriteMarkdownUrls(body, sourceRelDir === "." ? "" : sourceRelDir),
    kind,
  };
}

function buildLlmsIndex(docs: SourceDoc[]): string {
  const lectures = docs.filter((doc) => doc.kind === "lecture");
  const lines = [
    `# ${SITE_TITLE}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "This site contains Chinese lecture notes for a Power Electronics course. It is published with VitePress and includes equations, Markdown tables, and linked lecture images.",
    "",
    "For LLM tools, use the full context file when you need a single source containing all current lecture Markdown. The full file preserves LaTeX and rewrites local image links to absolute GitHub Pages URLs, but it does not transcribe image contents.",
    "",
    "## LLM Sources",
    "",
    `- [Full NotebookLM context](${siteUrlFor("llms-full.txt")}): Generated full-text source containing the homepage and all lecture Markdown files. Use this as the main NotebookLM reference source.`,
    `- [Course website](${SITE_URL}): Human-readable VitePress version of the same course notes.`,
    `- [GitHub repository](https://github.com/Cateds/PowerElectronics.md): Source repository for these notes.`,
    "",
    "## Lectures",
    "",
    ...lectures.map((doc) => `- [${doc.title}](${doc.pageUrl}): Human-readable page included in the full LLM context file.`),
    "",
  ];

  return lines.join("\n");
}

function buildLlmsFull(docs: SourceDoc[]): string {
  const lines = [
    `# ${SITE_TITLE}: Full LLM Context`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    `Source website: ${SITE_URL}`,
    `LLM index: ${siteUrlFor("llms.txt")}`,
    "",
    "This generated file is intended for NotebookLM or other tools that prefer a single reference source. It contains the homepage body and all lecture Markdown files in lecture order. Local image and document links have been rewritten to absolute GitHub Pages URLs where possible. Each source document starts at an H2 heading so horizontal rules in the original notes remain ordinary content.",
    "",
    "## Contents",
    "",
    ...docs.map((doc) => `- [${doc.title}](${doc.pageUrl})`),
    "",
  ];

  for (const doc of docs) {
    lines.push(...buildFullDocSection(doc), "");
  }

  return lines.join("\n").replace(/\n{4,}/g, "\n\n\n");
}

function buildFullDocSection(doc: SourceDoc): string[] {
  const body = demoteMarkdownHeadings(removeLeadingH1(doc.body)).trim();
  const lines = [
    `## ${doc.title}`,
    "",
    `Source: ${doc.pageUrl}`,
    `Repository path: docs/${doc.sourceRelPath}`,
  ];

  if (body) {
    lines.push("", body);
  }

  return lines;
}

function removeLeadingH1(markdown: string): string {
  return markdown.replace(/^#\s+.+(?:\r?\n|$)/, "").trimStart();
}

function demoteMarkdownHeadings(markdown: string): string {
  let inFence = false;
  let fenceChar = "";
  let fenceLength = 0;

  return markdown
    .split(/\r?\n/)
    .map((line) => {
      const fence = line.match(/^(\s{0,3})(`{3,}|~{3,})/);
      if (fence) {
        const marker = fence[2];
        const char = marker[0];

        if (!inFence) {
          inFence = true;
          fenceChar = char;
          fenceLength = marker.length;
        } else if (char === fenceChar && marker.length >= fenceLength) {
          inFence = false;
        }

        return line;
      }

      if (inFence) return line;
      return line.replace(/^(\s{0,3})(#{1,5})(\s+)/, "$1#$2$3");
    })
    .join("\n");
}

function stripFrontmatter(content: string): string {
  return content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");
}

function extractTitle(raw: string, body: string, fallback: string): string {
  const h1 = body.match(/^#\s+(.+)$/m)?.[1]?.trim();
  if (h1) return h1;

  const frontmatterTitle = raw.match(/^---\r?\n[\s\S]*?^title:\s*["']?(.+?)["']?\s*$[\s\S]*?\r?\n---/m)?.[1]?.trim();
  return frontmatterTitle || fallback;
}

function rewriteMarkdownUrls(markdown: string, sourceRelDir: string): string {
  return markdown.replace(/(!?\[[^\]\n]*\]\()([^\)\n]+)(\))/g, (_match, prefix: string, rawTarget: string, suffix: string) => {
    const target = rawTarget.trim();
    const parsed = target.match(/^(\S+)(\s+.+)?$/);
    if (!parsed) return `${prefix}${rawTarget}${suffix}`;

    const url = parsed[1];
    const title = parsed[2] ?? "";
    return `${prefix}${resolveMarkdownUrl(url, sourceRelDir)}${title}${suffix}`;
  });
}

function resolveMarkdownUrl(url: string, sourceRelDir: string): string {
  if (/^(https?:|mailto:|data:|#)/i.test(url)) return url;

  const [pathPart, hashPart] = splitHash(url);
  if (!pathPart) return url;

  if (pathPart.startsWith("/")) {
    return siteUrlFor(pathPart.slice(1)) + hashPart;
  }

  const normalized = posix.normalize(posix.join(sourceRelDir, pathPart));

  if (normalized.endsWith(".md")) {
    return pageUrlFor(normalized) + hashPart;
  }

  return siteUrlFor(normalized) + hashPart;
}

function splitHash(url: string): [string, string] {
  const hashIndex = url.indexOf("#");
  if (hashIndex === -1) return [url, ""];
  return [url.slice(0, hashIndex), url.slice(hashIndex)];
}

function pageUrlFor(sourceRelPath: string): string {
  if (sourceRelPath === INDEX_FILE) return SITE_URL;
  return siteUrlFor(sourceRelPath.replace(/\.md$/, ".html"));
}

function siteUrlFor(relPath: string): string {
  return new URL(relPath.split("/").map(encodeURIComponent).join("/"), SITE_URL).toString();
}

function lectureNumber(file: string): number {
  return Number(file.match(LECTURE_FILE_RE)?.[1] ?? 0);
}

function toProjectPath(root: string, filePath: string): string {
  return toPosixPath(filePath.slice(root.length + 1));
}

function toPosixPath(filePath: string): string {
  return filePath.split(sep).join("/");
}

if (import.meta.main) {
  writeLlmsFiles({ log: (message) => console.log(message) });
}
