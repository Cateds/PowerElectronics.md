// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import GiscusComments from './components/GiscusComments.vue'
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
      },
      'doc-after': () => {
        if (frontmatter.value.layout !== 'home') {
          return h(GiscusComments)
        }
      }
    })
  },
  enhanceApp({ router }) {
    if (typeof window === 'undefined') return

    let routeFadeTimer: number | undefined

    router.onAfterRouteChange = () => {
      const root = document.documentElement

      root.classList.remove('route-fade')
      window.clearTimeout(routeFadeTimer)

      window.requestAnimationFrame(() => {
        root.classList.add('route-fade')
        routeFadeTimer = window.setTimeout(() => {
          root.classList.remove('route-fade')
        }, 260)
      })
    }

    // Search exit animation — intercept close triggers, animate out, then close
    let searchAnimating = false
    const EXIT_MS = 180

    function animateSearchExit(box: HTMLElement, close: () => void) {
      if (searchAnimating) return
      searchAnimating = true
      box.classList.add('exiting')
      setTimeout(() => {
        close()
        searchAnimating = false
      }, EXIT_MS)
    }

    document.addEventListener('click', (e) => {
      if (!e.isTrusted || searchAnimating) return
      const target = e.target instanceof HTMLElement ? e.target : null
      if (!target) return
      const backdrop = target.closest('.VPLocalSearchBox .backdrop')
      if (!backdrop) return
      const box = backdrop.closest('.VPLocalSearchBox') as HTMLElement | null
      if (!box) return

      e.stopPropagation()
      e.stopImmediatePropagation()
      animateSearchExit(box, () => { (backdrop as HTMLElement).click() })
    }, true)

    document.addEventListener('keydown', (e) => {
      if (!e.isTrusted || e.key !== 'Escape' || searchAnimating) return
      const box = document.querySelector('.VPLocalSearchBox') as HTMLElement | null
      if (!box) return

      e.stopPropagation()
      e.stopImmediatePropagation()
      const input = box.querySelector('input') as HTMLElement | null
      animateSearchExit(box, () => {
        input?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
      })
    }, true)
  }
} satisfies Theme
