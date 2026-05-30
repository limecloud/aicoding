# 附录：OpenAI Building Agents 原文导读

> 原文：<https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/>  
> PDF：<https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf>
>
> 版权说明：本站不逐字镜像或逐字翻译原文。以下是面向 AI Coding / Harness Engine 的中文转述、结构化导读和工程落地清单。

## 为什么放进 Harness Engine 附录

OpenAI 这篇指南不是单纯介绍模型能力，而是从产品和工程团队角度解释：什么时候应该构建 Agent、Agent 由什么组成、如何设计工具、如何编排流程、如何用 guardrails 和 human intervention 让 Agent 在生产环境中可控。

这和本站的 Harness Engine 视角高度一致：**模型只是能力核心，Agent 能否在真实业务中可靠运行，取决于工具、指令、运行循环、风险控制和人工介入机制。**

## 原文结构导读

| 主题 | 中文转述 | 对 AI Coding 的意义 |
| --- | --- | --- |
| 什么是 Agent | Agent 不只是聊天机器人，而是可以代表用户执行 workflow 的系统 | Coding Agent 不能只会生成代码，还要能执行验证、审查、修复、交付证据 |
| 什么时候适合 Agent | 适合复杂决策、规则难写死、依赖非结构化输入的流程 | 不是所有工程任务都要 agent 化，低复杂机械任务直接脚本化更好 |
| Agent 基本组成 | Model、Tools、Instructions 三件套 | AI Coding Harness 也应拆成模型、工具权限、仓库规则/任务契约 |
| 工具设计 | 工具可分为数据获取、动作执行、编排连接 | 代码搜索、测试、浏览器、CI、GitHub、部署都应分级管理 |
| Orchestration | 需要 run loop 和退出条件，复杂时可用多 Agent | Implementer -> Reviewers -> Judge -> Human Gate 就是 coding orchestration |
| Guardrails | 输入、输出、工具调用、人工介入都需要防护 | 权限、secrets、生产 API、删除、迁移都要进入风险路由 |
| Human intervention | 失败、边界、敏感操作、高风险动作要交给人 | 人不是第一层 reviewer，而是风险 gate 和最终 owner |

## 1. Agent 不是聊天，而是拥有 workflow

OpenAI 把 Agent 和普通 LLM 应用区分开：普通应用主要回答问题或生成内容，Agent 则会在目标驱动下选择工具、执行动作、观察结果、继续下一步，直到达到完成条件或触发退出条件。

映射到 AI Coding：

- 普通 AI 编码：让模型写一段代码。
- Agentic Coding：让模型读代码、计划、修改、运行测试、修复失败、审查结果、生成证据。
- Harness Engine：定义这些步骤如何循环、何时停止、何时升级给人。

因此，AI Coding Harness 的目标不是“更好的 Prompt”，而是“让 coding workflow 被 agent 拥有，但被工程系统约束”。

## 2. 不是所有任务都需要 Agent

原文强调应选择适合 Agent 的用例。本站进一步建议：在 AI Coding 中也要区分任务复杂度。

| 任务 | 推荐方式 |
| --- | --- |
| 纯格式化、机械替换 | 脚本或 IDE 批量操作 |
| 小 bugfix、简单测试补充 | 单 Agent + 快速验证 |
| 多文件功能、跨层行为变化 | Implementer + Reviewer Swarm |
| 权限、数据、发布、CI/CD | Harness + Security/Release Reviewer + Human Gate |
| 生产操作、不可逆动作 | 默认人工批准，Agent 只准备方案和证据 |

Agent 化的收益来自复杂工作流，不来自把每件小事都变成多 Agent。

## 3. Model + Tools + Instructions

OpenAI 的 Agent 组成可以直接映射到 AI Coding：

| OpenAI 组件 | AI Coding 对应物 |
| --- | --- |
| Model | Claude、Codex、GPT、Gemini 或本地模型 |
| Tools | 文件读写、测试、浏览器、GitHub、CI、MCP、部署、监控 |
| Instructions | AGENTS.md、任务切片、Context Pack、Reviewer 契约、权限规则 |

这说明“模型选型”只是其中一层。真正的工程差异来自：

- 工具是否可靠。
- 工具权限是否分级。
- 指令是否稳定沉淀到仓库。
- 工具结果是否进入证据包。
- 高风险工具是否有人类门。

## 4. 工具设计是 Harness 的关键

OpenAI 把工具看成 Agent 能力边界。本站建议把 AI Coding 工具分成三类。

### 数据工具

用于获取信息，不直接改变状态：

- 代码搜索、依赖图、文档检索。
- issue / PR / CI 日志读取。
- API schema、OpenAPI、数据库只读查询。
- 浏览器截图和页面状态读取。

默认策略：大部分可自动允许，但敏感数据读取需要审计。

### 动作工具

会改变文件、系统或外部状态：

