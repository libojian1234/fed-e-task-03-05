### 1、Vue 3.0 性能提升主要是通过哪几方面体现的？

- 响应式系统升级

  Vue3使用Proxy对象重写了响应式系统。

  - Vue.js 2.x中响应式系统的核心 `defineProperty`，初始化的时候递归遍历所有的属性，转化为getter、setter
  - Vue.js 3.0中使用 Proxy 对象重写响应式系统
    - 可监听动态新增的属性
    - 可以监听删除的属性
    - 可以监听数组的索引和length属性

- 编译优化

  重写了DOM提高渲染的性能。

  - Vue.js 2.x中通过标记静态根节点，优化diff的过程
  - Vue.js 3.0 中标记和提升所有的静态根节点，diff的时候只需要对比动态节点内容
    - Fragments（升级vetur插件）
    - 静态提升
    - Patch flag
    - 缓存事件处理函数

- 优化打包体积

  - 通过优化源码的体积和更好的TreeShaking的支持，减少大打包的体积
  - Vue.js 3.0中移除了一些不常用的API
    - 例如：inline-template、filter等
  - Tree-shaking
    - 例如：Vue3中的没用到的模块不会被打包，但是核心模块会打包。Keep-Alive、transition等都是按需引入的。

### 2、Vue 3.0 所采用的 Composition Api 与 Vue 2.x使用的Options Api 有什么区别？

- Options Api
  - 包含一个描述组件选项（data、methods、props等）的对象
  - Options Api 开发复杂组件，同一个功能逻辑的代码被拆分到不同选项
- Compositons Api
  - Vue.js3.0 新增的一组 API
  - 一组基于函数的API
  - 可以更灵活的组织组件的逻辑

### 3、Proxy 相对于 Object.defineProperty 有哪些优点？

- 可监听动态新增的属性
- 可以监听删除的属性
- 可以监听数组的索引和length属性
- 多层属性嵌套，在访问属性过程中处理下一级属性

### 4、Vue 3.0 在编译方面有哪些优化？

- Vue.js2.x 中通过标记静态根节点，优化 diff 的过程
- Vue.js3.x 中标记和提升所有的静态根节点，diff 的时候只需要对比动态节点内容
  - Fragments （升级 vetur 插件）
  - 静态提升
  - Patch flag
  - 缓存事件处理函数

### 5、Vue.js 3.0 响应式系统的实现原理？

Vue3响应式系统底层采用Proxy实现对对象实现属性的监听。

在属性的get方法中调用track方法收集依赖，track方法内部先检查是否有正在收集依赖的监听事件activeEffect，没有就直接返回。然后去检查该对象是不是已经在WeakMap中了，如果不在的话，先在WeakMap中创建一个该对象的位置，指向一个存放属性的Map，然后去WeakMap中找到该对象对应的Map，再在这个对象的Map中找到这个属性的监听事件集合Set，如果不存在Set再先创建一个，然后将正在收集依赖的监听事件activeEffect加入到这个属性的事件集合Set中。

在属性的set方法、deleteProperty方法中调用trigger方法触发更新，同上，trigger会先去WeakMap中查找这个对象的存放属性的Map，找不到则直接返回，如果找到了，这个对象的Map，再去Map中找这个属性的监听事件集合Set，如果找不到Set则直接返回，如果找到了，则循环执行该属性的监听事件集合Set里的每一个事件监听函数activeEffect，执行更新。

