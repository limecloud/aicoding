# AI Coding 安全与风险全景

AI 生成代码的最大风险不是“代码看起来不像人写的”，而是它通常优先满足功能目标，却缺少你的组织安全上下文。安全必须进入 Harness，而不是在发布前临时扫描。

## 风险分类

| 风险 | 例子 | 默认控制 |
| --- | --- | --- |
| 代码漏洞 | XSS、SQL 注入、SSRF、命令注入 | SAST、安全审查 Agent、负例测试 |
| 权限绕过 | RBAC、tenant、admin、session | 服务端强校验、跨租户测试 |
| 数据风险 | 批量更新、删除、迁移、PII 日志 | 迁移关口、审计、回滚 |
| 依赖供应链 | 新依赖、postinstall、版本漂移 | 依赖审查、lockfile、SBOM |
| CI/CD 风险 | 工作流权限、密钥泄漏、deploy Token | 最小权限、环境保护、审批 |
| 提示词注入 | issue、PR 评论、网页、文档中隐藏指令 | 不信任外部文本、工具隔离 |
| MCP / Tool 风险 | 恶意工具、tool poisoning、权限组合 | allowlist、隔离、审计、confused deputy 防护 |
| 过度信任 | “AI 写的一定对” | 测试质疑 Agent、独立 review、负责人 |

## 安全闸门

高风险变更必须触发安全红队 Agent：

- auth、session、Token、OAuth、SSO。
- RBAC、tenant、admin、payment、quota。
- 数据库迁移、批量写入、删除、导入导出。
- webhook、外部 URL、文件上传、命令执行。
- 包脚本、Dockerfile、GitHub Actions、deploy。
- 密钥、环境变量、日志、监控。

## 安全证据包

```markdown
# 安全证据

## 风险面
- Auth:
- Tenant:
- Data:
- CI/CD:
- Dependencies:

## 自动化检查
- SAST:
- Dependency scan:
- Secret scan:
- Tests:

## 红队问题
| 严重级别 | 攻击路径 | 证据 | 修复建议 | 状态 |

## 人工裁决
- 已接受风险:
- 负责人:
- 过期时间:
```

## 资料入口

- OWASP Secure Coding with AI: https://cheatsheetseries.owasp.org/cheatsheets/Secure_Coding_with_AI_Cheat_Sheet.html
- OWASP Top 10:2025 Next Steps: https://owasp.org/Top10/2025/X01_2025-Next_Steps/
- NIST SSDF GenAI Profile: https://www.nist.gov/publications/secure-software-development-practices-generative-ai-and-dual-use-foundation-models-ssdf
- CISA / NSA Secure AI Guidelines: https://www.nsa.gov/Press-Room/Press-Releases-Statements/Press-Release-View/Article/3598020/guidance-for-securing-ai-issued-by-nsa-ncsc-uk-cisa-and-partners/
- MCP Architecture: https://modelcontextprotocol.io/docs/learn/architecture
