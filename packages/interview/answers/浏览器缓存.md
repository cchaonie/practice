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
    2. Pragma和Cache-Control
2. 协商缓存
    1. Last-Modified和If-Modified-Since
    2. Etag和If-None-Match

### 与缓存相关的HTTP headers
#### Pragma
Pragma是http 1.0中提供的http通用首部字段，但是作为响应首部字段时的效果没有被定义，因此一般仅用作请求首部。
`Pragma: no-cache`的效果是：强制要求在返回缓存的版本之前将请求提交到源服务器进行验证。
这个首部仅仅用来向后兼容只支持http 1.0客户端才使用。
#### Expires
Expires是**响应首部**。
`Expires: <http-date>`的效果是响应的内容在此时间过后就会过期。
如果Cache-Control响应首部设置了`max-age`或`s-max-age`指令，那么Expires首部就会失效。
使用Expires需要注意两点：
1. 服务端的时间与可缓存的时间需要同步
2. 服务端的资源更新后需要更新Expires的时间
#### Cache-Control
Cache-Control是http 1.1提供的**通用首部**字段，请求和响应中都可以设置。
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
Cache-Control取值可以分为三类：
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
    类似于max-age，仅用于共享缓存
    - max-stale
    表明客户端愿意接收一个已经过期的资源。 可选的设置一个时间(单位秒)，表示响应不能超过的过时时间
    - min-fresh
    表示客户端希望在指定的时间内获取最新的响应
3. 指示验证相关的指令：
    - must-revalidate
    缓存必须在使用之前验证旧资源的状态，并且不可使用过期资源
    - proxy-revalidate
    与must-revalidate作用相同，但它仅适用于共享缓存（例如代理），并被私有缓存忽略
### If-Modified-Since和Last-Modified
If-Modified-Since是一个条件式请求首部，服务器只在所请求的资源在给定的日期时间之后对有更新才会将资源返回，状态码为200。
如果请求的资源从那时起未经修改，那么返回一个不带body的304响应，并且在Last-Modified首部中会带有上次修改时间。
注意，If-Modified-Since只可以用在GET或HEAD请求中。
Last-Modified是一个响应首部字段，其中包含源服务器资源做出修改的日期和时间

浏览器第一次请求时，服务器响应中带有 `Last-Modified` 头部，指示最新修改时间；之后的请求中，浏览器都会以 `If-Modified-Since` 带上这个时间，让服务端确认该资源是否已经发生修改，返回`304`或者`200`, 从而浏览器决定是否使用缓存。

### ETag和If-None-Match
If-None-Match是一个条件式请求首部，其值为ETag的值。
对于GET和HEAD请求方法来说，当且仅当服务器上没有任何资源的ETag属性值与这个首部中列出的相匹配的时候，服务器端会才返回所请求的资源，响应码为200。

对于其他方法来说，当且仅当最终确认没有已存在的资源的ETag属性值与这个首部中所列出的相匹配的时候，才会对请求进行相应的处理
ETag是http1.1提供的响应首部字段，是服务器资源的特定版本的标识符。

与`If-Modified-Since`和`Last-Modified`类似，第一次请求后，服务端返回 `ETag` 是一个`校验码`，作为该资源的标识；之后的请求中浏览器会以 `If-None-Match` 请求头询问该资源是否发生变化，服务器根据该这个校验码来判断是否发生命中缓存，从而返回不同的响应。
