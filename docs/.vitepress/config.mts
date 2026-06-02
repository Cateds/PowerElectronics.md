import { defineConfig } from "vitepress";
import fs from "node:fs";
import path from "node:path";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Power Electronics",
  base: "/PowerElectronics.md/",
  sitemap: {
    hostname: "https://cateds.github.io/PowerElectronics.md/",
  },
  markdown: {
    math: true,
  },
  description:
    "Lecture notes for Power Electronics (PE) course @ 2025-2026 Spring, Glasgow College, UESTC.",

  transformPageData(pageData, ctx) {
    const fullPath = path.join(ctx.siteConfig.srcDir, pageData.filePath);
    if (!fs.existsSync(fullPath)) return;

    const content = fs.readFileSync(fullPath, "utf-8");
    const body = content.replace(/^---[\s\S]*?---/, "");
    const words = body.match(/[\u4E00-\u9FA5]|[a-zA-Z0-9_\-]+/g);
    const wordCount = words ? words.length : 0;
    const readTime = Math.ceil(wordCount / 275) || 1;

    pageData.frontmatter.wordCount = wordCount;
    pageData.frontmatter.readTime = readTime;
  },

  head: [
    // Google Fonts: Inter (body) + Noto Serif SC (headings)
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Serif+SC:wght@400;600;700&display=swap",
      },
    ],
  ],

  themeConfig: {
    search: { provider: "local" },

    lastUpdated: {
      text: "最近更新",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "GitHub", link: "https://github.com/Cateds/PowerElectronics.md" },
      {
        text: "PDF Version",
        link: "https://github.com/Cateds/PowerElectronics.md/releases",
      },
      { text: "Author", link: "https://cateds.github.io/" },
      { text: "StudyHub", link: "https://www.study-hub.store/" },
    ],

    outline: [2, 4],

    sidebar: [
      {
        text: "Part.1 器件",
        items: [
          {
            text: "Lec.1 引言",
            link: "/lectures/lec1",
          },
          {
            text: "Lec.2 电路复习",
            link: "/lectures/lec2",
          },
          {
            text: "Lec.3 功率开关",
            link: "/lectures/lec3",
          },
          {
            text: "Lec.4 不可控开关",
            link: "/lectures/lec4",
          },
          {
            text: "Lec.5 可控开关",
            link: "/lectures/lec5",
          },
          {
            text: "Lec.6 热管理",
            link: "/lectures/lec6",
          },
        ],
      },
      {
        text: "Part.2 电路和调制",
        items: [
          {
            text: "Lec.7 Buck 变换器",
            link: "/lectures/lec7",
          },
          {
            text: "Lec.8 Boost & Buck-Boost",
            link: "/lectures/lec8",
          },
          {
            text: "Lec.9 反激变换器 & 缓冲电路",
            link: "/lectures/lec9",
          },
          {
            text: "Lec.10 半桥逆变器",
            link: "/lectures/lec10",
          },
          {
            text: "Lec.11 全桥逆变器",
            link: "/lectures/lec11",
          },
          {
            text: "Lec.12 三桥臂逆变器",
            link: "/lectures/lec12",
          },
        ],
      },
      {
        text: "Part.3 应用",
        items: [
          {
            text: "Lec.13 应用与系统",
            link: "/lectures/lec13",
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/Cateds/PowerElectronics.md" },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="2 2 20 20" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>',
        },
        link: "https://cateds.github.io/",
      },
    ],
  },
});
