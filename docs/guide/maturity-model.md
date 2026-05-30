# AI Coding 成熟度模型

成熟度模型用于判断团队当前处于哪一层，以及下一步应该补什么能力。不要一开始追求全自动合并，先把小切片、证据和 AI 审查做好。

| 等级 | 状态 | 特征 | 下一步 |
| --- | --- | --- | --- |
| L0 | 零散使用 | 只用聊天或补全写代码 | 建立仓库规则和验证命令 |
| L1 | AI-assisted | AI 写局部代码，人完整审查 | 强制小切片和 PRD 映射 |
| L2 | Agentic implementation | AI 能读仓库、改代码、跑测试 | 增加独立 AI reviewer |
| L3 | AI-first review | AI 先审，人看高风险摘要 | 建立 reviewer swarm 与证据包 |
| L4 | Evidence-driven delivery | 每个变更都有证据、风险、回滚 | 接入发布观测和反馈学习 |
| L5 | Governed autonomy | 低风险变更高度自动化，高风险有强治理 | 建立度量、审计和安全红队 |

## 不建议跨级跳跃

最危险的跳跃是从 L1 直接到“AI 自动改、自动测、自动合并”。这会绕过事实源、审查和责任边界，短期看很快，长期会导致隐性技术债、测试污染和安全风险。

## 升级优先级

1. 把任务拆小，限制 diff 大小。
2. 让 AI 输出 PRD 到证据的映射。
3. 引入只读 AI reviewer。
4. 引入 Test Skeptic 审查测试有效性。
5. 引入 Security Red Team 审查高风险面。
6. 引入 Judge Agent 汇总剩余风险。
7. 把结果接入 CI、PR 评论和发布流程。
