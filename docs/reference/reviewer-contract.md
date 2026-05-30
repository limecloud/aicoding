# AI 审查 JSON 契约

AI 审查必须结构化输出，否则很快会变成一堆难以使用的自然语言评论。这里的契约目标很简单：让审查 Agent、汇总裁决 Agent、CI 和负责人使用同一份数据。

## 审查 Agent 输出

字段名建议保持英文，方便脚本、CI 和后续平台读取；字段内容可以使用中文。

```json
{
  "schema_version": "ai-reviewer.v1",
  "reviewer": "test_skeptic",
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
      "repro": "复现步骤或验证命令",
      "suggested_fix": "建议修复方式",
      "status": "open | fixed | waived | false_positive"
    }
  ],
  "missing_evidence": [
    "没有跨租户访问失败用例"
  ],
  "human_decision_required": [
    {
      "question": "是否允许该兼容层保留一个版本周期？",
      "options": ["允许，并记录删除窗口", "退回，先移除兼容层"]
    }
  ]
}
```

## 汇总裁决 Agent 输出

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

- `verdict=pass` 时可以有 `low` 问题，但不能有未关闭的 `blocker` 或 `high`。
- `confidence` 低于 0.6 时不能直接给出通过结论。
- 找不到明确位置时，不要伪造文件位置，应写入 `missing_evidence`。
- 安全审查无法确认时，必须返回 `needs_human`，不能用“看起来没问题”带过。
- 汇总裁决 Agent 只聚合、去重、定级，不新增事实。
