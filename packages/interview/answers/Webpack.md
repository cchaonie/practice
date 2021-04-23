## loader

### 样式

1. style-loader : 将 css 注入 DOM
2. css-loader : 解析 css 中的间接引用，如图片、字体
    1. modules: 可以将样式到处为一个对象
3. sass-loader : 转换`.sass`和`.scss`
4. less-loader : 转换`.less`
5. postcss-loader : 对 CSS 添加处理，如 autoprefixer, stylelint

## plugin

1. TerserWebpackPlugin : 压缩 JS
    1. optimization.minimize
    2. optimization.minimizer
2. SplitChunksPlugin : 分割公共 chunk
    1. optimization.splitChunks
    2. By default it only affects **_on-demand chunks_**
    3. split 的默认选项
        1. 新的 chunk 是被共享的或者是来自`node_modules`文件夹的模块
        2. 新的 chunk 在 min 和 gz 之前要 > 30kb
        3. 按需加载 chunk 时的并行请求最大数量 <= 5
        4. 初始页面的并行请求最大数量 <= 3
3. CopyWebpackPlugin : 将单个文件或整个目录复制到构建目录
4. CompressionWebpackPlugin : 资源压缩
5. ExtractTextWebpackPlugin : CSS 提取到单独文件
6. HtmlWebpackPlugin : 基于模板简单创建 HTML 文件，用于服务器访问

## tree shaking

-   什么是 Tree Shaking
-   Tree Shaking 如何实现

## 什么是 Tree Shaking

Tree Shaking 指的是编译器优化中，移除源代码中的*死代码*（Dead Code Elimination）的一种实现。DCE 的目的是降低文件体积。根据这个定义，我们可以知道 Tree Shaking 至少有两个步骤：**识别**和**移除**

要移除死代码，首先要知道什么是死代码。死代码指的是不会影响程序执行结果的代码，有以下几种：

1. 不会执行到的代码。如永远不满足条件的`if`语句, `return`语句之后的代码
2. 只会影响到无关程序运行结果的变量

DCE 是发生在编译期间的行为，此时代码并没有执行，因此只能做静态分析，而 ESM 规范恰好提供了静态分析模块依赖的功能。

### 为什么 Tree Shaking 只能是 ESM，不能是 CJS

ESM 要求所有的`import` 语句都必须出现在模块的顶层，即不能在运行时导入模块。这样一来，一个模块所有的依赖在编译时已经确定了。相反，CJS 模块的`require`函数是可以在运行时导入模块的，因此无法在编译时确定所有的依赖。

## Tree Shaking 是如何实现的

### webpack 中如何进行 Tree Shaking

1. 必须使用 ES6 module 导出，在`babel`配置中 presets,设置为`{modules: false}`
2. 可以在`package.json`中使用`sideEffect: boolan | string[]`字段标记当前包中的副作用文件

## 如何加速 webpack 打包

1. 处理更少的文件
    1. exclude/include
    2. resolve.extensions 合理配置后缀，更快地找到待处理文件
    3. dllPlugin
    4. tree shaking
        1. use es6 module syntax, don't let compiler like babel transpile it.(babel-> @babel/preset-env options.modules = false)
        2. sideEffects: boolean / string[]
        3. `/*#__PURE__*/`
        4. 减少不必要的 loader/plugin
2. 更快打包
    1. 多进程打包

## 自定义 loader

```js
import { getOptions } from "loader-utils";

export default function loader(source) {
    const options = getOptions(this);

    source = source.replace(/\[name\]/g, options.name);

    return `export default ${JSON.stringify(source)}`;
}
```

## 自定义插件

```js
function HelloCompilationPlugin(options) {
    // ... webpack的配置
}

// 在插件函数的原型对象上定义apply方法，参数为compiler对象
HelloCompilationPlugin.prototype.apply = function (compiler) {
    // 设置回调来访问 compilation 对象：
    compiler.plugin("compilation", function (compilation) {
        // 现在，设置回调来访问 compilation 中的步骤：
        compilation.plugin("optimize", function () {
            console.log("Assets are being optimized.");
        });
    });
};

module.exports = HelloCompilationPlugin;
```
