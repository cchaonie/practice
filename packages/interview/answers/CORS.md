# CORS
## 什么是跨域CORS
Cross-Origin Resource Sharing，即跨域资源共享。从安全的角度考虑，浏览器限制了从脚本内部发起跨域请求。
也就是说，部分HTML标签发起的资源请求未做限制(link、script、a、img...)。
由此也可以知道，跨域是浏览器的安全措施，与http请求是无关的。

## 什么时候会发生跨域
当请求资源的URL与当前脚本所处的URL不同时，就会发生跨域。
不同之处包括三个方面的不同（protocol协议，domain域名，port端口）。
举例说明：
在http://localhost:8080/index.js 这个文件中发起了一个请求，相应的URL为
1. http://www.baidu.com/path/to/resource 
2. ftp://localhost:8080/path/to/resource 
3. http://localhost:8081/path/to/resource 
这三个URL分别对应了三种不同的、会产生跨域请求的原因，域名不同、协议不同、端口不同。

需要注意的是，资源路径本身不会带来跨域。

## 跨域请求的类型
### 简单请求
简单请求(Simple requests)需同时满足的条件：
1. 请求方法只能是：GET HEAD POST
2. Fetch 规范定义了对 CORS 安全的首部字段集合，不得人为设置该集合之外的其他首部字段。该集合为：    
  1. Accept    
  2. Accept-Language    
  3. Content-Language    
  4. Content-Type （需要注意额外的限制）    
  5. DPR    
  6. Downlink    
  7. Save-Data    
  8. Viewport-Width    
  9. Width
3. Content-Type 的值仅限于下列三者之一：    
  1. text/plain    
  2. multipart/form-data    
  3. application/x-www-form-urlencoded
4. 请求中的任意XMLHttpRequestUpload 对象均没有注册任何事件监听器。XMLHttpRequestUpload 对象可以使用 XMLHttpRequest.upload 属性访问。
5. 请求中没有使用 ReadableStream 对象。

### 预检请求
对那些可能对服务器数据产生副作的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。

需预检的请求(Preflighted requests)要求必须首先使用 OPTIONS 方法发起一个预检请求到服务器，以获知服务器是否允许该实际请求。当请求满足下述任一条件时，即应首先发送预检请求：
1. 使用了下面任一 HTTP 方法：    
  1. PUT    
  2. DELETE    
  3. CONNECT    
  4. OPTIONS    
  5. TRACE
  6. PATCH
2. 人为设置了对 CORS 安全的首部字段集合之外的其他首部字段。
3. Content-Type 的值不属于下列之一:
  1. application/x-www-form-urlencoded
  2.    multipart/form-data
  3.    text/plain
4. 请求中的XMLHttpRequestUpload 对象注册了任意多个事件监听器。
5. 请求中使用了ReadableStream对象。

### 带权限的请求(Requests with credentials)
一般而言，浏览器可以通过http cookies和http认证信息发送身份凭证。
而对于会跨域的XMLHttpRequest 或 Fetch 请求，浏览器不会发送身份凭证信息。
如果一定要发送凭证信息，则需要设置XHR的withCredentials属性，或者fetch的credentials属性对于附带身份凭证的请求，
服务器不得设置 Access-Control-Allow-Origin 的值为`*`。

## 与跨域相关的请求头和响应头
### Request Headers
1. Origin
2. Access-Control-Request-Method
3. Access-Control-Request-Headers
### Response Headers
1. Access-Control-Allow-Origin
2. Access-Control-Expose-Headers
3. Access-Control-Max-Age：表明该响应的有效时间,在有效时间内，浏览器无须为同一请求再次发起预检请求。
4. Access-Control-Allow-Credentials
5. Access-Control-Allow-Methods
6. Access-Control-Allow-Headers

## 当跨域发生时，如何解决
1. proxy：通过配置代理服务器，使得请求与服务器同源，规避跨域问题
2. 使用相应的HTTP header，此方法需要服务端配合使用
3. jsonp：利用脚本文件可以跨域的特性，动态生成script标签，使用src属性发起跨域请求，同时将需要执行的函数一起发送到服务端，服务端返回
`callback(data)`字符串后，由浏览器执行该字符串脚本，得到想要的效果
4. 图片探测，使用图片向服务器单向通讯发送数据，一般用来收集用户行为数据，根据`img.onload`和`img.onerror`感知结果
