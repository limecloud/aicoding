import DefaultTheme from 'vitepress/theme'
import { defineComponent, h, nextTick, onMounted, watch } from 'vue'
import type { Theme } from 'vitepress'
import { useRoute } from 'vitepress'
import MermaidDiagram from './MermaidDiagram.vue'
import './custom.css'

function normalizeMarkdownPath(path: string): string {
  const withoutHash = path.split('#')[0].split('?')[0]
  const base = import.meta.env.BASE_URL
  const withoutBase = base !== '/' && withoutHash.startsWith(base)
    ? `/${withoutHash.slice(base.length)}`
    : withoutHash
  const normalized = withoutBase.endsWith('/') ? `${withoutBase}index` : withoutBase
  const withoutLeadingSlash = normalized.replace(/^\/+/, '')
  return `${withoutLeadingSlash || 'index'}.md`
}

async function copyCurrentMarkdown(path: string) {
  const markdownPath = normalizeMarkdownPath(path)
  const candidates = [
    `${import.meta.env.BASE_URL}markdown/${markdownPath}`.replace(/\/+/g, '/'),
    `https://raw.githubusercontent.com/limecloud/aicoding/main/docs/${markdownPath}`
  ]

  let markdown = ''
  for (const url of candidates) {
    try {
      const response = await fetch(url)
      if (response.ok) {
        markdown = await response.text()
        break
      }
    } catch {
      // Try the next source.
    }
  }

  if (!markdown) throw new Error(`Unable to fetch ${markdownPath}`)
  await writeClipboard(markdown)
}

async function writeClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value)
    return
  }

  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.setAttribute('readonly', 'true')
  textarea.style.position = 'fixed'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()

  try {
    document.execCommand('copy')
  } finally {
    document.body.removeChild(textarea)
  }
}


function openDiagramLightbox(source: Element) {
  const existing = document.querySelector('.ac-lightbox')
  if (existing) existing.remove()

  const overlay = document.createElement('div')
  overlay.className = 'ac-lightbox'
  overlay.setAttribute('role', 'dialog')
  overlay.setAttribute('aria-modal', 'true')

  const stage = document.createElement('div')
  stage.className = 'ac-lightbox__stage'

  const close = document.createElement('button')
  close.className = 'ac-lightbox__close'
  close.type = 'button'
  close.textContent = '关闭'

  const hint = document.createElement('div')
  hint.className = 'ac-lightbox__hint'
  hint.textContent = '滚动查看大图，按 Esc 关闭'

  const clone = source.cloneNode(true) as Element
  clone.removeAttribute('id')
  stage.appendChild(clone)
  overlay.append(close, stage, hint)
  document.body.appendChild(overlay)
  document.body.style.overflow = 'hidden'

  const cleanup = () => {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', onKeydown)
    overlay.remove()
  }

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') cleanup()
  }

  close.addEventListener('click', cleanup)
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) cleanup()
  })
  document.addEventListener('keydown', onKeydown)
}

function installDiagramLightbox() {
  const targets = [
    ...document.querySelectorAll('.ac-mermaid__canvas svg'),
    ...document.querySelectorAll('img[src$="harness-engine-shift.svg"]')
  ]

  for (const target of targets) {
    const element = target as HTMLElement
    if (element.dataset.lightboxReady === 'true') continue
    element.dataset.lightboxReady = 'true'
    element.tabIndex = 0
    element.setAttribute('role', 'button')
    element.setAttribute('aria-label', '点击放大图表')
    element.addEventListener('click', () => openDiagramLightbox(element))
    element.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        openDiagramLightbox(element)
      }
    })
  }
}

const CopyMarkdownButton = defineComponent({
  name: 'CopyMarkdownButton',
  setup() {
    const route = useRoute()

    onMounted(() => {
      const update = () => {
        const existing = document.querySelector<HTMLButtonElement>('.ac-copy-md')
        if (existing) existing.dataset.path = route.path
        const scheduleInstall = () => {
          installDiagramLightbox()
          window.setTimeout(installDiagramLightbox, 300)
          window.setTimeout(installDiagramLightbox, 1000)
        }
        nextTick(scheduleInstall)
      }
      update()
      watch(() => route.path, update)
    })

    return () => h('button', {
      class: 'ac-copy-md',
      type: 'button',
      'data-path': route.path,
      onClick: async (event: MouseEvent) => {
        const button = event.currentTarget as HTMLButtonElement
        const original = button.textContent || '复制 Markdown'
        button.disabled = true
        try {
          await copyCurrentMarkdown(button.dataset.path || route.path)
          button.textContent = '已复制 Markdown'
        } catch {
          button.textContent = '复制失败'
        } finally {
          window.setTimeout(() => {
            button.textContent = original
            button.disabled = false
          }, 1400)
        }
      }
    }, '复制 Markdown')
  }
})

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('MermaidDiagram', MermaidDiagram)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(CopyMarkdownButton)
    })
  }
} satisfies Theme
