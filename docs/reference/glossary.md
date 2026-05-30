# 术语表

## AI Coding

以 AI agent 为主要实现、审查和验证执行者的软件工程方式。重点不是代码补全，而是端到端交付系统。

## AI-native 验收

AI 先做多角色审查、测试攻击、安全红队和证据汇总，人类最后裁决高风险与争议项。

## Implementer Agent

负责实现当前切片的 AI。它可以修改代码和运行验证，但不应该给自己最终验收结论。

## Reviewer Swarm

多个独立 AI reviewer 的集合。每个 reviewer 聚焦一种风险，例如需求、测试、安全、治理、发布。

## Test Skeptic

专门审查测试有效性的 reviewer。它的目标是找出测试为什么可能不能证明正确性。

## Security Red Team

专门寻找可利用攻击路径、安全配置错误和权限绕过的 reviewer。

## Judge Agent

聚合 reviewer 结果的 agent。它只去重、定级、标出冲突和人类决策点，不新增事实。

## Evidence Package

将需求、代码、测试、trace、截图、日志、finding、风险和回滚路径汇总成的人类裁决材料。

## Human Arbiter

最终负责风险接受、产品判断、架构方向和发布决策的人类 owner。
