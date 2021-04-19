## 笔试

1. 换行字符串格式化
2. 屏幕占满和未占满的情况下，使 footer 固定在底部，尽量多种方法。
3. 日期转化为 2 小时前，1 分钟前等
4. 多个 bind 连接后输出的值
5. 原码，补码，反码
6. 事件委托
7. 输入一个日期 返回几秒前 几天前或者几月前
9. 实现一个 Promise.all
10. 手写代码：给定一个数组，形如 [1, 1, 2 , 3, 3, 3, 3, 4, 6, 6]，给定一个数 n，例如 3，找出给定的数 n 在数组内出现的次数，要求时间复杂度小于 O(n)

## 一轮

1. dom react 原理
2. css 布局
3. js 原型链继承
4. fetch 取消
5. eventloop
6. instanceof
7. promise 封装 setstate
8. redux 基本组成和设计单向数据流
9. https 协议的过程
10. https 获取加密密钥的过程
11. http 的方法有哪几种
12. 类式继承的方案
13. prototype 继承的实现
14. 借用构造继承，几种组合继承方式
15. 看编程代码说出运行结果：
    1. Process.nextTick，setImmediate 和 promise.then 的优先级
    2. Process.nextTick，promise, setImmediate 的优先级
18. 三个继承方式的优缺点
19. nodejs 的事件循环
20. bfc
21. css 实现正方形 div 水平垂直居中
22. koa1 的原理,继承
23. 最后是一个写代码 处理有依赖的异步任务 加重试
24. 自己实现 bind 函数
25. 什么是闭包
26. 最长子序列（动态规划）
27. 二叉树中序遍历
28. react 新版本的特性
29. 多空格字符串格式化为数组
30. bind 函数运行结果
31. 点击 table 的 td 显示 td 内容 33. 数字千分位处理
32. 固定日期与当前时间格式化处理
33. 上中下三栏布局
34. 实现一个子类实例可以继承父类的所有方法
35. 实现 sum(1)(2)(3).valueOf()，实现这么一个 sum 函数，返回 6

```js
function sum(...args) {
  let params = [...args];
  const fn = (...args1) => {
    params = [...params, ...args1];
    return fn;
  };
  fn.valueOf = () => params.reduce((acc, c) => acc + c, 0);
  return fn;
}
```

39. 实现 taskSum(1000,()=>{console.log(1)}).task(1200,()=>{console.log(2)}).task(1300,()=>{console.log(3)})，这里等待 1s，打印 1，之后等待 1. 2s，打印 2，之后打印 1. 3s，打印 3
40. Jsonp 跨域

```js
function jsonp(url, callback) {
  const src = `${url}?callback=${callback}`;
  const script = document.createElement("script");
  script.src = src;
  document.body.appendChild(script);
}
```

32. js 原型继承 & 原型链
33. promise
34. 二叉树搜寻算法，
35. 算法：前端做并发请求控制
36. 宏任务微任务
37. libUV
38. express ctx 中间键代码实现
40. 请实现如下的函数，可以批量请求数据，所有的 URL 地址在 urls 参数中，同时可以通过 max 参数控制请求的并发度，当所有请求结束之后，需要执行 callback 回调函数。发请求的函数可以直接使用 fetch 即可
41. 二叉树遍历
42. 并发请求最大值是 10，怎么处理队列
43. css 画出一个三角形
44. node 网关
45. csrf/xss 攻击原理
46. react diff 原理
47. 事件循环
48. react diff 算法，key 的作用，setState 的机制，事件合成
50. 实现一个方法，参数是一个 generator 函数，执行结果是执行完所有 generator 中的 yield
51. 获取页面所有 img 并且下载
```js

var x=new XMLHttpRequest()
    x.open("GET", "http://danml.com/wave2.gif", true);
    x.responseType = 'blob';
    x.onload=function(e){
        var url = window.URL.createObjectURL(x.response)
        var a = document.createElement('a');
        a.href = url
        a.download = ''
        a.click()
    }

```
52. 两个同源 tab 之间的交互，数据同步
53. 怎么将一个异步方法 promise 化，以及实现 promise.all()方法
56. nodejs 相关的应用（答：开发命令行工具.web 服务，ssr，数据库操作等）
57. wepack-dev-server 热更新功能实现原理
58. express.koa.redis 等技术相关应用
59. [1,2,3].map(parseInt) 执行结果
60. 手写代码二叉树深度为 n 的遍历，遍历有哪几种方式
61. promise.then 的调用
62. promise.all()的实现原理
63. div 的点击事件回调不执行的原因，具体的一种原因怎么定位问题
64. hybrid 实现 bridge 的方法
65. 最有挑战的项目
66. 小程序框架的实现原理
68. webpack 打包的原理，webpack 有没有针对打包过程做一些优化提升打包速度
71. 写一个 eventBus
72. 元素水平垂直居中
73. vuex mobox
74. 小程序架构优化 日志系统
75. 根据自己简历和做过的项目，问一系列相关问题：
76. 闭包的输出值，考查闭包（看试题给结果）
77. 浏览器缓存的方法有哪些，它们的优先级是怎样的 ？
78. 状态码 304 是什么意思 ？
79. 都说要减少 https 的请求，https 为什么慢 ？
80. http2 与 http1 有什么区别
81. click DOM 节点的 inner 与 outer 的执行机制，考查事件冒泡与事件捕获 （看试题给结果）
82. for 循环中的 var .let 与 const 区别，for( const i = 0; i< 3; i++ ){ console.log(i); } 会输出什么结果 ？（看试题给结果）
83. 有没有系统学习过 es6 或者看过 es6 的书
84. js 单线程.宏任务与微任务的执行顺序 （看试题给结果）
85. 考查箭头函数的 this 与 普通函数的区别，this 的指向 （看试题给结果）
87. 接下来前端要深入的方向 ？
88. CSS 栅格布局
89. CSS 伪类和伪元素
90. 根据条件获取递归树中过的某一节点
91. JavaScript this 的指向；箭头函数的 this 指向
92. Promise / setTimeout 的执行顺序；实际考察知识点：对「事件队列 / 宏任务 / 微任务」的了解

