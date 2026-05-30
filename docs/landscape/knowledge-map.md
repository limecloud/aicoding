# AI Coding 全景知识地图

AI Coding 不是“用 AI 写代码”的单点技巧，而是一套覆盖模型、上下文、工具、运行时、审查、验收、发布、安全、数据、成本、组织和度量的工程系统。

可以先用四层理解它：

```text
模型能力层 -> 上下文与知识层 -> Harness / 运行时层 -> 工程治理层
```

## 全景分层

| 层级 | 关注点 | 关键问题 | 典型资料 |
| --- | --- | --- | --- |
| 模型能力 | 模型、推理、代码能力、Benchmark | 用什么模型？能处理多复杂的任务？ | SWE-bench Verified、SWE-agent、Codex、Claude Code |
| 上下文 | RAG、仓库地图、规则、文档、记忆 | Agent 是否知道项目事实源？ | Aider repo map、AGENTS.md、CLAUDE.md、Copilot instructions |
| Harness | 工具、MCP、工作流图、状态、权限 | Agent 如何安全执行长任务？ | Anthropic Harness、OpenAI Agents、LangGraph |
| 验证 | 测试、AI 审查、红队、证据包 | 如何证明 AI 代码可信？ | Playwright trace、Copilot/Codex review、OWASP |
| 交付 | CI/CD、发布、灰度、回滚、观测 | 如何进入真实生产？ | GitHub Actions、OpenTelemetry、release runbook |
| 治理 | 组织规则、指标、成本 | 谁负责？如何规模化？ | NIST SSDF、Google code review、团队指标 |

::: warning 完整不是默认答案
全景知识库是地图，不是每个任务都必须跑满的清单。Token、工具时间和人的注意力有限时，应按风险选择简化、标准或严控模式。预算不足时优先缩小任务切片，而不是跳过高风险验收。
:::

## AI Coding 的 15 个知识域

1. **任务定义**：需求说明、issue、非目标、验收标准、任务切片。
2. **上下文工程**：仓库规则、仓库地图、文档索引、代码引用、长期记忆。
3. **Agent 工作流**：探索、计划、实现、验证、审查、汇总裁决、发布。
4. **工具与协议**：MCP、A2A、function calling、浏览器、CLI、CI、GitHub。
5. **运行时与 Harness**：工作流图、持久执行、检查点、人在回路。
6. **测试策略**：单测、集成、端到端、变异测试、视觉、契约、合成用户。
7. **AI 先审验收**：审查 Agent 组、测试质疑 Agent、安全红队 Agent、验收证据包。
8. **安全与供应链**：密钥、权限、租户、依赖、CI/CD、提示词注入、MCP 风险。
9. **数据与迁移**：schema、backfill、批量写入、删除、PII、dry-run、回滚。
10. **产品与设计**：用户路径、视觉验收、可访问性、文案、空状态、错误态。
11. **发布与运维**：feature flag、灰度、监控、回滚、日志、链路记录。
12. **工具生态**：Claude Code、Codex、Copilot、Cursor、Devin、OpenHands、Aider。
13. **评估与基准**：SWE-bench、SWE-PolyBench、SetupBench、项目级 Benchmark。
14. **观测与成本**：Token、CI 时间、人工审查时间、审查命中率、逃逸缺陷。
15. **组织落地**：角色、权限、审查策略、指标、成本、风险豁免。

## 阅读路线

| 目标 | 先读 | 再读 |
| --- | --- | --- |
| 建立全局认知 | [工具生态](/landscape/tool-ecosystem) | [协议与运行时](/landscape/protocols-and-runtime) |
| 控制 Token 和成本 | [Token 预算与取舍](/landscape/token-budget) | [观测与成本](/landscape/observability-and-cost) |
| 提高实现质量 | [上下文与记忆](/landscape/context-and-memory) | [仓库理解与事实源](/landscape/repo-understanding) |
| 做好验收 | [AI 先审验收](/acceptance/ai-native-acceptance) | [失败模式](/landscape/failure-modes) |
| 处理高风险变更 | [安全与风险](/landscape/security-and-risk) | [数据与迁移](/landscape/data-and-migrations) |
| 推进团队落地 | [落地路线图](/landscape/adoption-roadmap) | [团队运行模型](/team/operating-model) |

## 从“AI 写代码”到“AI 软件工程”

| 阶段 | 典型行为 | 主要风险 | 下一步 |
| --- | --- | --- | --- |
| 提示词写代码 | 让 AI 生成代码片段 | 缺上下文、不可维护 | 引入项目规则和小切片 |
| AI 辅助开发 | IDE 中补全、问答、局部修改 | 人仍是第一瓶颈 | 引入验证命令和 AI 审查 |
| Agentic Coding | Agent 可读写仓库、跑测试、修复失败 | 工具权限和上下文漂移 | 引入 Harness 和人工关口 |
| AI 时代 SDLC | AI 参与需求、实现、审查、发布和复盘 | 组织治理滞后 | 建立指标、审计和风险分级 |

## 资料入口

- Anthropic Harness Design: https://www.anthropic.com/engineering/harness-design-long-running-apps
- OpenAI Agents Guide: https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/
- OpenAI Codex Docs: https://developers.openai.com/codex/
- Claude Code Docs: https://code.claude.com/docs/en/best-practices
- LangGraph Overview: https://docs.langchain.com/oss/python/langgraph/overview
- GitHub Copilot Code Review: https://docs.github.com/en/copilot/how-tos/agents/copilot-code-review/using-copilot-code-review
- Cursor Bugbot: https://docs.cursor.com/en/bugbot
- OWASP Secure Coding with AI: https://cheatsheetseries.owasp.org/cheatsheets/Secure_Coding_with_AI_Cheat_Sheet.html
