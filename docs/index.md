---
layout: home

hero:
  name: AI Coding
  text: 面向 AI 时代软件工程的全景知识库
  tagline: 不只追求“AI 多写代码”，而是把需求、上下文、实现、测试、审查、验收、发布和治理串成一套可交付系统。
  actions:
    - theme: brand
      text: 开始阅读
      link: /guide/why-ai-coding
    - theme: brand
      text: 全景地图
      link: /landscape/knowledge-map
    - theme: alt
      text: Harness 引擎
      link: /harness/overview
    - theme: alt
      text: AI 先审验收
      link: /acceptance/ai-native-acceptance
    - theme: alt
      text: 提示词模板
      link: /reference/prompt-library

features:
  - title: 工作流优先
    details: 不把 AI Coding 当成代码补全，而是重建从需求到发布的交付链路。
  - title: 全景知识库
    details: 覆盖模型、上下文、工具、协议、运行时、验收、安全、数据、合规、成本和团队落地。
  - title: Harness 引擎
    details: 用工具、权限、工作流图、证据库和人工关口，把 AI 能力装进可控的工程系统。
  - title: AI 先审
    details: 实现 Agent 完成后，先由审查 Agent 组分层审查，再交给人做最终裁决。
  - title: 证据驱动
    details: 每个结论都要对应代码差异、测试结果、链路记录、日志、截图、风险和回滚路径。
  - title: 资料映射
    details: 把 Claude Code、Anthropic Harness、OpenAI Agents、LangGraph 等实践整理成本站方法论。
  - title: 治理内建
    details: 把 current、compat、deprecated、dead、契约同步和发布事实源写成默认约束。
  - title: 按预算取舍
    details: 不追求每次跑满流程，而是按风险和 Token 预算选择简化、标准或严控模式。
---

## 大模块

<div class="ac-stage-grid">
  <div class="ac-stage-card">
    <h3>1. 起步</h3>
    <p>先统一心智：AI Coding 不是更快的打字机，而是一套新的软件交付方式。</p>
  </div>
  <div class="ac-stage-card">
    <h3>2. 全景知识库</h3>
    <p>梳理工具生态、上下文、协议、评估、安全、数据、成本、合规和失败模式。</p>
  </div>
  <div class="ac-stage-card">
    <h3>3. 工作流</h3>
    <p>用需求切片、上下文包、实现循环和交接协议，把大任务拆成能验收的小切片。</p>
  </div>
  <div class="ac-stage-card">
    <h3>4. Harness 引擎</h3>
    <p>把模型、上下文、工具、状态、审查、发布和人工关口组织成可运行的工程引擎。</p>
  </div>
  <div class="ac-stage-card">
    <h3>5. 验收</h3>
    <p>AI 先审代码、测试、安全和治理；人只裁决阻断级、高风险、争议项和产品判断。</p>
  </div>
  <div class="ac-stage-card">
    <h3>6. 工程质量</h3>
    <p>把架构、测试、安全、发布和可维护性纳入 AI Coding 的默认验收面。</p>
  </div>
  <div class="ac-stage-card">
    <h3>7. 团队落地</h3>
    <p>定义角色、指标、权限和运行机制，避免 AI 产能扩大后把人变成瓶颈。</p>
  </div>
  <div class="ac-stage-card">
    <h3>8. 模板与契约</h3>
    <p>沉淀提示词、审查 JSON、检查清单和术语表，让流程能复用、能自动化。</p>
  </div>
  <div class="ac-stage-card">
    <h3>9. 附录</h3>
    <p>整理 Claude Code、Anthropic、OpenAI、LangChain 等资料，并映射到本站体系。</p>
  </div>
</div>

::: warning 不是越全越好
完整流程会消耗 Token、工具时间、CI 时间和人的注意力。低风险小改动可以走简化模式；高风险变更必须保留安全、数据、发布和人工关口。预算不足时，优先缩小任务切片，而不是跳过关键验收。
:::

## 核心原则

- **先设计 Harness**：模型和上下文决定能力上限，Harness 决定工程过程是否可控、可恢复、可验收。
- **AI 先审，人做裁决**：不要让人先看几千行代码差异；先让 AI 做分层审查和证据整理。
- **小切片，不堆大包**：每次变更都要能说清用户价值、影响面和回滚路径。
- **按预算取舍**：不是所有任务都跑满流程；按 Token 预算、风险、影响范围和可逆性选择档位。
- **测试不是终点**：AI 写出的单测和端到端测试，还要由另一个 AI 审查其有效性。
- **人负责最终责任**：产品判断、风险接受、架构方向和最终发布仍由负责人决定。
