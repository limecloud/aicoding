# 仓库理解与事实源治理

AI Coding 在真实仓库里最常见的失败不是语法错误，而是不了解“这套系统现在以哪个路径为准”。仓库理解的核心是建立单一事实源，让 Agent 能判断 current、compat、deprecated、dead。

## 仓库地图

一个可用的仓库地图 至少要回答：

- 入口在哪里：Web、API、CLI、worker、迁移、CI。
- 边界在哪里：应用层、服务层、存储层、集成层、旁路脚本。
- 契约在哪里：OpenAPI、GraphQL、protobuf、SDK、类型包。
- 规则在哪里：AGENTS.md、CLAUDE.md、lint、tests、运行手册。
- 验证在哪里：最小命令、changed-path 命令、发布前命令。
- 哪些路径不能扩展：compat、deprecated、dead。

## current / compat / deprecated / dead

| 分类 | AI 行为 |
| --- | --- |
| current | 可以继续演进，必须同步事实源 |
| compat | 只能委托或迁移，不承载新逻辑 |
| deprecated | 只允许短期保留，不新增依赖 |
| dead | 发现后优先删除或标记，不继续修补 |

## 事实源同步清单

当 AI 修改用户可见行为时，必须同步检查：

- 代码实现。
- 测试与测试数据。
- API 契约和 SDK / 类型。
- 文档、运行手册、示例配置。
- CI / 发布 / 回滚脚本。
- 监控、告警、dashboard。

## 审查 Agent 应该问的问题

```text
1. 这个改动扩展的是 current 还是 compat？
2. 是否新增了第二套入口、配置、脚本或文档？
3. API 变化是否同步到了契约、SDK、类型和文档？
4. 测试是否覆盖了当前事实源，而不是旧路径？
5. 是否有 dead code 被 AI 顺手复活？
```

## 预算不足时怎么做

- 不做全仓理解，先让人给出 current 路径。
- Agent 只验证 touched surface，不推断跨仓影响。
- 审查 Agent 只查“是否新增并行实现”和“是否触碰事实源”。
- 高风险契约变化若无法同步全部事实源，停止合并。
