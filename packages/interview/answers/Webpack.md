## loader
### 样式
1. style-loader : 将css注入DOM
2. css-loader : 解析css中的间接引用，如图片、字体
    1. modules: 可以将样式到处为一个对象
3. sass-loader : 转换`.sass`和`.scss`
4. less-loader : 转换`.less`
5. postcss-loader : 对CSS添加处理，如autoprefixer, stylelint

## plugin

1. TerserWebpackPlugin : 压缩JS
    1. optimization.minimize
    2. optimization.minimizer
2. SplitChunksPlugin : 分割公共chunk
    1. optimization.splitChunks
    2. By default it only affects ***on-demand chunks***
    3. split 的默认选项
        1. 新的chunk是被共享的或者是来自`node_modules`文件夹的模块
        2. 新的chunk在min和gz之前要 > 30kb
        3. 按需加载chunk时的并行请求最大数量 <= 5
        4. 初始页面的并行请求最大数量 <= 3
3. CopyWebpackPlugin : 将单个文件或整个目录复制到构建目录
4. CompressionWebpackPlugin : 资源压缩
5. ExtractTextWebpackPlugin : CSS提取到单独文件
6. HtmlWebpackPlugin : 基于模板简单创建 HTML 文件，用于服务器访问

## tree shaking
尽可能使用ES6 module导出，在`babel`配置中presets,设置为`{modules: false}`

## 自定义loader
```js

import { getOptions } from 'loader-utils';

export default function loader(source) {
  const options = getOptions(this);

  source = source.replace(/\[name\]/g, options.name);

  return `export default ${ JSON.stringify(source) }`;};
```

## 自定义插件
```js

function HelloCompilationPlugin(options) {
// ... webpack的配置
}

// 在插件函数的原型对象上定义apply方法，参数为compiler对象
HelloCompilationPlugin.prototype.apply = function(compiler) {

  // 设置回调来访问 compilation 对象：
  compiler.plugin("compilation", function(compilation) {

    // 现在，设置回调来访问 compilation 中的步骤：
    compilation.plugin("optimize", function() {
      console.log("Assets are being optimized.");
    });
  });};

module.exports = HelloCompilationPlugin;
```