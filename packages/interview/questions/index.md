## 笔试

1. 换行字符串格式化
2. 屏幕占满和未占满的情况下，使 footer 固定在底部，尽量多种方法。
3. 日期转化为 2 小时前，1 分钟前等
4. 多个 bind 连接后输出的值
5. 原码，补码，反码
6. 事件委托
   利用浏览器事件冒泡的原理（event.bubbles），可以在根元素上监听事件的发生，在监听器内部通过判断事件的原始目标`event.target`，从而实现不同处理

7. 输入一个日期 返回几秒前 几天前或者几月前
8. 实现一个 Promise.all
9. 手写代码：给定一个数组，形如 [1, 1, 2 , 3, 3, 3, 3, 4, 6, 6]，给定一个数 n，例如 3，找出给定的数 n 在数组内出现的次数，要求时间复杂度小于 O(n)
   有序数组，要求复杂度低于`O(n)`，因此只能往二分的方向上考虑

## 一轮

1. dom react 原理
   react 基于虚拟 DOM，实现了一套书写 UI 的方式，从而高效操作底层 DOM

2. css 布局
3. js 原型链继承
4. fetch 取消
   options 中`singal`传入`(new AbortController()).singal`, 然后通过`controller.abort()`取消请求
5. eventloop
6. instanceof
7. promise 封装 setstate

```js
const setStateP = function (state) {
    return new Promise(resolve => this.setState(state, resolve));
};
```

8. redux 基本组成和设计单向数据流
   store/action/reducer
   store.getState()
   store.dispatch(action)
   store.subscribe(listener)

9. https 协议的过程
10. https 获取加密密钥的过程
11. http 的方法有哪几种
    1. get: 获取资源，幂等，可缓存，参数拼接在 URL 后面，浏览器对参数大小有限制
    2. post：向服务器提交数据，参数放在 body 中
    3. put： replace 服务器上的资源
    4. delete：删除资源
    5. options： cors 的预检请求
12. 类式继承的方案
13. prototype 继承的实现
14. 借用构造继承，几种组合继承方式
15. 看编程代码说出运行结果：
    1. Process.nextTick，setImmediate 和 promise.then 的优先级
    2. Process.nextTick，promise, setImmediate 的优先级
16. 三个继承方式的优缺点
17. nodejs 的事件循环
18. bfc
19. css 实现正方形 div 水平垂直居中
20. koa1 的原理,继承
21. 最后是一个写代码 处理有依赖的异步任务 加重试
22. 自己实现 bind 函数
23. 什么是闭包
24. 最长子序列（动态规划）
25. 二叉树中序遍历

```js
function in_order_iterative(root) {
    if (!root) return [];
    let stack = [],
        result = [];
    while (root || stack.length) {
        while (root) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        result.push(root.val);
        root = root.right;
    }
    return result;
}
```

28. react 新版本的特性
29. 多空格字符串格式化为数组

```js
function formatStr(str) {
    return str.split(/\s+/);
}
```

30. bind 函数运行结果
31. 点击 table 的 td 显示 td 内容
32. 数字千分位处理
33. 固定日期与当前时间格式化处理
34. 上中下三栏布局
35. 实现一个子类实例可以继承父类的所有方法
36. 实现 sum(1)(2)(3).valueOf()，实现这么一个 sum 函数，返回 6

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
39. 请实现如下的函数，可以批量请求数据，所有的 URL 地址在 urls 参数中，同时可以通过 max 参数控制请求的并发度，当所有请求结束之后，需要执行 callback 回调函数。发请求的函数可以直接使用 fetch 即可
40. 二叉树遍历
41. 并发请求最大值是 10，怎么处理队列
42. css 画出一个三角形
43. node 网关
44. csrf/xss 攻击原理
45. **react diff 原理**
    diff 就是找到这次更新的 fiber 树跟已有的 fiber 树有什么差别，如果要精确找到两颗树的最小变更，复杂度很高，因此 react 做了简化：

        1. Two elements of different types will produce different trees.
        2. The developer can hint at which child elements may be stable across different renders with a key prop.

    即:

        1. 仅仅比较同级结点
        2. 同级结点比较结点类型，如果类型发生变化，则从这个直接destory老的结点，实例化新的类型结点；
        3. 如果有key的话，则比较key的变化
        4. 如果类型不变，则比较节点属性，做更新操作

