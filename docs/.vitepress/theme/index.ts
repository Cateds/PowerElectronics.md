// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    const { frontmatter, page } = useData()

    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'doc-before': () => {
        // Render only on regular doc pages, exclude home and custom layouts
        if (frontmatter.value.layout !== 'home' && frontmatter.value.wordCount) {
          return h('div', { class: 'reading-time-info' }, [
            h('span', { class: 'icon' }, '⏱️'),
            h('span', `${frontmatter.value.wordCount} 字`),
            h('span', { class: 'divider' }, '·'),
            h('span', `约 ${frontmatter.value.readTime} 分钟`)
          ])
        }
      }
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme
