# 证据包与人类裁决

AI-native 验收的最终产物不是一堆评论，而是一份可裁决的证据包。人类不应该到处翻 CI、日志、截图和 reviewer 评论，而应该看到统一的风险摘要。

## 证据包结构

```markdown
# AI Acceptance Report

## Verdict
- 建议: accept | fix_required | needs_human | reject
- 置信度:
- 剩余 blocker:
- 剩余 high:

## Scope
- 本次目标:
- 非目标:
- 触达文件:

## Requirement Evidence
| PRD 条目 | 代码 | 测试 | 运行证据 | 状态 |
| --- | --- | --- | --- | --- |

## Reviewer Findings
| severity | reviewer | finding | evidence | status |
| --- | --- | --- | --- | --- |

## Missing Evidence
- 

## Human Decisions
- 

## Release Notes
- 灰度:
- 监控:
- 回滚:
```

## 人类裁决选项

| 裁决 | 含义 |
| --- | --- |
| accept | 风险可接受，可以合并或发布 |
| fix_required | AI 继续修复明确问题 |
| needs_design | 产品或架构方向不清，需要重新定义 |
| risk_waiver | 明确接受风险，必须记录 owner 和过期时间 |
| reject | 方向错误或风险过高，废弃本轮实现 |

## 人类不应做的事

- 不从零审所有文件。
- 不替 AI 补常规测试。
- 不人工整理 reviewer 结论。
- 不在证据不足时凭感觉放行。
- 不接受“测试全过”作为唯一理由。

## 低风险自动化策略

当变更满足以下条件，可以降低人工参与：

- diff 小且影响面明确。
- 不涉及权限、数据、CI/CD、发布、契约。
- 所有 reviewer pass。
- Judge 无 blocker/high/needs-human。
- 有自动化验证和可回滚路径。

即便如此，也应保留抽样审查和审计记录。
