### 概述

缓存是一种保存资源副本并在下次请求时直接使用该副本的技术。使用缓存的主要原因是：

1. 降低网络延迟，减轻服务器负担。客户端请求可以直接在缓存中获得响应，就不需要到原始服务器，
2. 服务器的压力减轻，同时让请求更快得到响应。

缓存的种类有很多,其大致可归为两类：

1. 私有缓存，私有缓存只能用于单独用户
2. 共享缓存，共享缓存存储的响应能够被多个用户使用

### 缓存的运行机制

缓存运行有三个步骤：

1. 控制是否缓存当前资源
2. 当前资源的缓存是新鲜的还是过期的
3. 验证当前资源是否有更新

### 缓存分类

1. 强制缓存
    1. Expires
    2. Pragma 和 Cache-Control
2. 协商缓存
    1. Last-Modified 和 If-Modified-Since
    2. Etag 和 If-None-Match

### 如何有效设置缓存

1. 尽可能使用强缓存
   在更新版本的时候，顺便把静态资源的路径改了，这样，就相当于第一次访问这些资源，就不会存在缓存的问题了
   webpack 给我们提供了三种哈希值计算方式，分别是 hash、chunkhash 和 contenthash。那么这三者有什么区别呢？
    1. hash：跟整个项目的构建相关，构建生成的文件 hash 值都是一样的，只要项目里有文件更改，整个项目构建的 hash 值都会更改。
    2. chunkhash：根据不同的入口文件(Entry)进行依赖文件解析、构建对应的 chunk，生成对应的 hash 值。
    3. contenthash：由文件内容产生的 hash 值，内容不同产生的 contenthash 值也不一样。

### 与缓存相关的 HTTP headers

#### Pragma

Pragma 是 http 1.0 中提供的 http 通用首部字段，但是作为响应首部字段时的效果没有被定义，因此一般仅用作请求首部。
`Pragma: no-cache`的效果是：强制要求在返回缓存的版本之前将请求提交到源服务器进行验证。
这个首部仅仅用来向后兼容只支持 http 1.0 客户端才使用。

#### Expires

Expires 是**响应首部**。
`Expires: <http-date>`的效果是响应的内容在此时间过后就会过期。
如果 Cache-Control 响应首部设置了`max-age`或`s-max-age`指令，那么 Expires 首部就会失效。
使用 Expires 需要注意两点：

1. 服务端的时间与可缓存的时间需要同步
2. 服务端的资源更新后需要更新 Expires 的时间

#### Cache-Control

Cache-Control 是 http 1.1 提供的**通用首部**字段，请求和响应中都可以设置。
作为请求首部的话，可选值如下：

```
Cache-Control: max-age=<seconds>
Cache-Control: max-stale[=<seconds>]
Cache-Control: min-fresh=<seconds>
Cache-control: no-cache
Cache-control: no-store
Cache-control: no-transform
Cache-control: only-if-cached
```

作为响应首部的话，可选值如下：

```
Cache-control: must-revalidate
Cache-control: no-cache
Cache-control: no-store
Cache-control: no-transform
Cache-control: public
Cache-control: private
Cache-control: proxy-revalidate
Cache-Control: max-age=<seconds>
Cache-control: s-maxage=<seconds>
```

Cache-Control 取值可以分为三类：

1. 指示可缓存性的指令：
    - public
      响应可以被任何对象（包括：发送请求的客户端，代理服务器，等等）缓存
    - private
      响应只能被单个用户缓存，不能作为共享缓存（即代理服务器不能缓存它）
    - no-cache
      在释放缓存副本之前，强制高速缓存将请求提交给原始服务器进行验证
    - no-store
      缓存不应存储有关客户端请求或服务器响应的任何内容
2. 指示到期时间的指令：
    - max-age
      缓存可以存活的时间，相对于请求而言
    - s-maxage
      类似于 max-age，仅用于共享缓存
    - max-stale
      表明客户端愿意接收一个已经过期的资源。 可选的设置一个时间(单位秒)，表示响应不能超过的过时时间
    - min-fresh
      表示客户端希望在指定的时间内获取最新的响应
3. 指示验证相关的指令：
    - must-revalidate
      缓存必须在使用之前验证旧资源的状态，并且不可使用过期资源
    - proxy-revalidate
      与 must-revalidate 作用相同，但它仅适用于共享缓存（例如代理），并被私有缓存忽略

### If-Modified-Since 和 Last-Modified

If-Modified-Since 是一个条件式请求首部，服务器只在所请求的资源在给定的日期时间之后对有更新才会将资源返回，状态码为 200。
如果请求的资源从那时起未经修改，那么返回一个不带 body 的 304 响应，并且在 Last-Modified 首部中会带有上次修改时间。
注意，If-Modified-Since 只可以用在 GET 或 HEAD 请求中。
Last-Modified 是一个响应首部字段，其中包含源服务器资源做出修改的日期和时间

浏览器第一次请求时，服务器响应中带有 `Last-Modified` 头部，指示最新修改时间；之后的请求中，浏览器都会以 `If-Modified-Since` 带上这个时间，让服务端确认该资源是否已经发生修改，返回`304`或者`200`, 从而浏览器决定是否使用缓存。

### ETag 和 If-None-Match

If-None-Match 是一个条件式请求首部，其值为 ETag 的值。
对于 GET 和 HEAD 请求方法来说，当且仅当服务器上没有任何资源的 ETag 属性值与这个首部中列出的相匹配的时候，服务器端会才返回所请求的资源，响应码为 200。

对于其他方法来说，当且仅当最终确认没有已存在的资源的 ETag 属性值与这个首部中所列出的相匹配的时候，才会对请求进行相应的处理
ETag 是 http1.1 提供的响应首部字段，是服务器资源的特定版本的标识符。

与`If-Modified-Since`和`Last-Modified`类似，第一次请求后，服务端返回 `ETag` 是一个`校验码`，作为该资源的标识；之后的请求中浏览器会以 `If-None-Match` 请求头询问该资源是否发生变化，服务器根据该这个校验码来判断是否发生命中缓存，从而返回不同的响应。
