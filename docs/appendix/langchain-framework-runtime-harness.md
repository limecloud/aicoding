# 附录：LangChain 框架 / 运行时 / Harness 原文导读

> 主要原文：<https://docs.langchain.com/oss/python/concepts/products>  
> LangGraph Overview：<https://docs.langchain.com/oss/python/langgraph/overview>  
> 相关博客：<https://www.langchain.com/blog/agent-frameworks-runtimes-and-harnesses-oh-my>
>
> 版权说明：本站不逐字镜像或逐字翻译原文。以下是面向 AI Coding / Harness 引擎 的中文转述、结构化导读和工程落地清单。

## 为什么这篇对本站很关键

LangChain 这组资料把 Agent 技术栈拆成三个概念：框架、运行时、Harness。这个分层非常适合解释 AI Coding 的演进：从模型和提示词，到工具和运行时，再到更高层的 Harness。

本站采用这个分层来定义 AI Coding：

- **框架**：让你更容易组合模型、工具和 Agent 循环。
- **运行时**：让长任务可恢复、可中断、可观测、可持久化。
- **Harness**：把 规划、子 Agent、文件系统、上下文管理、审查循环 封装成面向任务的工作系统。

## 三层分工

| 层级 | 中文解释 | AI Coding 中的例子 |
| --- | --- | --- |
| 框架 | 开发 Agent 的基础抽象和集成层 | 模型调用、工具声明、提示词、Agent 循环、SDK |
| 运行时 | 执行和恢复长任务的运行层 | 持久执行、检查点、流式输出、人在回路、持久化 |
| Harness | 面向特定任务的工程脚手架和流程层 | coding CLI、审查 Agent 组、上下文包、证据库、人工关口 |

这个分层的价值是避免概念混乱。一个团队不能只说“我们用了 LangGraph，所以有 Harness”；运行时 解决的是执行可靠性，Harness 还要定义任务结构、上下文、工具风险、审查和交接。

## 1. 框架：让 Agent 能被构建

框架负责提供开发者抽象：模型、工具、消息、Agent 循环、输出格式、集成生态。它解决的是“如何搭建 Agent”。

AI Coding 中的框架 能力包括：

- 调用不同模型。
- 声明工具 schema。
- 处理工具调用结果。
- 构建基本 Agent 循环。
- 接入检索、API、数据库、文件系统。
- 定义结构化输出。

框架的局限：

- 不天然保证长任务可恢复。
- 不天然保证权限安全。
- 不天然保证任务拆分正确。
- 不天然保证 AI 生成代码可验收。

所以 框架是必要但不充分。

## 2. 运行时：让长任务可运行

LangGraph 被定位为 Agent 运行时，关注长时间、有状态、多步骤 Agent 的执行可靠性。核心能力包括：

- 持久执行：任务中断后能从 检查点恢复。
- 人在回路：执行中可以暂停，让人检查或修改状态。
- 持久化：保存线程级状态和跨线程记忆。
- 流式输出：让外部系统观察执行进度。
- 调试 / tracing：查看路径、状态转移和运行指标。

映射到 AI Coding：

```text
实现任务运行一小时
测试中途失败
需要人工确认是否改 API
修复后继续运行
最终生成验收报告
```

如果没有运行时，这一切只能靠聊天历史和临时脚本维持，恢复成本很高。

## 3. Harness：让运行时服务具体任务

Harness 引擎是更上层、更 opinionated 的任务系统。它不是通用执行引擎，而是针对某类任务内置流程和工具。

AI Coding 的 Harness 引擎应包括：

- 需求切片器。
- Context Assembler。
- 实现 Agent。
- 审查 Agent 组。
- 测试质疑 Agent。
- 安全红队 Agent。
- 汇总裁决 Agent。
- 证据库。
- 人工关口。
- Release Orchestrator。

运行时让流程可执行，Harness 决定流程长什么样。

## 4. LangGraph 的图思维

LangGraph 鼓励把 Agent 工作流拆成节点和边，而不是把所有逻辑塞进一个提示词。AI Coding 也应该采用图思维。

示例：

```text
Start
 -> Load Context
 -> Plan Slice
 -> Implement
 -> Run Tests
 -> Review
 -> 汇总裁决 Agent
 -> 人工关口
 -> Fix 或 Release
 -> End
```

每个节点应有：

- 输入状态。
- 输出状态。
- 可观察日志。
- 错误处理。
- 是否允许人工中断。
- 是否允许重试。
- 工具权限。

图思维的好处：

- 失败点清晰。
- 可以从 检查点恢复。
- 可以单独测试节点。
- 可以插入人工关口。
- 可以让审查 Agent 组并行。
- 可以把证据写入统一状态。