- 写文件、修改配置、生成 migration。
- 运行测试、构建、格式化。
- 创建 PR、评论、打标签。
- 调用生产 API、部署、回滚。

默认策略：本地可逆动作可放宽；生产、不可逆、高影响动作必须 human gate。

### 编排工具

把一个 Agent 的输出交给另一个系统：

- Reviewer Swarm 调度。
- Judge 聚合。
- CI artifact 保存。
- 发布流程触发。
- 监控反馈回写。

默认策略：编排本身也要有状态和审计，不能只靠聊天历史。

## 5. Run Loop 和退出条件

OpenAI 指南强调，Agent orchestration 需要 run loop。AI Coding 的 run loop 可以这样定义：

```text
输入任务切片
  -> 装配上下文
  -> 实现
  -> 自检
  -> 风险路由
  -> AI 审查
  -> Judge 汇总
  -> 人类门或自动通过
  -> 修复或发布
  -> 反馈沉淀
```

退出条件必须明确：

- 所有 blocker 修复。
- high 风险已修复、豁免或交给人。
- 最小验证通过。
- 缺失证据已补齐或明确记录。
- 达到最大修复轮次，转人工。
- 触发危险操作，暂停等待确认。

没有退出条件，Agent 会无休止循环或在不确定时继续猜。

## 6. 单 Agent 优先，多 Agent 谨慎引入

OpenAI 建议先最大化单个 Agent 的能力，再在必要时增加多 Agent。本站同意这个原则，但在验收阶段建议天然分离实现者和审查者。

推荐策略：

- 实现阶段：优先单 Implementer，避免多人同时改同一区域。
- 调研阶段：可以多 Agent 并行探索不同模块。
- 审查阶段：适合多 reviewer 分工审查。
- 安全阶段：必须独立 Red Team，不依赖 Implementer 自评。
- 汇总阶段：必须有 Judge，避免人类面对多份散乱报告。

多 Agent 的目标不是热闹，而是降低上下文污染和审查盲区。

## 7. Guardrails 应该贯穿全流程

OpenAI 的 guardrails 思路可以直接用于 AI Coding。不要只在输入前做一次检查，而要覆盖输入、工具、输出和人工升级。

| Guardrail 层 | AI Coding 示例 |
| --- | --- |
| 输入相关性 | 任务是否属于当前仓库和当前切片 |
| 安全策略 | 是否涉及 secrets、PII、生产数据、权限 |
| 工具防护 | 哪些命令可自动运行，哪些必须确认 |
| 输出检查 | 是否生成弱测试、是否遗漏契约、是否扩大范围 |
| 人工介入 | 高风险工具、失败阈值、争议 finding、产品判断 |

Guardrails 不是降低效率，而是让低风险流程自动化、高风险流程可控化。

## 8. Human Intervention 是 Harness 节点

OpenAI 把 human intervention 视为生产 Agent 的关键机制。本站把它命名为 Human Gate。

Human Gate 应触发在：

- Agent 多次失败或结论不一致。
- 涉及删除、迁移、发布、生产 API。
- 涉及安全、权限、租户、支付、计费。
- 需要产品或架构方向判断。
- Reviewer 输出 `needs_human`。
- 风险豁免需要 owner 和过期时间。

Human Gate 输出不应该是聊天式“你怎么看”，而应该是结构化决策：

```json
{
  "decision": "accept | fix_required | risk_waiver | reject",
  "owner": "human-owner",
  "reason": "为什么这样裁决",
  "expires_at": "如果是豁免，什么时候失效",
  "next_action": "AI 下一步做什么"
}
```

## 9. OpenAI 思路对 AI Coding Harness 的落地清单

### Agent 设计

- [ ] 明确 Agent 拥有哪个 workflow。
- [ ] 明确 model、tools、instructions 三件套。
- [ ] 明确 run loop 和退出条件。
- [ ] 明确哪些任务不需要 Agent。

### 工具设计

- [ ] 工具分为数据、动作、编排三类。
- [ ] 每个工具有权限级别。
- [ ] 高风险工具有 human gate。
- [ ] 工具输出进入证据包。

### Guardrails

- [ ] 输入任务范围检查。
- [ ] secrets / PII / 生产资源检查。
- [ ] 文件写入和命令执行权限检查。
- [ ] 输出 finding 和测试有效性检查。
- [ ] 人工介入和失败阈值。

### 发布

- [ ] 低风险自动化。
- [ ] 高风险人工裁决。
- [ ] 运行日志可审计。
- [ ] 失败可回滚。

## 和本站模块的映射

- Harness Engine：Agent 组成、工具、run loop、guardrails。
- AI-native 验收：AI 先审、Judge、人类门。
- 工程质量：安全、测试、发布、可维护性。
- 团队落地：指标、噪音治理、工具选型。

## 原文链接

- OpenAI Guide: https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/
- OpenAI PDF: https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf
