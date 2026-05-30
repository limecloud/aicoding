# 附录：LangChain Framework / Runtime / Harness 原文导读

> 主要原文：<https://docs.langchain.com/oss/python/concepts/products>  
> LangGraph Overview：<https://docs.langchain.com/oss/python/langgraph/overview>  
> 相关博客：<https://www.langchain.com/blog/agent-frameworks-runtimes-and-harnesses-oh-my>
>
> 版权说明：本站不逐字镜像或逐字翻译原文。以下是面向 AI Coding / Harness Engine 的中文转述、结构化导读和工程落地清单。

## 为什么这篇对本站很关键

LangChain 这组资料把 agent stack 拆成三个概念：Framework、Runtime、Harness。这个分层非常适合解释 AI Coding 的演进：从模型和 Prompt，到工具和运行时，再到更高层的 Harness。

本站采用这个分层来定义 AI Coding：

- **Framework**：让你更容易组合模型、工具和 agent loop。
- **Runtime**：让长任务可恢复、可中断、可观测、可持久化。
- **Harness**：把 planning、subagents、filesystem、context management、review loop 封装成面向任务的工作系统。

## 三层分工

| 层级 | 中文解释 | AI Coding 中的例子 |
| --- | --- | --- |
| Framework | 开发 Agent 的基础抽象和集成层 | 模型调用、工具声明、prompt、agent loop、SDK |
| Runtime | 执行和恢复长任务的运行层 | durable execution、checkpoint、streaming、human-in-the-loop、persistence |
| Harness | 面向特定任务的工程脚手架和流程层 | coding CLI、Reviewer Swarm、Context Pack、Evidence Store、Human Gate |

这个分层的价值是避免概念混乱。一个团队不能只说“我们用了 LangGraph，所以有 Harness”；Runtime 解决的是执行可靠性，Harness 还要定义任务结构、上下文、工具风险、审查和交接。

## 1. Framework：让 Agent 能被构建

Framework 负责提供开发者抽象：模型、工具、消息、agent loop、输出格式、集成生态。它解决的是“如何搭建 Agent”。

AI Coding 中的 framework 能力包括：

- 调用不同模型。
- 声明工具 schema。
- 处理工具调用结果。
- 构建基本 agent loop。
- 接入检索、API、数据库、文件系统。
- 定义结构化输出。

Framework 的局限：

- 不天然保证长任务可恢复。
- 不天然保证权限安全。
- 不天然保证任务拆分正确。
- 不天然保证 AI 生成代码可验收。

所以 framework 是必要但不充分。

## 2. Runtime：让长任务可运行

LangGraph 被定位为 agent runtime，关注长时间、有状态、多步骤 agent 的执行可靠性。核心能力包括：

- durable execution：任务中断后能从 checkpoint 恢复。
- human-in-the-loop：执行中可以暂停，让人检查或修改状态。
- persistence：保存线程级状态和跨线程记忆。
- streaming：让外部系统观察执行进度。
- debugging / tracing：查看路径、状态转移和运行指标。

映射到 AI Coding：

```text
实现任务运行一小时
测试中途失败
需要人工确认是否改 API
修复后继续运行
最终生成验收报告
```

如果没有 Runtime，这一切只能靠聊天历史和临时脚本维持，恢复成本很高。

## 3. Harness：让 Runtime 服务具体任务

Harness 是更上层、更 opinionated 的任务系统。它不是通用执行引擎，而是针对某类任务内置流程和工具。

AI Coding Harness 应包括：

- PRD 切片器。
- Context Assembler。
- Implementer Agent。
- Reviewer Swarm。
- Test Skeptic。
- Security Red Team。
- Judge Agent。
- Evidence Store。
- Human Gate。
- Release Orchestrator。

Runtime 让流程可执行，Harness 决定流程长什么样。

## 4. LangGraph 的图思维

LangGraph 鼓励把 Agent 工作流拆成节点和边，而不是把所有逻辑塞进一个 Prompt。AI Coding 也应该采用图思维。

示例：

```text
Start
 -> Load Context
 -> Plan Slice
 -> Implement
 -> Run Tests
 -> Review
 -> Judge
 -> Human Gate
 -> Fix 或 Release
 -> End
```

每个节点应有：

- 输入 state。
- 输出 state。
- 可观察日志。
- 错误处理。
- 是否允许人工中断。
- 是否允许重试。
- 工具权限。

图思维的好处：

- 失败点清晰。
- 可以从 checkpoint 恢复。
- 可以单独测试节点。
- 可以插入 human gate。
- 可以让 reviewer swarm 并行。
- 可以把证据写入统一 state。

