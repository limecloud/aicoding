# 可观测性、成本与产能指标

AI Coding 规模化后，团队需要观测的不只是服务是否报错，还包括 Agent 如何做决定、花了多少成本、哪些审查真正有效、哪些问题逃逸到生产。

## Agent 可观测性

| 维度 | 应记录什么 |
| --- | --- |
| 提示词 / 规则 | 使用的系统规则、仓库规则、review 指令版本 |
| 上下文 | 读取的文件、文档、issue、日志、截图 |
| 工具调用 | 命令、MCP、浏览器、CI、外部 API |
| 代码差异 | 修改文件、行数、风险面、生成测试 |
| 验证 | 命令、结果、耗时、失败重试 |
| 审查 | 审查 Agent 问题清单、严重级别、误报、漏报 |
| 人工关口 | 决策、豁免、负责人、过期时间 |
| 成本 | Token、工具时间、CI 时间、人类审查时间 |

## 指标不是越多越好

优先追踪能改变行为的指标：

- 首轮通过率。
- 逃逸缺陷数。
- 审查命中率。
- 误报率。
- 弱测试发现率。
- 返工轮次。
- 人工升级率。
- 单个可接受变更成本。
- 单切片交付周期。

## 成本控制策略

- 根据风险选择 简化 / 标准 / 严控。
- 对重复上下文做缓存和摘要。
- 让审查 Agent 只读代码差异 + 相关事实源，不默认全仓扫描。
- 对低风险 PR 只输出阻断级/高风险。
- 对高风险 PR 缩小切片，不牺牲验证。
- 每周删除没有发现有效问题的审查 Agent 或检查项。

## 复盘模板

```markdown
# AI Coding 复盘

## 这周有效的 AI 产出
- 

## 逃逸缺陷
| issue | missed by | why | rule update |
| --- | --- | --- | --- |

## 高噪音检查
| 审查 Agent / 检查项 | 误报 | 处理方式 |
| --- | --- | --- |

## 成本异常
- Token：
- CI：
- 人工时间：

## 下周规则更新
- 
```

## 资料入口

- OpenTelemetry: https://opentelemetry.io/docs/
- LangGraph Overview: https://docs.langchain.com/oss/python/langgraph/overview
- OpenAI Codex GitHub Action: https://developers.openai.com/codex/github-action
