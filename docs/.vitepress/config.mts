import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Power Electronics",
  base: "/PowerElectronics.md/",
  markdown: {
    math: true,
  },
  description:
    "Lecture notes for Power Electronics (PE) course @ 2025-2026 Spring, Glasgow College, UESTC.",

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
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Author", link: "https://cateds.github.io/" },
      { text: "StudyHub", link: "https://www.study-hub.store/" },
    ],

    outline: [0, 4],

    sidebar: [
      {
        text: "Part.1 器件",
        items: [
          {
            text: "Lec.1 引言",
            link: "/lectures/lec1",
          },
        ],
      },
      {
        text: "Part.2 电路和调制",
      },
      {
        text: "Part.3 应用",
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
