# web前端性能优化
## http缓存优化

## 首屏渲染优化(关键渲染路径优化)
1. 减少关键资源数量、大小
2. 缩短关键路径的长度

### 首屏渲染流程
1. 下载html
2. 解析html，碰到css则去下载，解析
3. 生成DOM和CSSOM
4. 结合DOM和CSSOM生成render tree
5. layout paint

其中，JS的执行过程是会阻塞DOM解析的，即UI线程和JS线程是互斥的；而解析DOM和解析CSS是可以同步进行的。
那么**减少关键资源的数量和大小**可以做以下几件事：
1. 压缩文件，开启gzip，包括html、css、js
2. 去除多余的注释等不必要的内容
而缩短关键路径的长度则可以：
1. 尽可能不阻塞
2. 能不立刻下载的内容就放到后续再下载
3. 越快解析越好
具体来说：
1. 保留首屏需要的CSS，如骨架屏等内容，其他资源可以异步加载
2. css选择器层级尽可能简单，解析会更快
2. 脚本可以使用`defer`、`async`
  1. defer：异步下载，页面解析完毕后按照顺序再执行(DOMContentLoaded之前)
  2. async：异步下载，下载完毕后才即执行

### 资源下载技术细节
#### 预加载
1. preload: <link rel="preload" as="..."> 优先级最高。异步加载，
  1. 若是脚本，加载后不会执行，在需要执行的地方使用script标签再加载一次即可
  2. 若是css，则会脱离关键渲染路径，不会阻塞页面渲染，不阻塞`DOMContentLoaded`和`load`事件 
2. prefetch: <link rel="prefetch" as="..."> 优先级最低。用来加载下个路由可能需要的资源

#### 图片懒加载
1. 监听 `IntersectionObserver` 或者 页面scorll事件
2. 将图片src预先放在`data-src`上，当图片即将出现在视口时才开始加载目标图片

#### 媒体查询
1. 使用方式：
 1. 放在其他css中，使用`@media`
 2. 使用meta标签 `<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui">`
当浏览器发现当前页面符合媒体查询，会再去下载相应的css，因此可以确保下载对应的文件，而不会发生移动设备下载PC文件

#### dns-prefetch
使用meta开启dns-prefetch: `<meta http-equiv="x-dns-prefetch-control" content="on">`
`<link rel="dns-prefetch" href="//host_name_to_prefetch.com">`

#### 重绘与回流
**回流必定导致重绘**
1. 引起页面元素位置发生变化的操作会引起回流
2. 获取当前元素的位置相关信息也会引起回流操作
```js
clientWidth clientHeight clientTop clientLeft
offsetWidth offsetHeight offsetTop offsetLeftscrollWidth
scrollHeight scrollTop
scrollLeftscrollIntoView()、scrollIntoViewIfNeeded()、getComputedStyle()、
getBoundingClientRect()、scrollTo()
```

## 应用层性能优化
### React应用优化
减少不必要的更新
1. shouldComponentUpdate(nextProps, nextState): boolean / PureComponent自动对比所有的props和state的key
2. React.memo(Component, (oldProps, nextProps) => boolean) 对比props
3. useMemo(() => value, deps)