## 二轮

1.  主要是围绕你的项目经历和技术，有一定的深度，主要还是要对项目全面熟悉；还有一个就是函数柯理化的编码实现
2.  函数柯里化.Web 安全.react 性能优化.react 算法原理
3.  上来直接让写一个 autocomplete 组件，可能是想考察业务思考点；
4.  后续的问题主要会接着业务场景问 扣实际场景 不问知识理论；
5.  http 网络协议 ；
6.  tcp 为什么是可靠的；
7.  js 设计模式；
8.  solid 原则；
9.  柯里化；
10. css 单行和多行截断

```css
.sigleLine {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

11. 给一个由域名组成的字符串进行按子域名分组的反转，比如 news.toutiao.com 反转成 com.toutiao.news 需要 in place 做
12. 其他技术问题都是穿插在我的业务项目里面的，有点针对实际情景给解决方案
13. 实现一个 outsideclick 的 Hoc，触发时调用 子组件的 outsideclick 方法
14. 手写一个 redux middleware
15. 实现一个 outsideclick 的 Hoc，触发时调用 子组件的 outsideclick 方法
16. 最近在做项目（痛点，难点，怎么解决）
17. ssr（ssr csr 混合怎么处理）
18. 小程序架构（带来的优缺点）
19. 状态管理，异步编程（各个优缺点）
20. 聊了过往的项目经历，询问具体的技术方案和细节实现
21. 分割字符串；实际考察知识点：对「正则表达式」的了解
22. 富文本编辑器的实现；
23. 文件上传的实现；
24. 网络安全：CSRF & XSS 是什么及防范措施
25. 同源策略；跨域的实现方式
26. 带超时，带防重名的 JSONP 的实现

## 三轮

1. 自己做得最有成就的项目
2. 自己主动承担并是核心的项目
3. 项目深度:比如现场实现 vue 的数据代理等
4. 技术广度:什么是微前端等
5. 职业发展
6. js 实现依赖注入
7. 接口攻击的方式和防御措施
8. http、https 握手过程
9. 设计模式
10. redux 和 mobx 的区别
11. js 多线程如何共享大的数据
12. 问了 redis 数据结构和实现
13. 问 hashmap
14. 浅拷贝深拷贝实现
15. 小程序架构优化，
16. 二叉树 ，diff 算法，
17. 页面渲染原理，
18. 图像算法 事件循环
19. 长列表渲染，前端安全
20. 聊了过往的项目经历，询问具体的技术方案和细节实现
21. 在现团队中担任的角色；觉得自己印象最深刻 / 最有亮点的项目经历

## 算法部分

1. ['a','b'],['A','B'],['1','0']，输出['aA1','aA0','aB1','aB0','bA1','bA0','bB1','bB0']，算法的排列组合问题
2. 写一个方法输出 ABCDEFG 的值
3. 从排好序的两个链表中，找到相同的节点，并输出链表
