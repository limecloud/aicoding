import { defineConfig } from 'vitepress'

const base = process.env.VITEPRESS_BASE || '/'

const nav = [
  { text: '起步', link: '/guide/why-ai-coding' },
  { text: '全景', link: '/landscape/knowledge-map' },
  { text: '工作流', link: '/workflow/overview' },
  { text: 'Harness', link: '/harness/overview' },
  { text: '验收', link: '/acceptance/ai-native-acceptance' },
  { text: '质量', link: '/quality/architecture' },
  { text: '团队', link: '/team/operating-model' },
  { text: '模板', link: '/reference/prompt-library' },
  { text: '附录', link: '/appendix/claude-code-best-practices' },
  { text: 'GitHub', link: 'https://github.com/limecloud/aicoding' }
]

const sidebar = [
  {
    text: '起步',
    items: [
      { text: '总览', link: '/' },
      { text: '为什么需要 AI Coding 体系', link: '/guide/why-ai-coding' },
      { text: 'AI Coding 操作系统', link: '/guide/operating-system' },
      { text: '成熟度模型', link: '/guide/maturity-model' }
    ]
  },
  {
    text: '全景知识库',
    items: [
      { text: '知识地图', link: '/landscape/knowledge-map' },
      { text: 'Token 预算与取舍', link: '/landscape/token-budget' },
      { text: '工具生态', link: '/landscape/tool-ecosystem' },
      { text: '上下文与记忆', link: '/landscape/context-and-memory' },
      { text: '仓库理解与事实源', link: '/landscape/repo-understanding' },
      { text: '协议与 Runtime', link: '/landscape/protocols-and-runtime' },
      { text: 'Benchmark 与 Evals', link: '/landscape/benchmark-and-evals' },
      { text: '安全与风险', link: '/landscape/security-and-risk' },
      { text: '产品与视觉验收', link: '/landscape/product-and-design' },
      { text: '数据与迁移', link: '/landscape/data-and-migrations' },
      { text: '观测与成本', link: '/landscape/observability-and-cost' },
      { text: '失败模式', link: '/landscape/failure-modes' },
      { text: '落地路线图', link: '/landscape/adoption-roadmap' }
    ]
  },
  {
    text: '工作流',
    items: [
      { text: '全流程地图', link: '/workflow/overview' },
      { text: 'PRD 与任务切片', link: '/workflow/prd-and-slicing' },
      { text: '上下文工程', link: '/workflow/context-engineering' },
      { text: '实现循环', link: '/workflow/implementation-loop' },
      { text: '写代码实战方法', link: '/workflow/coding-playbook' },
      { text: '人机协作协议', link: '/workflow/handoff-protocol' }
    ]
  },
  {
    text: 'Harness 引擎',
    items: [
      { text: 'Harness 总览', link: '/harness/overview' },
      { text: '业界模式整理', link: '/harness/industry-patterns' },
      { text: 'AI Coding Harness 蓝图', link: '/harness/ai-coding-harness' }
    ]
  },
  {
    text: 'AI 先审验收',
    items: [
      { text: '验收总览', link: '/acceptance/ai-native-acceptance' },
      { text: '审查 Agent 组', link: '/acceptance/reviewer-swarm' },
      { text: '测试审查', link: '/acceptance/test-skeptic' },
      { text: '安全红队', link: '/acceptance/security-red-team' },
      { text: '证据包与人工裁决', link: '/acceptance/evidence-and-human-arbiter' }
    ]
  },
  {
    text: '工程质量',
    items: [
      { text: '架构与治理', link: '/quality/architecture' },
      { text: '测试策略', link: '/quality/testing-strategy' },
      { text: '安全与权限', link: '/quality/security' },
      { text: '发布、灰度与回滚', link: '/quality/release' },
      { text: '可维护性', link: '/quality/maintainability' }
    ]
  },
  {
    text: '团队落地',
    items: [
      { text: '组织运行模型', link: '/team/operating-model' },
      { text: '角色与职责', link: '/team/roles' },
      { text: '度量指标', link: '/team/metrics' },
      { text: '工具选型', link: '/team/tooling' }
    ]
  },
  {
    text: '参考',
    items: [
      { text: '提示词模板库', link: '/reference/prompt-library' },
      { text: 'AI 审查 JSON 契约', link: '/reference/reviewer-contract' },
      { text: '检查清单', link: '/reference/checklists' },
      { text: '术语表', link: '/reference/glossary' }
    ]
  },
  {
    text: '附录',
    items: [
      { text: 'Harness 阅读地图', link: '/appendix/harness-reading-map' },
      { text: 'Claude Code Best Practices 导读', link: '/appendix/claude-code-best-practices' },
      { text: 'OpenAI Building Agents 导读', link: '/appendix/openai-building-agents-guide' },
      { text: 'LangChain Harness 分层导读', link: '/appendix/langchain-framework-runtime-harness' }
    ]
  }
]

export default defineConfig({
  base,
  title: 'AI Coding',
  description: '面向 AI 时代软件工程的全流程知识站。',
  cleanUrls: true,
  lastUpdated: true,
  metaChunk: true,
  head: [
    ['link', { rel: 'icon', href: `${base}favicon.svg` }],
    ['meta', { name: 'theme-color', content: '#0f2f3d' }],
    ['meta', { property: 'og:title', content: 'AI Coding' }],
    ['meta', { property: 'og:description', content: '面向 AI 时代软件工程的全流程知识站。' }]
  ],
  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: 'AI Coding',
    nav,
    sidebar,
    search: { provider: 'local' },
    editLink: {
      pattern: 'https://github.com/limecloud/aicoding/edit/main/docs/:path',
      text: '在 GitHub 编辑本页'
    },
    footer: {
      message: '给使用 Coding Agent 交付软件的团队准备的 AI Coding 知识库。',
      copyright: '用于讨论、落地和持续迭代。'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/limecloud/aicoding' }
    ]
  },
  markdown: {
    lineNumbers: true,
    config(md) {
      const defaultFence = md.renderer.rules.fence
      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        const language = token.info.trim().split(/\s+/)[0]

        if (language === 'mermaid') {
          const encoded = encodeURIComponent(token.content)
          return `<ClientOnly><MermaidDiagram code="${encoded}" /></ClientOnly>`
        }

        return defaultFence
          ? defaultFence(tokens, idx, options, env, self)
          : self.renderToken(tokens, idx, options)
      }
    }
  }
})
