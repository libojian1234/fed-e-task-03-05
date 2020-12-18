### Vite 概念

- Vite 是一个面向现代浏览器的一个更轻、更快的 Web 应用开发工具
- 它基于 ECMAScript 标准原生模块系统（ES Modules）实现

### Vite 项目依赖

- Vite
- @vue/compiler-sfc

### 基本使用

- vite serve
- vite build

### HMR

- Vite HMR
  - 立即编译当前所修改的文件
- Webpack HMR
  - 会自动以这个文件（修改的这个文件）为入口重写 build 一次，所有的涉及到的依赖也都会被加载一遍

### Build

- vite build
  - Rollup
  - Dynamic import （代码切割采用动态导入的方式）
    - Polyfill

### 打包  or  不打包

- 使用 Webpack 打包的两个原因
  - 浏览器环境并不支持模块化（ES Module ，但是现在现代浏览器基本都支持了）
  - 零散的模块文件会产生大量的 HTTP 请求

### 开箱即用

- TypeScript - 内置支持
- less/saa/stylus/postcss - 内置支持（需要单独安装）
- JSX
- Web Assembly

### Vite 特性

- 快速冷启动
- 模块热更新
- 按需加载
- 开箱即用

### Vite 核心功能

- 静态 Web 服务器
- 编译单文件组件
  - 拦截浏览器不识别的模块，并处理
- HMR