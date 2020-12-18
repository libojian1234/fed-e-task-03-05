### Vue.js 3.0

- 源码组织方式的变化
- Composition API
- 性能提升
- Vite

### 源码的组织方式

- 源码采用 TypeScript 重写
- 使用 Monorepo 管理项目结构

### 构建版本（packages/vue）

- cjs	（完整版本的vue，CommonJS结构，包括运行时和编译器）
  - vue.cjs.js	（开发版本）
  - vue.cjs.prod.js  （生产版本，压缩）
- global   （可全局用script标签引用，会在浏览器中创建一个vue的对象）
  - vue.global.js （开发版本，包括运行时和编译器）
  - vue.global.prod.js（生产版本，包括运行时和编译器）
  - vue.runtime.global.js（开发版本，只包括运行时）
  - vue.runtime.global.prod.js（生产版本，只包括运行时）
- browser （可全局用script标签引用,type=module）
  - vue.esm-browser.js（开发版本，包括运行时和编译器）
  - vue.esm-browser.prod.js（生产版本，包括运行时和编译器）
  - vue.runtime.esm-browser.js（开发版本，只包括运行时）
  - vue.runtime.esm-browser.prod.js（生产版本，只包括运行时）
- bundler （没有打包所有的代码，需要配合打包工具来使用，ESModule的方式）
  - vue.esm-bundler.js （包括运行时和编译器）
  - vue.runtime.esm-bundler.js （只导入了运行时，使用脚手架创建的项目就是导入的这个js）

### Compositons Api设计动机

- Options Api
  - 包含一个描述组件选项（data、methods、props等）的对象
  - Options Api 开发复杂组件，同一个功能逻辑的代码被拆分到不同选项
- Compositons Api
  - Vue.js3.0 新增的一组 API
  - 一组基于函数的API
  - 可以更灵活的组织组件的逻辑

### 性能提升

- 响应系统升级
- 编译优化
- 源码体积的优化

### 响应式系统升级

- Vuejs2.x 中响应式系统额核心 defineProperty
- Vuejs3.x 中使用Proxy 对象重写响应式系统
  - 可以监听动态新增的属性
  - 可以监听删除的属性
  - 可以监听数组的索引和 length 属性

### 编译优化

- Vue.js2.x 中通过标记静态根节点，优化 diff 的过程
- Vue.js3.x 中标记和提升所有的静态根节点，diff 的时候只需要对比动态节点内容
  - Fragments （升级 vetur 插件）
  - 静态提升
  - Patch flag
  - 缓存事件处理函数

### 优化打包体积

- Vue.js3.0 中移除了一些不常见的 API
  - 例如：inline-template、fifler 等
- Tree-shaking
  - 例如：Vue3中的没用到的模块不会被打包，但是核心模块会打包。Keep-Alive、transition等都是按需引入的。

### ES Module

- 现代浏览器都支持 ES Module （IE 不支持）

- 通过下面的方式加载模块

  - <script type="module" src="..."></script>

- 支持模块的 script 默认延迟加载

  - 类似于 script 标签设置 defer
  -  在文档解析完成后，触发 DOMContentLoaded 事件前执行

### Vite   as   Vue-CLI

- Vite 在开发模式下不需要打包可以直接运行
- Vue-CLI 开发模式下必须对象项目打包才可以运行
- Vite 在生产环境下使用 Rollup 打包
  - 基于ES Module 的方式打包
- Vue-CLI 使用 Webpack 打包

### Vite  特点

- 快速冷启动
- 按需编译
- 模块热更新

### Vite 创建项目

```
$  npm init vite-app <project-name>
$  cd <project-name>
$  npm install
$  npm run dev
```

### 基于模板创建项目

```
$  npm init vite-app --template react
```

### 响应式系统原理

### reactive 

- 接收一个参数，判断这参数是否是对象
- 创建拦截器对象 handler，设置 get/set/deleteProperty
- 返回 Proxy 对象

### reactive    vs    ref    vs    toRefs

- ref 可以把基本数据类型数据，转成响应式对象
- ref 返回的对象，重新赋值成对象也是响应式的
- reactive 返回的对象，重新赋值丢失响应式
- reactive 返回的对象不可以解构
- toRefs 可以把reactive 返回的对象重新赋值成响应式的对象



