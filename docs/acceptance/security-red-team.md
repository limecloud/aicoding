# 安全红队：Security Red Team

安全审查不能只是普通 code review 的一项 checklist。AI Coding 中，Security Red Team 应独立运行，默认假设攻击者知道前端、API 和常见绕过方式。

## 重点范围

| 范围 | 典型风险 |
| --- | --- |
| Auth / Session | token 泄漏、过期处理错误、登录态混淆 |
| RBAC / Permission | 角色绕过、前端控制代替后端校验 |
| Tenant 隔离 | 跨租户读写、查询条件遗漏 |
| 数据写入 | 批量更新误伤、幂等缺失、事务边界错误 |
| 输入边界 | SQL 注入、XSS、命令注入、SSRF |
| Secrets / Env | 日志泄漏、默认密钥、CI 变量暴露 |
| CI/CD | package scripts、workflow 权限、deploy token 滥用 |
| 依赖 | 新增依赖供应链风险、postinstall 风险 |

## 红队输出

安全 finding 不应该只是“可能有漏洞”，而应尽量给出攻击路径：

```json
{
  "severity": "high",
  "type": "security",
  "asset": "tenant resource API",
  "attack_path": [
    "登录 tenant A 用户",
    "枚举 tenant B resource id",
    "调用 PATCH /resources/:id",
    "服务层只校验 userId，未校验 tenantId"
  ],
  "impact": "攻击者可修改其他租户资源",
  "evidence": "internal/resource/service.ts:88 查询条件缺少 tenantId",
  "verification": "补充跨租户负例后应返回 403 或 404"
}
```

## 何时必须人工介入

- 涉及生产数据、数据删除、数据迁移。
- 涉及登录、权限、租户隔离、支付、计费。
- 涉及 CI/CD、部署凭证、包管理脚本。
- AI 无法确认攻击路径是否可达。
- 修复会改变兼容策略或用户权限模型。

## Prompt

```text
你是 Security Red Team Reviewer。不要修改代码。

请基于当前 diff 和相关调用链寻找可利用风险。重点审查 auth、tenant、RBAC、数据写入、输入边界、secrets、CI/CD、依赖和日志。

每个 finding 必须包含：
- severity
- attack_path
- impact
- evidence: file:line
- verification 或复现步骤
- suggested_fix

如果无法确认安全，不要输出 pass，输出 needs_human 和 missing_evidence。
```
