# 安全红队 Agent

安全审查不能只是普通代码审查里顺手看一眼。AI Coding 中，安全红队 Agent 应独立运行，并默认站在攻击者视角：攻击者知道前端、API 和常见绕过方式，会尝试组合多个小缺口形成真实攻击路径。

## 重点范围

| 范围 | 典型风险 |
| --- | --- |
| 认证与会话 | Token 泄漏、过期处理错误、登录态混淆 |
| 角色与权限 | 角色绕过、前端控制代替服务端校验 |
| 租户隔离 | 跨租户读写、查询条件遗漏 |
| 数据写入 | 批量更新误伤、幂等缺失、事务边界错误 |
| 输入边界 | SQL 注入、XSS、命令注入、SSRF |
| 密钥与环境变量 | 日志泄漏、默认密钥、CI 变量暴露 |
| CI/CD | 包脚本、工作流权限、部署 Token 滥用 |
| 依赖 | 新增依赖供应链风险、postinstall 风险 |

## 红队输出

安全问题不应该只写“可能有漏洞”，而要尽量给出可理解的攻击路径：

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

## 提示词

```text
你是安全红队 Agent。不要修改代码。

请基于当前代码差异和相关调用链寻找可利用风险。重点审查认证、租户、RBAC、数据写入、输入边界、密钥、CI/CD、依赖和日志。

每个问题必须包含：
- severity
- attack_path
- impact
- evidence：文件位置
- verification 或复现步骤
- suggested_fix

如果无法确认安全，不要输出 通过；输出 needs_human，并说明缺少哪些证据。
```
