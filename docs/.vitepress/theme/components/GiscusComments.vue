<template>
  <div class="giscus-wrapper">
    <div id="giscus-comments"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, nextTick } from 'vue'
import { useData } from 'vitepress'

const { isDark } = useData()

function sendGiscusTheme(theme: string) {
  const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
  if (iframe?.contentWindow) {
    iframe.contentWindow.postMessage(
      { giscus: { setConfig: { theme } } },
      'https://giscus.app',
    )
  }
}

function loadGiscus() {
  const container = document.getElementById('giscus-comments')
  if (!container) return
  container.innerHTML = ''

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', 'Cateds/PowerElectronics.md')
  script.setAttribute('data-repo-id', 'R_kgDORnx_YQ')
  script.setAttribute('data-category', 'Comments')
  script.setAttribute('data-category-id', 'DIC_kwDORnx_Yc4C9rBT')
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', isDark.value ? 'transparent_dark' : 'light')
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('crossorigin', 'anonymous')
  script.async = true

  container.appendChild(script)
}

onMounted(() => {
  loadGiscus()
})

watch(isDark, () => {
  nextTick(() => {
    sendGiscusTheme(isDark.value ? 'transparent_dark' : 'light')
  })
})
</script>

<style>
.giscus-wrapper {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
  max-width: 100%;
}
</style>