import puppeteer from "puppeteer";
import http from "node:http";
import { readFileSync, mkdirSync, unlinkSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { execSync } from "node:child_process";
import serveHandler from "serve-handler";
import { buildHtml, type ArticleData, type PartDef } from "./build-html";
import { rewriteInternalLinks } from "./rewrite-links";

const CONCURRENCY = 4;
const PUBLIC_DIR = resolve(process.cwd(), "docs/.vitepress/dist");
const SITEMAP_PATH = join(PUBLIC_DIR, "sitemap.xml");
const OUTPUT_DIR = resolve(process.cwd(), "pdf-output");
const SITE_TITLE = "Power Electronics";
const SITE_URL = "https://cateds.github.io/PowerElectronics.md/";
const GITHUB_URL = "https://github.com/Cateds/PowerElectronics.md";
const AUTHOR_URL = "https://cateds.github.io/";
const AUTHOR_NAME = "Cateds";

const PARTS: PartDef[] = [
  { label: "Part.1 器件", startIndex: 0 },
  { label: "Part.2 电路和调制", startIndex: 6 },
  { label: "Part.3 应用", startIndex: 12 },
];

// Matches sidebar link order in config.mts, without .html suffix
const SIDEBAR_ORDER = [
  "/lectures/lec1",
  "/lectures/lec2",
  "/lectures/lec3",
  "/lectures/lec4",
  "/lectures/lec5",
  "/lectures/lec6",
  "/lectures/lec7",
  "/lectures/lec8",
  "/lectures/lec9",
  "/lectures/lec10",
  "/lectures/lec11",
  "/lectures/lec12",
  "/lectures/lec13",
  "/papers/stats",
  "/papers/formula",
];

const SKIP_BUILD = process.argv.includes("--skip-build");
const CI = process.env.CI === "true";
const TAG =
  process.argv.find((a, i) => a === "--tag" && process.argv[i + 1])?.replace("--tag ", "") ||
  process.env.RELEASE_TAG ||
  "";
const OUTPUT_FILE = join(OUTPUT_DIR, "PowerElectronics.pdf");

async function main() {
  if (!SKIP_BUILD) {
    console.log("[1/5] Building site...");
    execSync("bun run docs:build", { stdio: "inherit", cwd: process.cwd() });
  } else {
    console.log("[1/5] Build skipped (dist dir already exists)");
  }

  if (!readFileSync(SITEMAP_PATH, "utf-8").trim()) {
    console.error("❌ Sitemap is empty. Build may have failed.");
    process.exit(1);
  }

  console.log("[2/5] Parsing sitemap...");
  const sitemap = readFileSync(SITEMAP_PATH, "utf-8");
  const urlMatches = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)];
  const allUrls = urlMatches.map((m) => m[1]);

  if (allUrls.length === 0) {
    console.error("❌ No URLs found in sitemap.");
    process.exit(1);
  }

  const urls = allUrls.filter((url) => {
    const pathname = new URL(url).pathname;
    return pathname !== "/PowerElectronics.md/" &&
           pathname !== "/PowerElectronics.md/index.html";
  });

  const pathPrefix = new URL(SITE_URL).pathname;
  console.log(`   Found ${urls.length} content pages (skipped homepage), path prefix: "${pathPrefix}"`);

  const server = http.createServer((req, res) => {
    serveHandler(req, res, {
      public: PUBLIC_DIR,
      cleanUrls: true,
    });
  });

  const port = await new Promise<number>((resolveP, reject) => {
    server.listen(0, () => {
      const addr = server.address();
      if (addr && typeof addr === "object") resolveP(addr.port);
      else reject(new Error("Failed to get server port"));
    });
    server.on("error", reject);
  });
  console.log(`[3/5] Local server started on port ${port}`);

  console.log(`[4/5] Extracting page content (${CONCURRENCY} workers)...`);
  const browser = await puppeteer.launch({
    headless: true,
    args: CI ? ["--no-sandbox", "--disable-setuid-sandbox"] : [],
  });
  const articles: ArticleData[] = [];

  try {
    interface Task {
      url: string;
      localPath: string;
    }
    const tasks: Task[] = urls.map((url) => {
      const pathname = new URL(url).pathname;
      const localPath = pathname.replace(pathPrefix, "/") || "/";
      return { url, localPath };
    });
    const total = tasks.length;
    let done = 0;

    async function scrapeWorker(workerId: number) {
      let task: Task | undefined;
      while ((task = tasks.shift())) {
        done++;
        const tag = `[${String(done).padStart(2)}/${total}] W${workerId}`;

        const page = await browser.newPage();
        try {
          await page.goto(`http://localhost:${port}${task.localPath}`, {
            waitUntil: "networkidle0",
            timeout: 30000,
          });

          await new Promise((r) => setTimeout(r, 600));

          const data = await page.evaluate((prefix: string) => {
            const vpDoc = document.querySelector<HTMLElement>(".vp-doc");
            if (!vpDoc) return null;

            const innerDiv = vpDoc.querySelector(":scope > div") as HTMLElement;
            const contentEl = innerDiv || vpDoc;

            const clone = contentEl.cloneNode(true) as HTMLElement;

            clone.querySelectorAll("img[src]").forEach((img) => {
              const src = img.getAttribute("src");
              if (src && !src.startsWith("http") && !src.startsWith("data:")) {
                try {
                  const cleanSrc = src.startsWith(prefix) ? src.slice(prefix.length) : src;
                  img.setAttribute("src", cleanSrc);
                } catch {}
              }
            });

            clone.querySelectorAll("script").forEach((s) => s.remove());
            clone.querySelectorAll("a.header-anchor").forEach((a) => a.remove());

            const h1 = clone.querySelector("h1");
            if (h1) h1.remove();

            clone.querySelectorAll("details").forEach((d) => {
              d.setAttribute("open", "");
            });

            const title =
              vpDoc.querySelector("h1")?.textContent
                ?.replace(/[\u200B\u200C\u200D\uFEFF]/g, "")
                .trim() ||
              document.title ||
              "";

            return { title, content: clone.innerHTML };
          }, pathPrefix);

          if (data && data.content) {
            const parts = task.localPath.replace(/\/$/, "").split("/").filter(Boolean);
            const folder = parts.length > 0 ? parts[0] : ".";
            const fileName = parts.length > 1 ? parts[parts.length - 1] : "index";
            const normalized = task.localPath.replace(/\.html$/, "").replace(/\/$/, "") || "/";
            const sidebarIndex = SIDEBAR_ORDER.indexOf(normalized);
            const sortKey =
              sidebarIndex >= 0
                ? String(sidebarIndex).padStart(4, "0")
                : fileName === "index"
                  ? `${folder}/__00_index`
                  : `${folder}/${fileName}`;

            articles.push({
              path: task.localPath,
              title: data.title,
              content: data.content,
              folder,
              sortKey,
            });
            console.log(`${tag} ${task.localPath} ✓`);
          } else {
            console.log(`${tag} ${task.localPath} (empty)`);
          }
        } catch (err) {
          console.log(`${tag} ${task.localPath} ✗ ${(err as Error).message}`);
        } finally {
          await page.close();
        }
      }
    }

    const workers = Array.from({ length: CONCURRENCY }, (_, i) => scrapeWorker(i + 1));
    await Promise.all(workers);

    articles.sort((a, b) => a.sortKey.localeCompare(b.sortKey, undefined, { numeric: true }));
    console.log(`\n   Extracted ${articles.length}/${urls.length} articles.`);

    rewriteInternalLinks(articles, pathPrefix);

    console.log("[5/5] Generating PDF...");
    const html = buildHtml(articles, {
      siteTitle: SITE_TITLE,
      tag: TAG,
      siteUrl: SITE_URL,
      githubUrl: GITHUB_URL,
      authorUrl: AUTHOR_URL,
      authorName: AUTHOR_NAME,
      parts: PARTS,
    });
    mkdirSync(OUTPUT_DIR, { recursive: true });

    const tempHtmlPath = join(PUBLIC_DIR, "__pdf_render.html");
    writeFileSync(tempHtmlPath, html);

    const pdfPage = await browser.newPage();
    await pdfPage.goto(`http://localhost:${port}/__pdf_render.html`, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    await new Promise((r) => setTimeout(r, 2000));

    await pdfPage.pdf({
      path: OUTPUT_FILE,
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: "<div></div>",
      footerTemplate: `<div style="font-size:12px;text-align:center;width:100%;color:#8a969e;font-family:Inter,sans-serif;">
        - <span class="pageNumber"></span> -
      </div>`,
      margin: {
        top: "2cm",
        bottom: "2cm",
        left: "2cm",
        right: "2cm",
      },
    });

    await pdfPage.close();

    try { unlinkSync(tempHtmlPath); } catch {}

    const size = (readFileSync(OUTPUT_FILE).byteLength / 1024 / 1024).toFixed(1);
    console.log(`\n✅ PDF saved: ${OUTPUT_FILE} (${size} MB)`);
  } finally {
    await browser.close();
    server.close();
  }
}

function getCommonPathPrefix(urls: string[]): string {
  const paths = urls.map((u) => new URL(u).pathname);
  if (paths.length === 0) return "/";
  let prefix = paths[0];
  for (const p of paths) {
    while (!p.startsWith(prefix)) {
      prefix = prefix.slice(0, prefix.lastIndexOf("/", prefix.length - 2) + 1);
      if (prefix === "/") break;
    }
  }
  return prefix.endsWith("/") ? prefix : prefix + "/";
}

main().catch((err) => {
  console.error("\n❌ Fatal:", err);
  process.exit(1);
});