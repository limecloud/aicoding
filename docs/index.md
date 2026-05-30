---
layout: home

hero:
  name: AI Coding
  text: 面向 AI-native 软件工程的全流程知识站
  tagline: 从需求、上下文、实现、测试、AI 审查、验收、发布到团队治理，把“AI 会写代码”升级成“团队能稳定交付软件”。
  actions:
    - theme: brand
      text: 开始阅读
      link: /guide/why-ai-coding
    - theme: alt
      text: Harness Engine
      link: /harness/overview
    - theme: alt
      text: AI-Native 验收
      link: /acceptance/ai-native-acceptance
    - theme: alt
      text: Prompt 模板
      link: /reference/prompt-library

features:
  - title: 工作流优先
    details: 不把 AI Coding 当成代码补全，而是设计从 PRD 到发布的端到端工程流水线。
  - title: Harness Engine
    details: 用 MCP、工具、Workflow Graph、安全、人类门和证据存储，把 AI 变成可控工程系统。
  - title: AI 先审
    details: Implementer 写完后由多角色 Reviewer Swarm 先审，人才做最终裁决。
  - title: 证据驱动
    details: 每个结论绑定 diff、测试、trace、日志、截图、风险与回滚路径。
  - title: 资料映射
    details: 把 Claude Code、Anthropic Harness、OpenAI Agents、LangGraph 等外部实践整理成本站模块。
  - title: 治理内建
    details: 把 current、compat、deprecated、dead、契约同步和发布事实源写成默认约束。
---

## 大模块

<div class="ac-stage-grid">
  <div class="ac-stage-card">
    <h3>1. 起步</h3>
    <p>建立 AI Coding 的正确心智模型：它不是更快的打字机，而是新的工程生产系统。</p>
  </div>
  <div class="ac-stage-card">
    <h3>2. 工作流</h3>
    <p>需求切片、上下文工程、实现循环、人机交接，把大任务压缩成可验收的垂直切片。</p>
  </div>
  <div class="ac-stage-card">
    <h3>3. Harness Engine</h3>
    <p>把模型、上下文、工具、协议、状态、审查、发布和人类门组织成可运行的工程引擎。</p>
  </div>
  <div class="ac-stage-card">
    <h3>4. 验收</h3>
    <p>AI 先审代码、测试、安全和治理，人只裁决 blocker、high、争议项和产品判断。</p>
  </div>
  <div class="ac-stage-card">
    <h3>5. 工程质量</h3>
    <p>架构、测试、安全、发布、可维护性全部进入 AI Coding 的默认验收面。</p>
  </div>
  <div class="ac-stage-card">
    <h3>6. 团队落地</h3>
    <p>定义角色、指标、工具和运行机制，避免 AI 产能扩大后把人变成瓶颈。</p>
  </div>
  <div class="ac-stage-card">
    <h3>7. 模板与契约</h3>
    <p>提供 Prompt、Reviewer JSON、检查清单和术语表，让流程可以被自动化复用。</p>
  </div>
  <div class="ac-stage-card">
    <h3>8. 附录</h3>
    <p>整理 Claude Code Best Practices、Anthropic Harness、OpenAI Agents、LangGraph 等资料，并映射到本站体系。</p>
  </div>
</div>

## 核心原则

- **Harness-first**：Weights 和 Context 决定能力上限，Harness 决定工程可控性、可恢复性和可验收性。
- **AI-native，不是 AI-assisted**：不要让人类先审几千行 diff；先让 AI 做多角色审查与证据收集。
- **小切片，不堆大包**：一次变更必须能说清用户价值、影响面和回滚路径。
- **测试不是终点**：AI 写的单测和 E2E 还需要另一个 AI 审查测试是否有效。
- **人类保持裁决权**：产品判断、风险接受、架构方向和最终发布仍由人类 owner 决定。
