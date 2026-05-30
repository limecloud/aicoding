# AI Reviewer JSON 契约

结构化输出可以降低 AI 审查噪音，并让 Judge Agent、CI 和人类裁决使用同一份数据。

## Reviewer 输出

```json
{
  "schema_version": "ai-reviewer.v1",
  "reviewer": "test-skeptic",
  "verdict": "pass | block | needs_human",
  "confidence": 0.8,
  "summary": "一句话结论",
  "findings": [
    {
      "id": "TS-001",
      "severity": "blocker | high | medium | low",
      "type": "spec | bug | security | test | governance | release | ux",
      "file": "path/to/file.ts",
      "line": 42,
      "claim": "问题描述",
      "evidence": "为什么这样判断",
      "repro": "复现或验证方式",
      "suggested_fix": "建议修复",
      "status": "open | fixed | waived | false_positive"
    }
  ],
  "missing_evidence": [
    "没有跨租户访问失败用例"
  ],
  "human_decision_required": [
    {
      "question": "是否允许该 compat 保留一个版本周期？",
      "options": ["允许并记录删除窗口", "退回并移除 compat"]
    }
  ]
}
```

## Judge 输出

```json
{
  "schema_version": "ai-acceptance-judge.v1",
  "verdict": "accept | fix_required | needs_human | reject",
  "merge_confidence": 0.72,
  "blockers": [],
  "high_risks": [],
  "reviewer_conflicts": [],
  "missing_evidence": [],
  "human_decisions": [],
  "recommended_next_action": "fix_required"
}
```

## 契约规则

- `verdict=pass` 时允许有 low finding，但不能有 blocker/high open finding。
- `confidence` 低于 0.6 时不能直接 pass。
- 没有证据的位置不能填 file:line，应进入 `missing_evidence`。
- 安全 reviewer 无法确认时必须 `needs_human`。
