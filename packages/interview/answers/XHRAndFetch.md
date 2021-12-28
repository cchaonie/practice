## XMLHttpRequest(ajax)

### 用法

```javascript
var xhr = new XMLHttpRequest();
xhr.open("GET", url);
xhr.onreadystatechange = function () {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    try {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        console.log(xhr.responseText);
        // xhr.getResponseHeader("ResponseHeader")
        // xhr.getAllResponseHeaders();
      } else {
        console.log("There was a problem with the request.");
      }
    } catch (e) {
      // handle error
    }
  }
};
xhr.setRequestHeader("MyHeader", "MyValue");
xhr.timeout = 1000; // 超时后onreadystatuschange也会执行
xhr.ontimeout = () => {
  console.log("Request did not return in a second");
};
// xhr.overrideMimeType("text/xml");
xhr.send(null);
```

### 语法

![f23e86ef3825a5ff541e99a9909f6ff9.png](../images/XHR.png)

1. open(method, url[, async[, user[, password]]])初始化一个连接
2. send(body)

## Fetch API

Fetch API 提供了一个获取资源的接口，类似于 XMLHttpRequest。
Fetch API 中最基础的的一个接口是`fetch()`:

```javascript
let url = "http://example.com";
fetch(url)
  .then((res) => res.json())
  .catch((error) => console.log(error));
```

除了提供了`fetch()`这个函数，Fetch API 还定义了相应的`Request`和`Response`

### API 语法

```javascript
Promise<Response> fetch(input[, init]);
```

#### 参数

- #### `input`
  定义要获取的资源,可以是：

1. 字符串，包含要获取资源的 URL
2. `Request`对象

- #### `init`
  请求的配置项，可选参数如下:

1. `method`: 请求使用的方法，如`GET`、`POST`。
2. `headers`: 请求的头信息，形式为`Headers`的对象或包含`ByteString`值的对象字面量。
3. `body`: 请求的 body 信息,可能是一个`Blob`、`BufferSource`、`FormData`、`URLSearchParams`或者`USVString`对象。
4. `mode`: 请求的模式，如`cors`、`no-cors`或者`same-origin`。
5. `credentials`: 请求的`credentials`，如 `omit`、`same-origin`或者`include`。为了在当前域名内自动发送`cookie`，必须提供这个选项。
6. `cache`: 请求的`cache`模式: `default`、`no-store`、`reload`、`no-cache`、`force-cache`或者`only-if-cached`。
7. `redirect`: 可用的`redirect`模式: `follow`(自动重定向),`error`(如果产生重定向将自动终止并且抛出一个错误), 或者`manual`(手动处理重定向)。
8. `referrer`: 一个`USVString`可以是`no-referrer`、`client`或一个`URL`。默认是 `client`。
9. `singal`: 传入`AbortController`的实例可以取消请求，`(new AbortController()).signal`，执行`controller.abort()`

#### 返回值

`Promise`,`resolve`时回传`Response`对象。

#### 异常

- `AbortError`：请求被取消
- `TypeError`: 如果 URL 中有用户权限，例如：`http://user:password@example.com`

## 与`ajax()`的不同

- 当服务端返回 404 或 500 时，`fetch()`返回的`Promise`不会`reject`，而是会`resolve`,但是`response.ok`的值会变成`false`。当 response 的状态码是`2XX`时，`response.ok`的值会是`true`。因此，在对 response 进行处理之前，需要先检查`response.ok`。
- 默认情况下，`fetch()`发送请求时不会带上`cookies`。要发送`cookies`，必须设置`credentials`选项，即第二个参数中的`{credentials: 'include'}`。

## 为什么有了 Fetch API

要回答这个问题，首先需要思考的是，没有 Fetch API 时用的是什么——Ajax，即对 XMLHttpRequest 的封装。
一般会这样使用 XMLHttpRequest:

```javascript
var xhr = new XMLHttpRequest();
xhr.open("GET", url);
xhr.onreadystatechange = function () {
  if (this.readyState === XMLHttpRequest.DONE) {
    if (this.status === 200) {
      console.log(this.responseText);
    } else {
      console.log("There was a problem with the request.");
    }
  }
};
xhr.send(null);
```

或者使用 jquery:

```javascript
$.ajax({
  url: url,
  method: "GET",
  success: function (data) {
    console.log(data);
  },
  error: function (error) {
    console.log(error);
  },
});
```

而使用 fetch()则会是这样:

```javascript
fetch(url, { method: "GET" })
  .then(function (res) {
    console.log(res.json());
  })
  .catch(function (error) {
    console.log(error);
  });
```

从以上示例代码中可以很直观的看出，fetchAPI 至少有以下几个优点:

1. 代码简洁直观。
2. 可以链式调用。

### 总结

使用 Promise API 可以避免“回调地狱”。此外，fetch API 对请求和响应都作了规范，使得在配置 Request 以及消费 Response 时使用的 API 更加直观。原生的 XMLHttpRequest 以及 jquery 都把所有的配置项揉合在一起，配置起来十分不方便。
当然，Fetch API 也有缺陷，不支持取消请求。一旦发起，不能中断，也不会超时，只能等待被 resolve 或 reject。
另外，目前 fetchAPI 还存在部分兼容性的问题，要在生产环境中使用的话，需要使用 ployfill。
