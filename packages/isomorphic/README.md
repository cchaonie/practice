这是一个 react 同构（isomorphic）项目的 demo，用于理解同构的概念，以及一些核心组件和工具。

1. 使用了哪些组件/库

## 核心组件/库

| 序号 | 名称                           | 作用                 |
| ---- | ------------------------------ | -------------------- |
| 1    | react                          | UI                   |
| 2    | react-router, react-router-dom | 路由                 |
| 3    | redux, redux-observable, rxjs  | 数据流管理           |
| 4    | babel, babel-node, webpack     | 打包编译             |
| 5    | nodemon, express               | （热更新）开发服务器 |
| 6    | loadable-component             | 懒加载，code-split   |
| 7    | styled-component[tangram]      | css in js，组件库    |

## 辅助组件/库

| 序号 | 名称                     | 作用                   |
| ---- | ------------------------ | ---------------------- |
| 1    | storybook                | 快速验收               |
| 2    | prettier, eslint         | 代码规范，保持仓库整洁 |
| 3    | jest, react-test-library | unit test              |
| 4    | testcafe, puppeteer      | e2e 自动化测试         |
| 5    | lighthouse               | lighthouse 打分        |
| 6    | husky, lint-staged       | git 勾子               |
