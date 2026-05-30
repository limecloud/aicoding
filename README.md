# AI Coding

AI Coding 是一个面向 AI-native 软件工程的知识站，目标是把“AI 会写代码”升级成“团队能稳定交付软件”。

站点覆盖：

- AI Coding 心智模型与成熟度模型
- PRD、任务切片、上下文工程、实现循环
- Harness Engine：MCP、工具生态、Workflow Graph、安全、编排、多 Agent、人类门
- AI-native 验收：Reviewer Swarm、Test Skeptic、安全红队、证据包、人类裁决
- 架构治理、测试策略、安全、发布、可维护性
- 团队角色、指标、工具选型
- Prompt 模板、Reviewer JSON 契约、检查清单
- 附录阅读笔记：Claude Code Best Practices、OpenAI Building Agents、LangChain Harness 分层等外部资料映射

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
