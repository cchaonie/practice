本文主要讨论了浏览器中的存储机制。
最初，web 应用需要保存的是用户的会话状态、个性化信息，但是 http 协议是无状态的，因此这种需求是用 Cookies 来实现的。Cookies 的特点是由服务端生成，通过响应发送到浏览器，浏览器会把 cookies 存储在本地，接下来的每次请求，都会自动带上 Cookies 到服务器。后来 H5 提供了新的本地存储 API：WebStorage。WebStorage 可以理解成 Cookies 的增强版。

## Cookies

当服务端收到请求之后，可以在响应头添加 Set-Cookie 选项。
Set-Cookie 的值可以是以下名值对形式：
<cookie-name>=<cookie-value>。
除了自定义的名值对之外，cookie 还有如下可选的特殊指令：

1. Expires=<date>：cookie 的最长有效时间
2. Max-Age=<non-zero-digit>：在 cookie 失效之前需要经过的秒数
3. Domain=<domain-value>：指定 cookie 可以送达的主机名
4. Path=<path-value>：指定一个 URL 路径，这个路径必须出现在要请求的资源的路径中才可以发送 Cookie 首部
5. Secure：一个带有安全属性的 cookie 只有在请求使用 SSL 和 HTTPS 协议的时候才会被发送到服务器
6. HttpOnly：设置了 HttpOnly 属性的 cookie 不能使用 JavaScript 经由 Document.cookie 属性、XMLHttpRequest 和 Request APIs 进行访问，以防范跨站脚本攻击（XSS）
7. SameSite=<value>: 用于定义 cookie 如何跨域发送, 可选值是 Strict 或 Lax，默认值是 Strict。

Cookies 一旦设置后，就会在 HTTP 请求头的 Cookie 中，一起发送到服务端。即响应中的头部是 Set-Cookie，请求中的头部是 Cookie。

### Set-Cookie 的特殊指令的说明

1. 不指定 Expires 和 Max-Age 的 cookie 是会话期 cookie，会在浏览器关闭的时候自动删除。
   需要注意的是，部分浏览器提供了会话恢复功能，这种情况下即使关闭了浏览器，会话期 Cookie 也会被保留。
2. 指定了 Expires 和 Max-Age 的 cookie 是持久性 cookie，会在到达失效时间或最大存活时间后失效。需要注意的是，这里的时间是以客户端的时间相关。
3. Domain 和 Path 标识定义了 Cookie 的作用域：即 Cookie 应该发送给哪些 URL。
4. Secure 和 HttpOnly 则是着重于安全方面。

### 浏览器对 Cookie 的限制

1. cookie 的最大可以为 4KB。
2. 每个域名下面最多 50 个 cookie。
3. 总共最多 3000 个 cookie。

### Cookie 存在的问题

1. 通过监听未加密的网络窃取 cookies。可以通过使用 https 协议以及为 cookies 设置 Secure 属性来避免。
2. XSS(Cross-site scripting)跨站脚本。
3. CSRF(Cross-site request forgery)跨站请求伪造。
   攻击通过在授权用户访问的页面中包含链接或者脚本的方式工作。让已经登录的用户，把用户授权导入到第三方网站，利用用户的 cookies 向源网站发起请求。

## WebStorage

WebStorage 的作用是在于存储客户端数据在浏览器里，有两种类型的 WebStorage，localStorage 可以对应到持久型 Cookie，
sessionStorage 可以对应到会话型 Cookie。

#### WebStorage 与 Cookie 的不同

1. WebStorage 主要是用来在客户端存储数据，不一定要传输到服务端。Cookie 则会在请求头中一起发送到服务端。
2. WebStorage 的大小不同的浏览器设置不一样，但是都远大于 Cookie 的 4KB。
3. WebStorage 只能由客户端脚本访问，不能在服务端生成。

### WebStorage 的使用方法

WebStorage 通过在 window 对象上暴露了两个实例来访问，即 localStorage 本地存储和 sessionStorage 会话存储。
二者的区别主要上是作用范围和生命周期:

1. localStorage 中的数据在浏览器窗口关闭后仍然会存储在浏览器中，并且可以在同源域下、不同的浏览器窗口都可以访问到。
2. sessionStorage 中的数据在浏览器窗口关闭后就会清除了，不同的浏览器窗口中是无法互相访问 sessionStorage 中的数据。
   **注意：**WebStorage 中的值必须是字符串，如果不是字符串类型，就会自动类型转换成字符串。
