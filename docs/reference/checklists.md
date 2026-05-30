# 检查清单

检查清单用于辅助 AI 审查 Agent 和负责人，不应该变成人工逐项打勾的负担。

## AI 生成变更进入人工裁决前

- [ ] 任务是小切片。
- [ ] 需求说明里的每条验收标准都有证据。
- [ ] 实现 Agent 已运行最小验证。
- [ ] 需求审查 Agent 已完成。
- [ ] 测试质疑 Agent 已完成。
- [ ] 安全红队 Agent 已覆盖高风险面。
- [ ] 治理审查 Agent 已完成。
- [ ] 汇总裁决 Agent 已聚合报告。
- [ ] 阻断级问题已修复或等待人工裁决。
- [ ] 高风险问题有负责人、影响面、修复建议。

## 人工最终裁决

- [ ] 是否解决真实用户问题？
- [ ] 是否接受剩余风险？
- [ ] 是否偏离架构事实源？
- [ ] 是否影响 API、配置、发布或数据？
- [ ] 是否有回滚方式？
- [ ] 是否需要风险豁免和过期时间？

## 高风险文件

- [ ] auth / session / Token
- [ ] RBAC / permission / tenant
- [ ] 迁移 / data write / delete
- [ ] API contract / SDK / types
- [ ] CI/CD / deploy / 包脚本
- [ ] env / 密钥 / config
- [ ] billing / payment / quota
