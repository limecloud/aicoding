# 人机协作协议

AI Coding 需要明确“什么时候 AI 自己继续，什么时候停下来让人裁决”。没有协议，AI 会在不确定时继续猜，人会在低价值问题上被打断。

## AI 可以自动继续的情况

- 格式化、lint、类型错误、明确单测失败。
- 与任务目标一致的小范围修复。
- 根据 reviewer finding 修复具体 bug。
- 补充缺失的负例测试。
- 更新同一事实源要求的契约或文档。

## AI 必须暂停的情况

- 需要删除大量文件或迁移生产数据。
- 需要改变 API 兼容策略。
- 需要接受安全风险或数据风险。
- 多个事实源冲突，无法判断哪个是 current。
- reviewer 之间对 blocker 结论冲突。
- 修复会显著扩大原任务范围。

## 交接格式

```json
{
  "status": "continue | needs_human | blocked",
  "reason": "为什么需要或不需要人介入",
  "remaining_risks": [],
  "options": [
    {
      "id": "A",
      "choice": "保持当前实现",
      "impact": "风险和收益"
    }
  ],
  "recommended_option": "A"
}
```
