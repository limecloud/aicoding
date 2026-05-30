# AI Coding Harness 蓝图

AI Coding 的 Harness，是把编码 Agent 接入真实工程系统的运行层。它不是单个提示词，也不是某个供应商 SDK，而是一组可以组合的工程组件。

## 目标架构

```mermaid
flowchart TD
  A[需求说明 / Issue] --> B[任务切片]
  B --> C[上下文组装]
  C --> D[实现 Agent]
  D --> E[自检]
  E --> F{风险路由}
  F -->|低风险| G[快速审查 Agent]
  F -->|高风险| H[审查 Agent 组]
  H --> I[测试质疑 Agent]
  H --> J[安全红队 Agent]
  H --> K[治理审查 Agent]
  G --> L[汇总裁决 Agent]
  I --> L
  J --> L
  K --> L
  L --> M{人工关口}
  M -->|需要修复| D
  M -->|接受| N[发布编排]
  N --> O[观测]
  O --> P[规则 / 提示词更新]
  P --> C
```

## 组件职责

| 组件 | 必须做 | 不应该做 |
| --- | --- | --- |
| 任务切片 | 把需求拆成可验收的垂直切片 | 过早指定所有实现细节 |
| 上下文组装 | 选择最小充分上下文 | 无脑塞整个仓库 |
| 实现 Agent | 实现当前切片并自检 | 自己批准自己 |
| 风险路由 | 判断是否需要深度审查 | 把所有变更都走重流程 |
| 审查 Agent 组 | 多角色只读审查 | 直接改代码 |
| 汇总裁决 Agent | 去重、定级、聚合证据 | 发明新事实 |
| 人工关口 | 裁决高风险和争议 | 人肉补第一层审查 |
| 发布编排 | 灰度、监控、回滚 | 测试通过就直接发布 |

## 工具风险模型

OpenAI 的工具分级思路可以直接用于 AI Coding：

| 工具类型 | 风险 | 默认策略 |
| --- | --- | --- |
| 只读文件 / 搜索 | 低 | 自动允许 |
| 本地测试 / 构建 | 低到中 | 自动允许，记录输出 |
| 写工作区文件 | 中 | 允许，但必须可审查代码差异 |
| 修改依赖 / 包脚本 | 高 | AI 审查 + 人工关口 |
| 数据库写入 / 迁移 | 高 | 发布审查 + 人工关口 |
| 生产 API / 密钥 / deploy | 极高 | 明确人工批准，强审计 |
| 删除 / 批量移动 | 高 | 默认暂停，除非任务明确要求 |

## 状态与证据

长任务不能依赖一条很长的聊天历史。Harness 应保存：

- `task-slice.md`：当前切片目标、非目标、验收标准。
- `context-pack.md`：规则、相关代码、验证命令、风险面。
- `self-check.md`：实现 Agent 自检结果。
- `review/*.json`：各审查 Agent 的结构化输出。
- `evidence/`：测试结果、链路记录、截图、日志、构建输出。
- `judge-report.json`：最终风险摘要。
- `human-decision.md`：接受、拒绝、豁免、回滚要求。

## 最小落地方式

不用一开始做平台。可以先在仓库里放：

```text
.ai-coding/
├── prompts/
│   ├── implementer.md
│   ├── review-spec.md
│   ├── review-tests.md
│   ├── review-security.md
│   ├── review-governance.md
│   └── judge.md
├── schemas/
│   ├── reviewer-output.schema.json
│   └── acceptance-report.schema.json
└── runbooks/
    ├── ai-review-changed.md
    └── human-gate.md
```

然后逐步接入：

1. 本地命令：`make ai-review-changed`。
2. PR 评论：自动发布汇总裁决 Agent 摘要。
3. CI 产物：保存审查 Agent JSON 和证据包。
4. GitHub Action：低风险自动跑，高风险等待人工关口。
5. 看板：展示趋势、噪音、逃逸缺陷和审查命中率。
