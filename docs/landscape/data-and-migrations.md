# 数据、迁移与生产写入

数据变更是 AI Coding 中最不适合“自动相信”的领域。只要涉及迁移、批量更新、删除、导入导出、PII 或生产写入，就应进入严控模式。

## 数据风险面

| 类型 | 风险 | 控制 |
| --- | --- | --- |
| Schema 迁移 | 不可逆、锁表、兼容失败 | expand/contract、回滚脚本、影子验证 |
| 批量更新 | 误伤租户或历史数据 | dry-run、limit、tenant guard、审计 |
| 删除 | 不可恢复 | 软删除、备份、二次确认、人工关口 |
| 导入导出 | PII 泄漏、格式错误 | schema 校验、脱敏、权限控制 |
| 后台任务 | 重试导致重复写 | 幂等 key、断点续跑、监控 |

## 迁移证据

```markdown
# 数据变更证据

## Change Type
- schema / backfill / delete / import / export：

## Safety Plan
- dry-run：
- backup：
- rollback：
- tenant guard：
- idempotency：

## 验证
- local：
- staging：
- production read-only check：

## 人工关口
- 负责人：
- approval：
- execution window：
```

## AI 可以做什么

- 生成迁移草案。
- 找调用链和兼容影响。
- 生成 dry-run 查询。
- 写回滚和幂等检查。
- 生成发布前检查清单。
- 读取生产只读指标和日志。

## AI 不应自动做什么

- 未经批准执行生产写入。
- 自动删除数据或重置数据库。
- 在不知道备份状态时建议发布。
- 把 staging 成功等同于生产安全。
- 用自然语言总结替代 dry-run 证据。

## 预算不足时怎么做

数据高风险时，不要压缩安全流程。预算不足的正确处理是缩小任务、延期执行，或由人手工执行关键步骤并记录证据。