## 5. 人在回路：既是运行时能力，也是产品机制

LangGraph 强调 人在回路：执行可以暂停，让人检查或修改状态，然后继续。AI Coding 的人工关口就是这个机制在工程场景的应用。

触发点包括：

- 计划阶段：是否接受切片和影响面。
- 实现阶段：是否允许危险操作。
- 审查阶段：是否接受高风险。
- 发布阶段：是否灰度、回滚或继续。
- 失败阶段：是否改变策略。

关键点：人工介入不是“聊天打断”，而是状态机中的正式节点。它应该保存输入、决策、理由和后续动作。

## 6. Persistence 和 Checkpoint

LangGraph 的 持久化 / 检查点 概念对长时间 AI Coding 很重要。没有 检查点，Agent 中途失败后只能重新读上下文和猜测当前状态。

AI Coding 中应持久化：

- 任务切片。
- 上下文包。
- 当前 代码差异 摘要。
- 测试结果。
- 审查 Agent 问题清单。
- 人工关口决策。
- 发布证据。
- 回滚信息。

这些不一定一开始就放数据库，最小实现可以是仓库里的 artifact 文件或 CI 产物。

## 7. Deep Agents / Harness 思路对 AI Coding 的启发

LangChain 把 Deep Agents 归为 Harness，特点包括 规划、子 Agent、文件系统 tools、上下文管理 等。这和 AI Coding 高度相似。

AI Coding 的 Harness 也应默认提供：

- Planner：把目标拆成步骤。
- 子 Agent：把调查、审查、安全、测试拆开。
- Filesystem：稳定保存计划、证据和交接材料。
- Context management：压缩上下文、选择相关文件、避免污染。
- 工具：读写代码、运行测试、浏览器、GitHub、CI。

因此，AI Coding 的 Harness 引擎可以被看作一种 领域专用 Deep Agent：专门面向软件工程交付。

## 8. 不要混淆三层责任

常见错误：

| 错误 | 为什么有问题 |
| --- | --- |
| 以为用了 框架 就有生产可靠性 | 框架 不等于 持久运行时 |
| 以为用了 运行时 就有好工作流 | 运行时 不替你设计验收、风险和上下文 |
| 以为多 Agent 就是 Harness | 没有状态、工具、权限、汇总裁决 Agent、人工关口，就只是多个聊天窗口 |
| 以为长上下文替代 Persistence | 长上下文不能替代 检查点、审计和恢复 |
| 以为人工介入是失败兜底 | 人在回路 应该是工作流里的明确节点 |

## 9. AI Coding 的 Harness 最小分层

```text
框架 层
- 模型调用
- 工具 schema
- 结构化输出

运行时 层
- 工作流 graph
- 检查点
- 流式输出/logging
- 人在回路

Harness 层
- task slicing
- context pack
- implementer loop
- 审查 Agent 组
- test skeptic
- security red team
- judge
- 证据包
- release gate
```

这套分层可以用不同技术实现：Claude Code、Codex CLI、OpenAI Agents SDK、LangGraph、GitHub Actions、自研脚本都可以承载其中一部分。

## 10. 对本站的落地清单

### 设计 Harness 前

- [ ] 区分自己在做 框架、运行时 还是 Harness。
- [ ] 明确哪些能力由现成工具提供，哪些需要自己定义。
- [ ] 明确状态如何保存和恢复。
- [ ] 明确人工关口的输入输出。

### 设计 工作流图

- [ ] 每个节点有明确输入输出。
- [ ] 每个节点有失败处理。
- [ ] 高风险节点可中断。
- [ ] 审查 Agent节点并行后进入汇总裁决 Agent。
- [ ] 证据写入统一 artifact。

### 设计团队流程

- [ ] 低风险任务走轻量流程。
- [ ] 高风险任务走完整 Harness。
- [ ] 人类介入只处理裁决，不做第一层筛查。
- [ ] 指标追踪审查 Agent噪音和逃逸缺陷。

## 和本站模块的映射

- Harness 引擎：三层架构、工具、状态、图、人在回路。
- 工作流：Explore / Plan / Implement / Verify / Review。
- AI 原生验收：审查 Agent 组、汇总裁决 Agent、人工关口。
- 团队落地：运行时 选择、CI 集成、指标和治理。

## 原文链接

- Frameworks, runtimes, and harnesses: https://docs.langchain.com/oss/python/concepts/products
- LangGraph overview: https://docs.langchain.com/oss/python/langgraph/overview
- Agent Frameworks, Runtimes, and Harnesses - oh my!: https://www.langchain.com/blog/agent-frameworks-runtimes-and-harnesses-oh-my
