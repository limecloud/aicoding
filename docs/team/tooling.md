# 工具选型

AI Coding 工具应按职责选择，不要期待一个工具覆盖全部流程。关键是让工具之间通过事实源、结构化输出和 CI 连接。

## 工具层次

| 层次 | 代表能力 | 选择标准 |
| --- | --- | --- |
| IDE Agent | 本地读写代码、运行命令 | 是否理解仓库、是否可控 |
| PR Reviewer | 自动审 diff、发评论 | 信噪比、规则支持、上下文能力 |
| Security Agent | 威胁建模、攻击路径验证 | 是否能复现或给证据 |
| Browser Agent | 页面验证、截图、trace | 是否能覆盖真实用户路径 |
| CI Orchestrator | 自动运行 review 和验证 | 权限隔离、日志可追踪 |
| Knowledge Base | 规则、ADR、Runbook、Prompt | 是否容易维护和引用 |

## 选型问题

- 是否支持仓库级规则文件？
- 是否能限制 reviewer 只读？
- 是否能输出结构化 JSON？
- 是否能接入 PR 评论和 CI artifact？
- 是否能处理 monorepo 和跨文件上下文？
- 是否能控制权限和防 prompt injection？
- 是否能学习团队反馈而不制造噪音？

## 最小工具组合

```text
本地编码 Agent
+ PR AI reviewer
+ Test Skeptic prompt
+ Security reviewer prompt
+ Browser trace / screenshot
+ CI 自动汇总报告
```
