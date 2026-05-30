# 业界 Harness 模式整理

Anthropic、OpenAI 和 LangChain 的表达不完全一样，但方向一致：AI 工程的重点正在从“单次提示词”和“上下文技巧”，转向更完整的 Harness 设计。Harness 负责把模型、工具、状态、审查、人工介入和发布反馈组织成一个可控系统。

## 一句话对比

| 来源 | 核心说法 | 对 AI Coding 的启发 |
| --- | --- | --- |
| Anthropic | 长任务应用开发需要 planner / generator / evaluator、多轮反馈、结构化交接、Playwright QA | AI 写完后必须有独立评价者，且评价者要能操作真实应用 |
| OpenAI | Agent = model + tools + instructions；复杂流程需要执行循环、工具风险分级、护栏、人工介入 | Harness 要有工具分级、退出条件、护栏和高风险人工关口 |
| LangChain / LangGraph | 区分 framework、runtime、harness；LangGraph 负责持久执行和人在回路 | 不要把框架、运行时、Harness 混成一个概念 |

## Anthropic：生成与评价分离

Anthropic 的 [Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps) 强调：长时间自主开发不是“让一个 Agent 一直写”，而是要靠 Harness 设计来维持方向、质量和可验证性。

关键做法：

- 用 planner 把简短需求扩展成产品规格和高层技术方向。
- 用 generator 按迭代或功能块实现。
- 用 evaluator 独立审查，避免同一个 Agent 自我确认。
- 让 evaluator 使用 Playwright MCP 操作真实页面、截图、测试 UI、API 和数据库状态。
- 每个迭代前由 generator 和 evaluator 协商迭代契约，先定义 done，再写代码。
- 用文件做结构化交接，跨 Agent 传递规格、契约、QA 问题和下一步。
- 随模型进步持续删减 Harness 组件，验证哪些组件仍然真正有价值。

对 AI Coding 验收的直接结论：**AI 先审不是多加一个审查提示词，而是生成者与评价者的反馈循环。**

## OpenAI：执行循环、工具、护栏、人工介入

OpenAI 的 [A practical guide to building agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) 更偏产品化 Agent 架构：Agent 由 model、tools、instructions 三部分组成，复杂度通过编排模式、护栏和人工介入控制。

关键做法：

- Agent 不是普通聊天机器人，而是能代表用户执行工作流的系统。
- 工具可分为数据工具、动作工具、编排工具；工具定义要标准化、可测试、可复用。
- 每个编排都需要执行循环，直到结构化输出、工具调用、错误或最大轮数等退出条件触发。
- 先最大化单 Agent 能力，必要时再拆多 Agent，避免过早引入复杂编排。
- 护栏要分层，包括相关性、安全、PII、内容安全、工具保护。
- 高风险工具应按读写权限、可逆性、账户权限和财务影响分级。
- 超过失败阈值，或执行敏感、不可逆、高风险操作时，应触发人工介入。

对 AI Coding 的直接结论：**Harness 必须有工具风险模型和人工关口，不只是多 Agent 协作。**

## LangChain / LangGraph：框架、运行时、Harness 分层

LangChain 的 [Frameworks, runtimes, and harnesses](https://docs.langchain.com/oss/python/concepts/products) 把 Agent 技术栈拆成三层：框架、运行时、Harness。

| 层 | 代表 | 责任 |
| --- | --- | --- |
| 框架 | LangChain、OpenAI Agents SDK、Google ADK、CrewAI | 模型、工具、Agent 循环的抽象与集成 |
| 运行时 | LangGraph、Temporal、Inngest | 持久执行、流式输出、人在回路、持久化、低层控制 |
| Harness | Deep Agents SDK、Claude Agent SDK、Manus、coding CLI | 规划、子 Agent、文件系统、Token / 上下文管理、预设工具 |

LangGraph 的 [overview](https://docs.langchain.com/oss/python/langgraph/overview) 强调它是长任务、有状态 Agent 的底层编排运行时，核心能力包括持久执行、人在回路、记忆、调试和生产部署。[Thinking in LangGraph](https://docs.langchain.com/oss/python/langgraph/thinking-in-langgraph) 则建议先把流程拆成离散节点，区分模型步骤、数据步骤、动作步骤和用户输入步骤，并设计共享状态。

对 AI Coding 的直接结论：**不要把 Harness、运行时、框架混在一起。应先定义 AI Coding 的 Harness 逻辑，再决定用 Codex、Claude Code、LangGraph、GitHub Actions 还是自研脚本承载。**

## 预算与删减：Harness 不是越厚越好

Harness 的目的不是堆更多 Agent、更多提示词、更多检查，而是让长任务可控。模型能力、上下文窗口、工具成本和团队风险不同，Harness 也应该分档：

- 低风险任务走简化流程，保留最小上下文、最小验证和少量定向审查。
- 普通功能走标准流程，覆盖需求、代码、测试和关键路径证据。
- 高风险任务走严控模式，保留安全红队、证据包、回滚和人工关口。
- 定期删除没有发现有效问题的审查 Agent、检查项和交接文件。

更详细的取舍方法见 [Token 预算与取舍](/landscape/token-budget) 与 [观测与成本](/landscape/observability-and-cost)。

## 站内导读

- [OpenAI Building Agents 原文导读](/appendix/openai-building-agents-guide)
- [LangChain 框架 / 运行时 / Harness 原文导读](/appendix/langchain-framework-runtime-harness)
- [Claude Code Best Practices 原文导读](/appendix/claude-code-best-practices)
- [Harness 阅读地图](/appendix/harness-reading-map)
- [协议、运行时与可观测性](/landscape/protocols-and-runtime)
- [AI Coding 工具生态](/landscape/tool-ecosystem)

## AI Coding Harness 原则

1. **先定义执行循环**：每轮从任务切片开始，到实现、自检、AI 审查、汇总裁决、人工关口、修复或发布结束。
2. **先做单 Agent，再拆多 Agent**：只有当指令复杂、工具混淆、审查目标冲突时，才拆审查 Agent 组。
3. **实现和评价分离**：实现 Agent 不批准自己，评价者必须独立、只读、绑定证据。
4. **工具必须分级**：读工具、写工具、生产工具、不可逆工具的权限和人工关口不同。
5. **状态必须可恢复**：长任务要有交接、检查点、证据库，而不是依赖聊天历史。
6. **人类介入是系统节点**：不是失败兜底，而是对高风险、争议和产品判断的正式关口。
7. **Harness 需要持续删减**：模型变强后，旧脚手架可能变成成本和延迟，应定期验证是否仍有价值。
