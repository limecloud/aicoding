# 评估、Benchmark 与真实验收

AI Coding 不能只看模型排行榜。Benchmark 可以帮助判断能力上限，但团队落地更需要本地评估集、任务级指标和真实发布结果。

## Benchmark 分层

| 层级 | 代表 | 测什么 | 局限 |
| --- | --- | --- | --- |
| 函数/算法级 | HumanEval、MBPP | 小函数正确性 | 不代表仓库级能力 |
| Issue 修复级 | SWE-bench、SWE-bench Verified | 真实 GitHub issue 修复 | 依赖测试和任务筛选，不能代表你的业务 |
| 多语言/复杂仓库 | SWE-PolyBench、GitTaskBench | 跨语言、复杂仓库导航 | 成本高，结果受 Agent 脚手架 影响 |
| 环境搭建 | SetupBench | bootstrap 开发环境能力 | 只覆盖环境能力，不覆盖产品质量 |
| 项目级交付 | ProjDevBench、SWE-WebDevBench | 从需求到项目 | 更接近真实，但评价更复杂 |
| 团队本地评估集 | 自有历史 issue、回归用例、事故复盘 | 你的业务和架构 | 需要持续维护 |

## 为什么不能只看 SWE-bench 分数

- 分数同时反映模型、工具、scaffold、上下文、测试集质量和重试策略。
- Benchmark 任务和真实业务需求不同。
- 高分不代表安全、可维护、可发布。
- 真实项目还有部署、监控、权限、数据迁移和用户体验。

## 本地 AI Coding 评估集

建议每个团队建立自己的 评估集：

```text
historical-bugs/
  bug-001/
    issue.md
    expected-behavior.md
    hidden-checks.md
    security-notes.md
  bug-002/
feature-slices/
  feature-001/
regression-risks/
  auth-tenant-isolation.md
  payment-idempotency.md
```

每个 评估样本至少包含：

- 任务描述。
- 相关事实源。
- 必须通过的验证。
- 隐藏风险点。
- 期望审查 Agent 发现的问题。
- 人类裁决标准。

## AI Coding 指标

| 指标 | 说明 |
| --- | --- |
| 首轮通过率 | 首轮实现后通过验证的比例 |
| 审查有效发现率 | AI 审查 Agent 发现有效问题的比例 |
| 误报率 | AI 审查 Agent 噪音比例 |
| 弱测试发现率 | 测试质疑 Agent 找到弱测试的比例 |
| 人工升级率 | 需要人类裁决的比例 |
| 返工轮次 | 平均修复循环次数 |
| 逃逸缺陷数 | 合并后逃逸缺陷 |
| 发布回滚率 | 发布后回滚比例 |
| 单个可接受变更成本 | 每个可接受变更的模型和人力成本 |

## 资料入口

- SWE-bench Verified: https://openai.com/index/introducing-swe-bench-verified/
- SWE-agent: https://github.com/SWE-agent/SWE-agent
- SWE-PolyBench: https://aws.amazon.com/blogs/devops/amazon-introduces-swe-polybench-a-multi-lingual-benchmark-for-ai-coding-agents/
- SetupBench: https://arxiv.org/abs/2507.09063
- GitTaskBench: https://arxiv.org/abs/2508.18993
- SWE-WebDevBench: https://arxiv.org/abs/2605.04637
