# 上下文工程与记忆

AI Coding 的上限不只取决于模型，也取决于它拿到的上下文是否正确、最小、可验证。上下文工程的目标不是把所有东西塞进窗口，而是让 Agent 在有限 Token 内拿到当前任务真正需要的事实源。

## 上下文分层

| 层级 | 内容 | 失效信号 |
| --- | --- | --- |
| 任务上下文 | 需求说明、issue、非目标、验收标准 | AI 自行扩展需求 |
| 仓库上下文 | AGENTS.md、CLAUDE.md、目录结构、运行命令 | AI 不知道事实源或验证入口 |
| 代码上下文 | 相关文件、调用链、契约、类型、测试 | AI 猜接口或重复造轮子 |
| 历史上下文 | 架构决策、事故、兼容窗口、迁移计划 | AI 复活 deprecated/dead 路径 |
| 运行上下文 | CI、日志、链路记录、截图、监控、错误样本 | AI 修症状不修根因 |

## 上下文包模板

```markdown
# 上下文包

## Goal
- 用户价值：
- 非目标：
- 验收标准：

## Fact Sources
- 仓库规则：
- API 契约：
- 运行命令：
- 发布/回滚：

## Relevant Files
| path | reason |
| --- | --- |

## 风险面
- auth / tenant / data / CI / dependency / UI：

## 验证 Budget
- 必跑：
- 可选：
- 本轮不跑及原因：
```

## 记忆不是无限上下文

长期记忆应该保存稳定事实，不保存每次对话的噪音：

- 保留：架构决策、命名约定、验证入口、迁移状态、风险规则。
- 不保留：临时猜测、已过期 workaround、一次性命令输出、被修复的错误日志。
- 需要过期时间：compat、风险豁免、临时降级、迁移窗口。

## Token 预算下的上下文选择

| 预算 | 策略 |
| --- | --- |
| 紧 | 只给任务、事实源、相关文件、最小验证；禁止全仓扫描 |
| 正常 | 增加调用链、相邻测试、历史决策、失败日志 |
| 充裕 | 增加本地评估集、事故复盘、跨模块影响、完整证据 |

## 上下文反模式

- 把 README、长日志、历史聊天全部塞给 Agent。
- 让实现 Agent 自己决定哪些安全规则可以忽略。
- 没有引用文件行号，却要求审查 Agent 给精确结论。
- 把外部网页或 issue 评论当成可信指令。
- 上下文包不记录“未纳入哪些信息”。

## 资料入口

- Claude Code Memory: https://code.claude.com/docs/en/memory
- Claude Code Best Practices: https://code.claude.com/docs/en/best-practices
- Aider Repo Map: https://aider.chat/docs/repomap.html
- OpenAI Codex AGENTS.md: https://developers.openai.com/codex/