46. 事件循环
47. react diff 算法，key 的作用，setState 的机制，事件合成
48. 实现一个方法，参数是一个 generator 函数，执行结果是执行完所有 generator 中的 yield
49. 获取页面所有 img 并且下载

```js
var x = new XMLHttpRequest();
x.open("GET", "http://danml.com/wave2.gif", true);
x.responseType = "blob";
x.onload = function (e) {
    var url = window.URL.createObjectURL(x.response);
    var a = document.createElement("a");
    a.href = url;
    a.download = "";
    a.click();
};
```

52. 两个同源 tab 之间的交互，数据同步
    1. localStorage. 当 storage 发生变化就会触发`storage`
    2. window.open() 或者 iframe 的方式，可以使用 window.postMessage 通信
53. 怎么将一个异步方法 promise 化，以及实现 promise.all()方法
54. nodejs 相关的应用（答：开发命令行工具.web 服务，ssr，数据库操作等）
55. wepack-dev-server 热更新功能实现原理

    1. webpack-hot-middleware: 基于 **EventSource**(服务端推送消息), 与客户端建立连接，发送初始 hash，以区别后续更新的 hash
    2. webpack 监听文件变更，并增量编译
    3. webpack-hot-middleware：发送变更 hash 到客户端
    4. 客户端请求 hot-update.json，其中包含更新的文件
    5. 客户端通过动态 script 的形式请求新的增量 js 文件
       webpack-dev-middleware 的作用在于承担内存文件系统的作用

56. express.koa.redis 等技术相关应用
57. [1,2,3].map(parseInt) 执行结果
58. 手写代码二叉树深度为 n 的遍历，遍历有哪几种方式
59. promise.then 的调用
60. promise.all()的实现原理
61. div 的点击事件回调不执行的原因，具体的一种原因怎么定位问题
62. hybrid 实现 bridge 的方法
63. 最有挑战的项目
64. 小程序框架的实现原理
65. webpack 打包的原理，webpack 有没有针对打包过程做一些优化提升打包速度
66. 写一个 eventBus
67. 元素水平垂直居中
68. 小程序架构优化 日志系统
69. 根据自己简历和做过的项目，问一系列相关问题：
70. 闭包的输出值，考查闭包（看试题给结果）
71. 浏览器缓存的方法有哪些，它们的优先级是怎样的 ？
    1. http 缓存
       大文件，优先缓存至 disk，小文件优先缓存至 memory
       当内存占用率高的情况下，优先缓存至 disk
    2. webStorage
    3. service worker
    4. indexDB
72. 状态码 304 是什么意思 ？
73. 都说要减少 https 的请求，https 为什么慢 ？
    1. 加密
74. http2 与 http1 有什么区别
75. click DOM 节点的 inner 与 outer 的执行机制，考查事件冒泡与事件捕获 （看试题给结果）
76. for 循环中的 var .let 与 const 区别，for( const i = 0; i< 3; i++ ){ console.log(i); } 会输出什么结果 ？（看试题给结果）
77. 有没有系统学习过 es6 或者看过 es6 的书
78. js 单线程.宏任务与微任务的执行顺序 （看试题给结果）
79. 考查箭头函数的 this 与 普通函数的区别，this 的指向 （看试题给结果）
80. 接下来前端要深入的方向 ？
81. CSS 栅格布局
82. CSS 伪类和伪元素
83. 根据条件获取递归树中过的某一节点
84. JavaScript this 的指向；箭头函数的 this 指向
85. Promise / setTimeout 的执行顺序；实际考察知识点：对「事件队列 / 宏任务 / 微任务」的了解

