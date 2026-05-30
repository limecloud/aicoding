# 业界 Harness 模式整理

Anthropic、OpenAI 和 LangChain 的表达不完全一样，但方向一致：AI 工程的重点正在从单次 Prompt 或上下文技巧，转向 **运行时 Harness**。Harness 负责把模型、工具、状态、审查、人工介入和发布反馈组织成一个可控系统。

## 一句话对比

| 来源 | 核心说法 | 对 AI Coding 的启发 |
| --- | --- | --- |
| Anthropic | 长任务性能来自 harness design：planner / generator / evaluator、多轮反馈、结构化 handoff、Playwright QA | AI 写完后必须有独立 evaluator，且 evaluator 要能操作真实应用 |
| OpenAI | Agent = model + tools + instructions；用 run loop、tool risk、guardrails、human intervention 控制复杂工作流 | Harness 要有工具分级、退出条件、guardrail 和高风险人工门 |
| LangChain / LangGraph | 区分 framework、runtime、harness；LangGraph 提供 durable execution、HITL、persistence，Deep Agents 提供 planning/subagents/filesystem | AI Coding Harness 应该分清框架、运行时和上层 opinionated harness |

## Anthropic：Generator / Evaluator Harness

Anthropic 的 [Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps) 把问题讲得很直接：长时间自主开发不是“让一个 Agent 一直写”，而是需要 harness 设计来维持方向、质量和可验证性。

关键做法：

- 用 planner 把简短需求扩展成产品规格和高层技术方向。
- 用 generator 按 sprint 或功能块实现。
- 用 evaluator 独立审查，避免同一个 agent 自我表扬。
- 让 evaluator 使用 Playwright MCP 操作真实页面、截图、测试 UI、API 和数据库状态。
- 每个 sprint 前由 generator 和 evaluator 协商 sprint contract，先定义 done，再写代码。
- 用文件作为结构化 handoff，跨 agent 传递 spec、contract、QA finding 和下一步。
- 随模型进步持续删减 harness 组件，验证哪些是真正 load-bearing。

对 AI Coding 验收的直接结论：**AI 先审不是加一个 reviewer prompt，而是 generator-evaluator feedback loop**。

## OpenAI：Run Loop、Tools、Guardrails、Human Intervention

OpenAI 的 [A practical guide to building agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) 更偏产品化 agent 架构：agent 由 model、tools、instructions 三部分组成，复杂度通过 orchestration patterns、guardrails 和 human intervention 控制。

关键做法：

- Agent 不是普通 chatbot，而是能代表用户执行 workflow 的系统。
- 工具分为 data、action、orchestration 三类；工具定义要标准化、可测试、可复用。
- 每个 orchestration 都需要 run loop，直到结构化输出、工具调用、错误或最大轮数等退出条件触发。
- 优先最大化单 agent 能力，必要时再拆 multi-agent，避免过早引入复杂编排。
- Guardrails 要分层，包括 relevance、safety、PII、moderation、tool safeguards。
- 高风险工具应基于读写权限、可逆性、账户权限和财务影响分级。
- 超过失败阈值或执行敏感/不可逆/高风险操作时，应触发 human intervention。

对 AI Coding 的直接结论：**Harness 必须有 tool risk model 和 human gate，不只是多 Agent 协作**。

## LangChain / LangGraph：Framework、Runtime、Harness 分层

LangChain 的 [Frameworks, runtimes, and harnesses](https://docs.langchain.com/oss/python/concepts/products) 明确把 agent stack 分成三层：framework、runtime、harness。

| 层 | 代表 | 责任 |
| --- | --- | --- |
| Framework | LangChain、OpenAI Agents SDK、Google ADK、CrewAI | 模型、工具、agent loop 的抽象与集成 |
| Runtime | LangGraph、Temporal、Inngest | durable execution、streaming、human-in-the-loop、persistence、低层控制 |
| Harness | Deep Agents SDK、Claude Agent SDK、Manus、coding CLI | planning、subagents、filesystem、token/context management、预设工具 |

LangGraph 的 [overview](https://docs.langchain.com/oss/python/langgraph/overview) 强调它是 long-running、stateful agent 的低层 orchestration runtime，核心能力包括 durable execution、human-in-the-loop、memory、debugging 和 production deployment。[Thinking in LangGraph](https://docs.langchain.com/oss/python/langgraph/thinking-in-langgraph) 则建议先把流程拆成离散节点，区分 LLM steps、data steps、action steps 和 user input steps，并设计共享 state。

对 AI Coding 的直接结论：**不要把 Harness、Runtime、Framework 混在一起。AI Coding 站点应先定义 Harness 逻辑，再决定用 Codex、Claude Code、LangGraph、GitHub Actions 或自研工具承载。**

## 站内导读

- [OpenAI Building Agents 原文导读](/appendix/openai-building-agents-guide)
- [LangChain Framework / Runtime / Harness 原文导读](/appendix/langchain-framework-runtime-harness)
- [Claude Code Best Practices 原文导读](/appendix/claude-code-best-practices)
- [Harness Engine 阅读地图](/appendix/harness-reading-map)

## 汇总成 AI Coding Harness 原则

1. **先定义 run loop**：每轮从任务切片开始，到实现、自检、AI review、judge、人类门、修复或发布结束。
2. **先做单 agent，再拆多 agent**：只有当指令复杂、工具混淆、审查目标冲突时才拆 reviewer swarm。
3. **实现和评价分离**：Implementer 不批准自己，Evaluator 必须独立、只读、证据绑定。
4. **工具必须分级**：读工具、写工具、生产工具、不可逆工具的权限和 human gate 不同。
5. **状态必须可恢复**：长任务要有 handoff、checkpoint、evidence store，而不是依赖聊天历史。
6. **人类介入是系统节点**：不是失败兜底，而是对高风险、争议和产品判断的正式 gate。
7. **Harness 需要持续删减**：模型变强后，旧 scaffold 可能变成成本和延迟，应定期验证是否仍 load-bearing。
