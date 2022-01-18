# 前端安全

## XSS 跨站脚本

### 分类

| 类型   | 特点                                                                                             |
| ------ | ------------------------------------------------------------------------------------------------ |
| 存储型 | 在本站中将恶意代码提交后存储到服务器，后续请求的页面会包含恶意代码，浏览器渲染页面后执行恶意代码 |
| 反射型 | 构造恶意 URL，服务器生成的页面中包含恶意 URL 中的代码，浏览器渲染页面后执行恶意代码              |
| DOM 型 | 构造恶意 URL，前端 js 会在使用到 URL 中的数据，从而执行恶意代码                                  |

前两者属于服务器端的安全漏洞，即服务端在 ssr 的时候没有做处理；
后者属于前端漏洞，在使用数据前没有做合适的检查

### 防范

1. 转义：在任何将用户数据填充到页面之前，都需要做合适的转义
2. 前端渲染：使用标准 DOMAPI 生成页面内容，可以减少插入 HTML 的风险
3. 对于 DOM 型，前端需要注意谨慎使用：

   1. `innerHTML` `outerHTML`
   2. react 的`dangerouslySetInnerHTML`
   3. 内联事件监听器
   4. a 标签的 href、location
   5. setTimout setInterval 等函数

4. Content Security Policy
5. cookie 的 http-only
6. 验证码等

## CSRF 跨站请求伪造

跨站请求伪造的发生原因在于：

1. 请求发送到与 cookie 的同源站点，cookie 会被自动带上
2. cookie 被用作识别用户身份的唯一手段

攻击一般流程如下：

1. 用户登录目标网站后，cookie 存储到浏览器
2. 用户进入第三网网站，第三方网站向目标网站发送请求，此时会带上用户的 cookie 信息
3. 目标网站服务器收到请求后，仅验证了 cookie，从而执行了恶意操作

## 防范

1. 一般 csrf 都是跨站请求，因此可以通过识别跨站请求来识别恶意攻击。如使用`Origin` `referer`的头部
2. 不完全依赖 cookie 做用户认证
3. 可替代方案是使用随机 token。服务端下发 token，后续请求需要带上 token 才能成功交互
4. 双重 cookie。在请求头中也要带上 cookie，因为 csrf 一般无法直接读取 cookie