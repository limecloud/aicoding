# 协议、运行时与可观测性

AI Coding 的 Harness 需要把模型连接到真实系统。协议决定 Agent 能接哪些工具；运行时决定长任务如何保存状态、恢复失败、暂停给人裁决；可观测性决定团队能不能看清 Agent 做过什么。

## 协议与运行时版图

| 能力 | 代表 | 作用 |
| --- | --- | --- |
| 工具与上下文协议 | MCP | 标准化工具、资源、提示词和 JSON-RPC 生命周期 |
| Agent 间通信 | A2A | 让独立 Agent 以对等方式协作，而不只是被当成工具调用 |
| 工作流运行时 | LangGraph、Temporal、Inngest | 状态机、检查点、持久执行、人在回路 |
| 浏览器验证 | Playwright | 真实页面操作、链路记录、截图、network、console |
| 可观测性 | OpenTelemetry、LangSmith 等 | trace、metrics、logs、状态转移、工具调用审计 |

## MCP 在 AI Coding 中的角色

MCP 适合把外部能力暴露给编码 Agent：

- 文档检索。
- issue / PR / CI 读取。
- 浏览器和设计稿。
- 数据库只读查询。
- 监控和日志。
- 内部工具。

但 MCP 也扩大了攻击面。每个 server 都应有：

- 工具白名单。
- 权限边界。
- 输入输出审计。
- 密钥隔离。
- 提示词注入防护。
- 生产写入必须经过人工关口。

## 工作流运行时的价值

长任务需要持久状态：

```text
state = {
  task,
  context_pack,
  current_diff,
  test_results,
  review_findings,
  human_decisions,
  release_evidence
}
```

运行时负责：

- 每一步检查点。
- 失败后恢复。
- 人类中断和继续。
- 并行审查 Agent 聚合。
- 链路记录和调试。

## Agent 可观测性

普通服务观测关注请求延迟和错误率。AI Coding 还要观测：

- 提示词和上下文版本。
- 工具调用序列。
- 读写了哪些文件。
- 运行了哪些验证命令。
- 哪些审查 Agent 产生问题。
- 人工关口做了什么决策。
- 每轮修复成本。
- 最终是否逃逸缺陷。

## 资料入口

- MCP Architecture: https://modelcontextprotocol.io/docs/learn/architecture
- A2A Specification: https://google-a2a.github.io/A2A/specification/
- LangGraph Overview: https://docs.langchain.com/oss/python/langgraph/overview
- LangChain Products: https://docs.langchain.com/oss/python/concepts/products
- Playwright Trace Viewer: https://playwright.dev/docs/trace-viewer-intro
- OpenTelemetry Docs: https://opentelemetry.io/docs/