## 二轮

1.  主要是围绕你的项目经历和技术，有一定的深度，主要还是要对项目全面熟悉；还有一个就是函数柯理化的编码实现
2.  函数柯里化 Web 安全 react 性能优化 react 算法原理
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

```js
store => next => action => {
    console.log(action);
    const returnValue = next(action);
    return returnValue; // store.dipatch return action by default
};
```

15. 实现一个 outsideclick 的 Hoc，触发时调用 子组件的 outsideclick 方法
16. 最近在做项目（痛点，难点，怎么解决）
17. ssr（ssr csr 混合怎么处理）
18. 小程序架构（带来的优缺点）
19. 状态管理，异步编程（各个优缺点）
20. 聊了过往的项目经历，询问具体的技术方案和细节实现
21. 分割字符串；实际考察知识点：对「正则表达式」的了解
22. 富文本编辑器的实现；
23. 文件上传的实现；
    1. form 表单通过`multipart/form-data`直接上传
    2. ajax/fetch 上传 formData
    3. 大文件上传需要注意会超时，导致断开链接，因此大文件上传需要注意以下几点
        1. 文件分片上传
        2. 每一片需要做标记，让服务端可以识别，从而拼接完整文件
        3. 断点续传：保存每一份切片上传记录，既可以存在服务端也可以在客户端，上传之前先检查是否已经上传
24. 网络安全：CSRF & XSS 是什么及防范措施
25. 同源策略；跨域的实现方式
26. 带超时，带防重名的 JSONP 的实现

```js
function jsonp(url, params, callback, time) {
    //构造一个函数到window上
    var body = document.body;
    var fnName = "_jsonpFn" + Math.random().toString().replace(".", "");
    window[fnName] = function (data) {
        //发回数据回调的内容
        callback(data); //用户写的函数
        //执行完毕之后,删除该函数
        delete window[fnName];
        body.removeChild(script);
    };

    //创建动态标签
    var script = document.createElement("script");
    //这里的script和img一样，都有能力不受限制的从其他域加载资源,在加载的时候，就会向服务器发起请求
    let str = "";
    for (let key in params) {
        str += key + "=" + params[key] + "&";
    }
    // console.log(str);
    str += "callback=" + fnName;
    script.src = url + "?" + str;
    //先绑定函数再请求

    body.insertBefore(script, document.body.firstChild);
    //设置超时处理
    if (time) {
        var timer = window.setTimeout(function () {
            //jsonp的超时处理，移除回调函数
            body.removeChild(script);
            clearTimeout(timer);
        }, time);
    }
}
```

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

```js
function combination(...args) {
    const result = [];
    const backtrack = (ops, selection) => {
        if (selection.length === args.length) {
            result.push(selection);
            return;
        }
        for (let op of ops) {
            const newStr = selection + op;
            const newOps = args[newStr.length];
            backtrack(newOps, newStr);
        }
    };
    backtrack(args[0], "");
    return result;
}
```

2. 写一个方法输出 ABCDEFG 的值
3. 从排好序的两个链表中，找到相同的节点，并输出链表

```js
function sortedLinkedListIntersection(l1, l2) {
    let p1 = l1;
    let p2 = l2;
    let head = null;
    let nextNode = null;
    while (p1 != null && p2 != null) {
        if (p1.val === p2.val) {
            if (!head) {
                head = p1;
                nextNode = head;
            } else {
                nextNode.next = p1;
                nextNode = nextNode.next;
            }
            p1 = p1.next;
            p2 = p2.next;
        } else {
            if (p1.val > p2.val) {
                p2 = p2.next;
            } else {
                p1 = p1.next;
            }
        }
    }
    return head;
}
```
