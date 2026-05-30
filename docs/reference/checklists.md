# 检查清单

检查清单用于辅助 AI reviewer 和人类 owner，不应该变成人工逐项打勾的负担。

## AI 生成变更进入人类裁决前

- [ ] 任务是小切片。
- [ ] PRD 每条验收标准都有证据。
- [ ] Implementer 已运行最小验证。
- [ ] Spec Reviewer 已完成。
- [ ] Test Skeptic 已完成。
- [ ] Security Red Team 对高风险面已完成。
- [ ] Governance Reviewer 已完成。
- [ ] Judge Agent 已聚合报告。
- [ ] blocker 已修复或等待人类裁决。
- [ ] high 风险有 owner、影响面、修复建议。

## 人类最终裁决

- [ ] 是否解决真实用户问题？
- [ ] 是否接受剩余风险？
- [ ] 是否偏离架构事实源？
- [ ] 是否影响 API、配置、发布或数据？
- [ ] 是否有回滚方式？
- [ ] 是否需要风险豁免和过期时间？

## 高风险文件

- [ ] auth / session / token
- [ ] RBAC / permission / tenant
- [ ] migration / data write / delete
- [ ] API contract / SDK / types
- [ ] CI/CD / deploy / package scripts
- [ ] env / secrets / config
- [ ] billing / payment / quota
