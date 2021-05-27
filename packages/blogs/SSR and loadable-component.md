# React SSR and loadable-component

## 背景

使用 React 做 SSR 项目时，我们会有 code-split 的需求。React 本身提供了 React.lazy 和 Suspense 组件组合的形式，可以实现 code-split。而一般来说，我们会使用 loadable-component 去做 code-split，而不是直接使用 react API。本文的目标是解析 loadable-component 在基于 React 的 SSR 的同构应用中的作用，以及其实现原理。

### React SSR

一个具有基本功能的 React SSR 同构应用，在服务端需要完成一件事——导入 react 组件，使用 ReactDOMServer 的方法，将组件编译成字符串。
重点在于这个字符串中，需要包含组件的客户端脚本 bundle 的 script 标签。

在开发环境和生产环境，准备脚本的过程有所不同。服务端需要知道客户端脚本的产物，从而动态生成 script 标签，因此一般会先进行客户端编译打包工作。

1. 客户端

客户端的脚本肯定是需要编译打包的，将开发过程中的大量脚本文件，编译后打包成少量甚至一个脚本文件，可以减少请求数量，加快首屏渲染。

在开发环境，除了完成必须的编译打包工作，还需要启动一个静态资源服务器，用以提供脚本文件服务。

在生产环境，编译打包之后的产物，一般而言会直接放到 CDN 中，再提供服务。

2. 服务端

在开发环境，我们会启动一个开发服务器，从而在浏览器中完成开发工作。

而在生产环境，我们会在服务器上启动服务端脚本。所以，本质上来说，服务端的脚本是不需要打包的，因为 node 可以直接执行 JavaScript。

如果没有使用需要编译的脚本，如使用原生 nodejs 开发，这一块的编译打包的工作，其实是可以省略的。此时，需要编译的其实是 jsx，如果使用的是 react api，如 React.createElement，这一步可以完全省略。

### code split

code split 翻译过来就是代码分割，主要是为了解决客户端脚本编译打包后，产物过大，从而影响到了首屏加载的问题。

在代码中，我们是可以明确知道，应用中哪些脚本是可以延迟加载的。延迟加载的脚本是没有必要打包到首屏脚本中，因此，code split 要做的事情就是：

1. 在指定的位置拆分脚本代码
2. 提供一种在首屏之后加载脚本的方法

这两个功能均由打包工具实现了，webpack 提供了 import()，可以用来指示从哪里开始拆分脚本。然后，webpack 的运行时提供了动态加载脚本的函数（动态创建 script 标签），从而可以完成首屏之后再加载脚本。

### 什么是 loadable-component

它到底是干啥用的呢？官方的答案是——A React code splitting library。

react 暴露了 React.lazy 函数和 Suspense 组件，可以完成**代码拆分**的功能，那为什么还需要 loadable-component 呢？因为 React 的方案存在缺陷——不能在服务端使用，而这就是 loadable-component 的价值所在了。

### loadable-component 由哪些组件构成

1. @loadable/component

2. @loadable/server
   提供 ChunkExtractor

3. @loadable/babel-plugin

4. @loadable/webpack-plugin
   生成 loadable-stats.json
