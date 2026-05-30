# 度量指标

AI Coding 的指标不能只看“写了多少代码”。代码量变多不等于交付质量提高。更重要的是吞吐、返工、缺陷、审查噪音和风险发现效率。

## 推荐指标

| 指标 | 含义 | 目标 |
| --- | --- | --- |
| Lead Time | 从需求到合并的时间 | 缩短 |
| Review Latency | 从 AI 完成到人类裁决的时间 | 缩短 |
| AI Rework Rate | AI 初次实现后返工次数 | 下降 |
| Human Touch Points | 人类介入次数 | 聚焦高价值 |
| Finding Precision | AI reviewer 有效 finding 比例 | 提高 |
| Escaped Defects | 合并后逃逸缺陷 | 下降 |
| Test Skeptic Yield | 测试审查发现的有效缺口 | 初期上升，后期稳定 |
| Risk Waiver Count | 风险豁免数量 | 受控且有过期时间 |

## 噪音控制

AI reviewer 如果输出太多 low-value comments，会让团队失去信任。建议：

- 默认只在 PR 上发布 blocker/high/needs-human。
- medium/low 放在折叠报告或 artifact。
- 对误报做反馈学习。
- 每周删除或改写低信号规则。
