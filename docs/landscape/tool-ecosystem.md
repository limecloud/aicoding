# AI Coding 工具生态

AI Coding 工具不能只按“哪个模型更强”分类。更实用的分类是：它在软件交付链条中承担什么职责，以及它是否具备工具执行、上下文、审查、权限和恢复能力。

## 工具类型

| 类型 | 代表 | 最适合 | 风险 |
| --- | --- | --- | --- |
| IDE Copilot | GitHub Copilot、Cursor、Windsurf | 局部补全、解释、快速修改 | 容易把局部建议误当全局正确 |
| 桌面端 App / 本地客户端 | Claude Desktop / Claude App、Codex App、ChatGPT 桌面端 | 统一管理多 Agent、长任务、截图/文件/本地工具、跨应用协作 | 权限边界更复杂，容易把本机文件、应用和密钥暴露给 Agent |
| CLI 编码 Agent | Claude Code、Codex CLI、Aider、OpenCode | 仓库级读写、测试、重构、小切片实现 | 需要严格权限和验证命令 |
| Cloud Software Engineer | Codex Cloud、Devin、OpenHands Cloud | 长任务、issue 到 PR、后台执行 | 需要计划审批、审计和成本控制 |
| PR 审查 Agent | Copilot review、Codex review、Cursor Bugbot、CodeRabbit、Qodo | 第一层 AI 审查、发现明显缺陷、安全风险和测试缺口 | 误报/漏报，不能直接替代人工裁决 |
| 运行时 / 工作流图 | LangGraph、Temporal、Inngest | 长任务、检查点、人在回路、状态机 | 需要额外设计业务 Harness |
| 协议 / 工具 | MCP、A2A、OpenTelemetry、Playwright | 工具连接、Agent 通信、观测、浏览器验证 | 工具权限和提示词注入风险 |

## 工具选型矩阵

| 问题 | 如果答案是“是” | 工具倾向 |
| --- | --- | --- |
| 是否需要持续读写同一个仓库？ | 是 | CLI/IDE 编码 Agent |
| 是否需要在桌面上统一监督多个 Agent？ | 是 | 桌面端 App / 本地客户端 |
| 是否需要后台跑长任务？ | 是 | 云端软件工程 Agent 或运行时图 |
| 是否需要自动 PR 审查？ | 是 | PR 审查 Agent + 自定义指令 |
| 是否需要真实浏览器验收？ | 是 | Playwright / Browser MCP |
| 是否需要跨系统工具？ | 是 | MCP server + 工具风险模型 |
| 是否需要可恢复长流程？ | 是 | LangGraph / 持久运行时 |

## 关键能力清单

- 仓库规则：是否支持 `AGENTS.md`、`CLAUDE.md`、`.github/copilot-instructions.md`、`.cursor/BUGBOT.md`。
- 上下文选择：是否能生成仓库地图、代码引用、相关文件定位。
- 权限控制：是否能限制命令、文件、网络、生产资源。
- 验证执行：是否能运行测试、构建、浏览器、CI。
- 审查输出：是否支持结构化问题项、严重级别、文件位置。
- 恢复能力：是否有检查点、会话恢复、产物归档。
- 集成能力：是否能接 GitHub、Linear、Jira、CI、监控。
- 安全模型：是否有密钥防护、审计、提示词注入风险控制。

## 工具不应替代的方法论

工具可以提高执行效率，但不能替代：

- 小切片任务设计。
- 单一事实源治理。
- 独立 AI 审查。
- 测试质疑 Agent。
- 安全红队 Agent。
- 人工关口。
- 发布和回滚运行手册。

## 官方资料

- Claude Desktop: https://www.claude.com/download
- Claude Code: https://code.claude.com/docs/en/best-practices
- OpenAI Codex: https://developers.openai.com/codex/
- OpenAI Codex App: https://openai.com/index/introducing-the-codex-app/
- GitHub Copilot Code Review: https://docs.github.com/en/copilot/how-tos/agents/copilot-code-review/using-copilot-code-review
- Cursor Bugbot: https://docs.cursor.com/en/bugbot
- Devin Planning: https://docs.devin.ai/work-with-devin/interactive-planning
- Devin Review: https://docs.devin.ai/work-with-devin/devin-review
- Aider Repo Map: https://aider.chat/docs/repomap.html
- OpenHands: https://www.openhands.one/
