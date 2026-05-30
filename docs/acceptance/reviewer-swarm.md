# Reviewer Swarm

Reviewer Swarm 是多个独立 AI reviewer 的集合。它的目标不是模拟一个“全能 senior reviewer”，而是用不同角色、不同目标、不同上下文并行审查同一个变更。

## 推荐角色

| Reviewer | 输入 | 输出 | 重点 |
| --- | --- | --- | --- |
| Spec Reviewer | PRD、验收标准、diff | 需求覆盖矩阵 | 未实现、功能漂移、非目标夹带 |
| Code Reviewer | diff、相关代码 | bug findings | 边界、错误处理、重复、复杂度 |
| Test Skeptic | 测试、被测代码 | 测试缺口 | 弱断言、mock 过度、负例缺失 |
| Security Red Team | diff、auth/data/config | attack paths | 权限、租户、注入、secrets、CI/CD |
| Governance Reviewer | 仓库规则、diff | 规则违规 | current/compat、契约、发布事实源 |
| UX Reviewer | 页面、截图、trace | 体验风险 | 空状态、错误状态、响应式、可访问性 |
| Release Reviewer | 配置、迁移、runbook | 发布风险 | 灰度、监控、回滚、迁移 |

## 隔离原则

- reviewer 不读取 implementer 的主观解释，只读取 PRD、仓库规则、diff 和验证结果。
- reviewer 默认只读，不修改代码。
- reviewer 必须给 file:line、证据和复现方式。
- reviewer 不允许输出“看起来没问题”作为唯一结论。
- reviewer 不确定时输出 `missing_evidence` 或 `needs_human`。

## 输出契约

```json
{
  "reviewer": "security-red-team",
  "verdict": "pass | block | needs_human",
  "confidence": 0.82,
  "findings": [
    {
      "severity": "blocker | high | medium | low",
      "type": "security | bug | spec | test | governance | release | ux",
      "file": "path/to/file.ts",
      "line": 123,
      "claim": "这里可能绕过租户隔离",
      "evidence": "查询条件只包含 userId，没有包含 tenantId",
      "repro": "使用 tenant A token 请求 tenant B resource",
      "suggested_fix": "在 service 层加入 tenantId 约束并补负例测试"
    }
  ],
  "missing_evidence": [],
  "human_decision_required": []
}
```

## Judge Agent

Judge Agent 只做聚合，不新增事实：

- 去重相同 finding。
- 合并相关风险。
- 统一 severity。
- 标出 reviewer 冲突。
- 生成“人类只需要看的内容”。

Judge 输出应该短，优先 blocker 和 high。低风险建议可以折叠或作为附录。
