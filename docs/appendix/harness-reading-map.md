# 附录：Harness 引擎 阅读地图

这页把 Anthropic、OpenAI、LangChain 和 Claude Code 的几篇核心资料放在一起，形成 AI Coding Harness 的阅读顺序。

## 推荐阅读顺序

| 顺序 | 资料 | 先读它的原因 |
| --- | --- | --- |
| 1 | Anthropic Harness Design | 先理解为什么长任务应用开发需要 生成 Agent / 评价 Agent / Harness |
| 2 | OpenAI Building Agents | 再理解 Agent 的 model / tools / instructions、执行循环、护栏、人工介入 |
| 3 | LangChain 框架 / 运行时 / Harness | 然后区分 框架、运行时、Harness，避免架构概念混乱 |
| 4 | Claude Code Best Practices | 最后落到日常 编码 Agent 的具体操作习惯 |

## 四篇资料分别解决什么问题

| 资料 | 解决的问题 | 本站吸收为 |
| --- | --- | --- |
| Anthropic Harness Design | 长时间开发任务如何保持质量和方向 | Generator / 评价 Agent / 迭代契约 / Playwright QA |
| OpenAI Building Agents | 生产 Agent 如何设计工具、编排和 护栏 | 工具风险模型 / 执行循环 / 人工关口 |
| LangChain Harness 分层 | Agent 技术栈如何区分 框架、运行时、Harness | AI Coding 的 Harness 架构分层 |
| Claude Code Best Practices | 编码 Agent 的日常如何配置、验证、并行、自动化 | 上下文包 / 验证契约 / 子 Agent / 工作树 |

## 统一成本站模型

```text
模型能力提供基础能力
上下文提供任务知识
框架 提供模型和工具抽象
运行时 提供持久执行和人工中断
Harness 提供面向 AI Coding 的流程、审查、证据和发布门
```

## AI Coding Harness 的完整闭环

```mermaid
flowchart TD
  A[需求说明 / Goal] --> B[Slice Planner]
  B --> C[上下文包]
  C --> D[实现 Agent]
  D --> E[验证契约]
  E --> F[审查 Agent 组]
  F --> G[测试质疑 Agent]
  F --> H[安全红队 Agent]
  F --> I[治理审查 Agent]
  G --> J[汇总裁决 Agent]
  H --> J
  I --> J
  J --> K{人工关口}
  K -->|Fix| D
  K -->|Accept| L[Release]
  L --> M[Telemetry]
  M --> N[规则 / 提示词更新]
  N --> C
```

## 从资料到工程实践

- Anthropic 让我们重视评价 Agent 和真实 UI 验证。
- OpenAI 让我们重视工具分级、护栏和 人工介入。
- LangChain 让我们重视持久运行时、检查点 和 Harness 分层。
- Claude Code 让我们重视具体开发习惯：先探索、计划、验证，使用子 Agent 和 工作树。

## 站内阅读入口

- [Harness 总览](/harness/overview)
- [业界 Harness 模式整理](/harness/industry-patterns)
- [AI Coding 的 Harness 蓝图](/harness/ai-coding-harness)
- [Claude Code Best Practices 原文导读](/appendix/claude-code-best-practices)
- [OpenAI Building Agents 原文导读](/appendix/openai-building-agents-guide)
- [LangChain 框架 / 运行时 / Harness 原文导读](/appendix/langchain-framework-runtime-harness)
