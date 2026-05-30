# AI Coding

AI Coding 是一个面向 AI 原生软件工程的知识站，目标是把“AI 会写代码”升级成“团队能稳定交付软件”。

站点覆盖：

- AI Coding 心智模型、成熟度模型与全景知识地图
- Token 预算与取舍：简化、标准、严控三档流程
- 需求、任务切片、上下文工程、实现循环、人机交接
- Harness 引擎：MCP、工具生态、工作流图、权限、安全、编排、多 Agent、人工关口
- AI 原生验收：审查 Agent 组、测试质疑 Agent、安全红队、证据包、人类裁决
- 仓库理解、事实源治理、Benchmark、本地评估集、失败模式
- 产品与视觉验收、数据迁移、观测成本、法务合规
- 架构治理、测试策略、安全、发布、可维护性
- 团队角色、指标、工具选型
- 提示词模板、审查 JSON 契约、检查清单、术语表
- 附录阅读笔记：Claude Code、OpenAI、Anthropic、LangChain 等资料映射

核心提醒：AI Coding 不是越全越好。完整 Harness、长上下文、审查 Agent 组、端到端测试、链路记录和证据包都会消耗 Token、工具时间、CI 时间和人类注意力。预算不足时，应优先缩小任务切片，保留关键事实源和高风险闸门；必要时用人工补充上下文、抽样审查或手工验收。

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

静态站点输出到 `docs/.vitepress/dist`。GitHub Pages workflow 会在构建时设置 `VITEPRESS_BASE=/aicoding/`。
