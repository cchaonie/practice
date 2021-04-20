本文主要讨论了浏览器中的存储机制。
最初，web应用需要保存的是用户的会话状态、个性化信息，但是http协议是无状态的，因此这种需求是用Cookies来实现的。Cookies的特点是由服务端生成，通过响应发送到浏览器，浏览器会把cookies存储在本地，接下来的每次请求，都会自动带上Cookies到服务器。后来H5提供了新的本地存储API：WebStorage。WebStorage可以理解成Cookies的增强版。

## Cookies
当服务端收到请求之后，可以在响应头添加Set-Cookie选项。
Set-Cookie的值可以是以下名值对形式：
<cookie-name>=<cookie-value>。
除了自定义的名值对之外，cookie还有如下可选的特殊指令：

1. Expires=<date>：cookie 的最长有效时间
2. Max-Age=<non-zero-digit>：在 cookie 失效之前需要经过的秒数
3. Domain=<domain-value>：指定 cookie 可以送达的主机名
4. Path=<path-value>：指定一个 URL 路径，这个路径必须出现在要请求的资源的路径中才可以发送 Cookie 首部
5. Secure：一个带有安全属性的 cookie 只有在请求使用SSL和HTTPS协议的时候才会被发送到服务器
6. HttpOnly：设置了 HttpOnly 属性的 cookie 不能使用 JavaScript 经由Document.cookie 属性、XMLHttpRequest和 Request APIs 进行访问，以防范跨站脚本攻击（XSS）
7. SameSite=<value>: 用于定义cookie如何跨域发送, 可选值是Strict或Lax，默认值是Strict。

Cookies一旦设置后，就会在HTTP请求头的 Cookie 中，一起发送到服务端。即响应中的头部是 Set-Cookie，请求中的头部是 Cookie。

### Set-Cookie的特殊指令的说明
1. 不指定Expires和Max-Age的cookie是会话期cookie，会在浏览器关闭的时候自动删除。
需要注意的是，部分浏览器提供了会话恢复功能，这种情况下即使关闭了浏览器，会话期Cookie也会被保留。
2. 指定了Expires和Max-Age的cookie是持久性cookie，会在到达失效时间或最大存活时间后失效。需要注意的是，这里的时间是以客户端的时间相关。
3. Domain和Path标识定义了Cookie的作用域：即Cookie应该发送给哪些URL。
4. Secure和HttpOnly则是着重于安全方面。

### 浏览器对Cookie的限制
1. cookie的最大可以为4KB。
2. 每个域名下面最多50个cookie。
3. 总共最多3000个cookie。

### Cookie存在的问题
1. 通过监听未加密的网络窃取cookies。可以通过使用https协议以及为cookies设置Secure属性来避免。
2. XSS(Cross-site scripting)跨站脚本。
3. CSRF(Cross-site request forgery)跨站请求伪造。
攻击通过在授权用户访问的页面中包含链接或者脚本的方式工作。让已经登录的用户，把用户授权导入到第三方网站，利用用户的cookies向源网站发起请求。

## WebStorage
WebStorage的作用是在于存储客户端数据在浏览器里，有两种类型的WebStorage，localStorage可以对应到持久型Cookie，
sessionStorage可以对应到会话型Cookie。

#### WebStorage与Cookie的不同
1. WebStorage主要是用来在客户端存储数据，不一定要传输到服务端。Cookie则会在请求头中一起发送到服务端。
2. WebStorage的大小不同的浏览器设置不一样，但是都远大于Cookie的4KB。
3. WebStorage只能由客户端脚本访问，不能在服务端生成。

### WebStorage的使用方法
WebStorage通过在window对象上暴露了两个实例来访问，即localStorage本地存储和sessionStorage会话存储。
二者的区别主要上是作用范围和生命周期:
1. localStorage中的数据在浏览器窗口关闭后仍然会存储在浏览器中，并且可以在同源域下、不同的浏览器窗口都可以访问到。
2. sessionStorage中的数据在浏览器窗口关闭后就会清除了，不同的浏览器窗口中是无法互相访问sessionStorage中的数据。
注意：WebStorage中的值必须是字符串，如果不是字符串类型，就会自动类型转换成字符串。