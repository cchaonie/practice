# web 前端性能优化

## http 缓存优化

## 首屏渲染优化(关键渲染路径优化)

1. 减少关键资源数量、大小
2. 缩短关键路径的长度

### 首屏渲染流程

1. 下载 html
2. 解析 html，碰到 css 则去下载，解析
3. 生成 DOM 和 CSSOM
4. 结合 DOM 和 CSSOM 生成 render tree
5. layout paint

其中，JS 的执行过程是会阻塞 DOM 解析的，即 UI 线程和 JS 线程是互斥的；而解析 DOM 和解析 CSS 是可以同步进行的，但是没有解析完 css 是不会去执行 JS 脚本的，因为有可能脚本会去修改样式

那么**减少关键资源的数量和大小**可以做以下几件事：

1. 压缩文件，开启 gzip，包括 html、css、js
2. 去除多余的注释等不必要的内容

而缩短关键路径的长度则可以：

1. 尽可能不阻塞
2. 能不立刻下载的内容就放到后续再下载
3. 越快解析越好

具体来说：

1. 保留首屏需要的 CSS，如骨架屏等内容，其他资源可以异步加载
2. css 选择器层级尽可能简单，解析会更快
3. 脚本可以使用`defer`、`async`
    1. defer：异步下载，页面解析完毕后按照顺序再执行(DOMContentLoaded 之前)
    2. async：异步下载，下载完毕后才即执行

### 资源下载技术细节

#### 预加载

1. preload: <link rel="preload" as="..."> 优先级最高，且是异步加载
    1. 若是脚本，加载后不会执行，在需要执行的地方使用 script 标签再加载一次即可
    2. 若是 css，则会脱离关键渲染路径，不会阻塞页面渲染，不阻塞`DOMContentLoaded`和`load`事件
2. prefetch: <link rel="prefetch" as="..."> 优先级最低。用来加载下个路由可能需要的资源

#### 图片懒加载

1. 监听 `IntersectionObserver` 或者 页面 scorll 事件
2. 将图片 src 预先放在`data-src`上，当图片即将出现在视口时才开始加载目标图片

```js
const imgs = document.getElementsByTagName("img");
for (const img of imgs) {
    const src = img.dataset.src;
    img.onload = function () {
        console.log("load img success");
    };
    img.onerror = function (e) {
        console.error(e);
    };
    img.src = src;
}
```

#### 媒体查询

1. 使用方式：
    1. 放在其他 css 中，使用`@media`
    2. 使用 link 标签 `<link href="mobile.css" rel="stylesheet" media="screen and (max-width: 600px)">`
       当浏览器发现当前页面符合媒体查询，会再去下载相应的 css，因此可以确保下载对应的文件。需要注意的是，其他设备的css也会下载，但是不会阻塞浏览器的首屏渲染，而是会在后续空闲时进行下载

#### dns-prefetch

使用 meta 开启 dns-prefetch:

```html
<meta http-equiv="x-dns-prefetch-control" content="on" />
<link rel="dns-prefetch" href="//host_name_to_prefetch.com" />
```

### 重绘与回流

**回流必定导致重绘**

1. 引起页面元素位置发生变化的操作会引起回流
2. 获取当前元素的位置相关信息也会引起回流操作

```js
clientWidth clientHeight clientTop clientLeft
offsetWidth offsetHeight offsetTop offsetLeft
scrollWidth scrollHeight scrollTop scrollLeft
scrollIntoView() scrollIntoViewIfNeeded() scrollTo()
getComputedStyle() getBoundingClientRect()
```

## 应用层性能优化

### 事件委托

利用 dom 事件冒泡的特性，从父元素甚至根元素上监听事件，从而避免监听器散布在各个 dom 结点上，同时减少监听器的数量，节省内存。

使用事件委托时一定要注意不会冒泡的事件：

1. scroll 事件
2. focus/blur(focusin/focusout 是可以冒泡的)，要通过**事件委托**使用 focus 事件
    1. 要么使用`focusin`事件
    2. 要么使用`addEventListener()`时设置`useCapture: true`
3. mouseleave/mouseenter### React 应用优化

### React 应用优化

1. 减少不必要的更新
    1. shouldComponentUpdate(nextProps, nextState): boolean / PureComponent 自动对比所有的 props 和 state 的 key
    2. React.memo(Component, (oldProps, nextProps) => boolean) 对比 props
    3. useMemo(() => value, deps)
    4. 合理安排组件的层级结构，把变化控制在最小的环节
