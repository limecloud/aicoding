# 产品、设计与视觉验收

AI Coding 不能只停留在后端和测试。对用户可见的软件，产品行为、交互、文案、视觉状态和可访问性都应该进入验收闭环。

## 产品输入

AI 实现前需要明确：

- 目标用户和使用场景。
- 成功路径与失败路径。
- 非目标和不做的体验。
- 空状态、加载态、错误态、权限态。
- 移动端和桌面端优先级。
- 可访问性和国际化要求。

## 视觉验收证据

| 证据 | 作用 |
| --- | --- |
| 截图 | 快速判断布局、状态、文案 |
| Playwright 链路记录 | 复现交互路径、network、console |
| Console / network log | 查前端错误和接口失败 |
| Before / after 对比 | 避免无意视觉回归 |
| 断点截图 | 桌面、平板、手机覆盖 |

## AI 视觉审查 Agent

视觉审查 Agent 不应该只说“看起来不错”。它应输出：

```markdown
## 视觉验收
- 页面：
- 截图：
- 断点：desktop / mobile
- 关键用户路径：

## 问题清单
| 严重级别 | 区域 | 证据 | 建议修复 |
| --- | --- | --- | --- |

## 缺失证据
- 未覆盖的状态：
- 未覆盖的设备：
```

## 产品判断仍归人类

AI 可以发现布局破损、文案不一致、可访问性缺口和交互异常，但不能替代人类负责人决定：

- 这个体验是否符合品牌和定位。
- 是否接受某个边缘状态先不做。
- 是否为了速度牺牲一致性。
- 是否改变用户心智或商业承诺。

## 预算不足时怎么做

- 只跑关键路径和主要断点。
- 只截图 变更页面，不全站截图。
- 只让 AI 查阻断级/高风险视觉问题。
- 人工抽样检查品牌、文案和产品判断。

## 资料入口

- Playwright Trace Viewer: https://playwright.dev/docs/trace-viewer-intro
- Claude Code Best Practices: https://code.claude.com/docs/en/best-practices
- OpenAI Codex Browser Workflows: https://developers.openai.com/codex/