## 5. Human-in-the-loop 是 Runtime 能力，也是产品机制

LangGraph 强调 human-in-the-loop：执行可以暂停，让人检查或修改状态，然后继续。AI Coding 的 Human Gate 就是这个机制在工程场景的应用。

触发点包括：

- 计划阶段：是否接受切片和影响面。
- 实现阶段：是否允许危险操作。
- 审查阶段：是否接受 high risk。
- 发布阶段：是否灰度、回滚或继续。
- 失败阶段：是否改变策略。

关键点：人工介入不是“聊天打断”，而是状态机中的正式节点。它应该保存输入、决策、理由和后续动作。

## 6. Persistence 和 Checkpoint

LangGraph 的 persistence / checkpoint 概念对长时间 AI Coding 很重要。没有 checkpoint，Agent 中途失败后只能重新读上下文和猜测当前状态。

AI Coding 中应持久化：

- 任务切片。
- 上下文包。
- 当前 diff 摘要。
- 测试结果。
- reviewer findings。
- human gate 决策。
- 发布证据。
- 回滚信息。

这些不一定一开始就放数据库，最小实现可以是仓库里的 artifact 文件或 CI artifact。

## 7. Deep Agents / Harness 思路对 AI Coding 的启发

LangChain 把 Deep Agents 归为 harness，特点包括 planning、subagents、filesystem tools、context management 等。这和 AI Coding 高度相似。

AI Coding Harness 也应默认提供：

- Planner：把目标拆成步骤。
- Subagents：把调查、审查、安全、测试拆开。
- Filesystem：稳定保存计划、证据和交接材料。
- Context management：压缩上下文、选择相关文件、避免污染。
- Tools：读写代码、运行测试、浏览器、GitHub、CI。

因此，AI Coding Harness 可以被看作一种 domain-specific Deep Agent：专门面向软件工程交付。

## 8. 不要混淆三层责任

常见错误：

| 错误 | 为什么有问题 |
| --- | --- |
| 以为用了 Framework 就有生产可靠性 | Framework 不等于 durable runtime |
| 以为用了 Runtime 就有好工作流 | Runtime 不替你设计验收、风险和上下文 |
| 以为多 Agent 就是 Harness | 没有状态、工具、权限、Judge、人类门，就只是多个聊天窗口 |
| 以为长上下文替代 Persistence | 长上下文不能替代 checkpoint、审计和恢复 |
| 以为人工介入是失败兜底 | HITL 应该是工作流里的明确节点 |

## 9. AI Coding Harness 最小分层

```text
Framework 层
- 模型调用
- 工具 schema
- 结构化输出

Runtime 层
- workflow graph
- checkpoint
- streaming/logging
- human-in-the-loop

Harness 层
- task slicing
- context pack
- implementer loop
- reviewer swarm
- test skeptic
- security red team
- judge
- evidence package
- release gate
```

这套分层可以用不同技术实现：Claude Code、Codex CLI、OpenAI Agents SDK、LangGraph、GitHub Actions、自研脚本都可以承载其中一部分。

## 10. 对本站的落地清单

### 设计 Harness 前

- [ ] 区分自己在做 Framework、Runtime 还是 Harness。
- [ ] 明确哪些能力由现成工具提供，哪些需要自己定义。
- [ ] 明确状态如何保存和恢复。
- [ ] 明确 human gate 的输入输出。

### 设计 Workflow Graph

- [ ] 每个节点有明确输入输出。
- [ ] 每个节点有失败处理。
- [ ] 高风险节点可中断。
- [ ] reviewer 节点并行后进入 Judge。
- [ ] 证据写入统一 artifact。

### 设计团队流程

- [ ] 低风险任务走轻量流程。
- [ ] 高风险任务走完整 Harness。
- [ ] 人类介入只处理裁决，不做第一层筛查。
- [ ] 指标追踪 reviewer 噪音和逃逸缺陷。

## 和本站模块的映射

- Harness Engine：三层架构、工具、状态、图、HITL。
- 工作流：Explore / Plan / Implement / Verify / Review。
- AI-native 验收：Reviewer Swarm、Judge、Human Gate。
- 团队落地：Runtime 选择、CI 集成、指标和治理。

## 原文链接

- Frameworks, runtimes, and harnesses: https://docs.langchain.com/oss/python/concepts/products
- LangGraph overview: https://docs.langchain.com/oss/python/langgraph/overview
- Agent Frameworks, Runtimes, and Harnesses - oh my!: https://www.langchain.com/blog/agent-frameworks-runtimes-and-harnesses-oh-my
