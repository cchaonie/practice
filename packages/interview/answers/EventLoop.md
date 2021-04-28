# Event Loop

## 什么是 Event Loop

JS 单线程模型，为了防止某个任务执行时间过长，导致其他任务无法执行，因此引入事件循环。
在事件循环中，所有的任务被分成同步和异步。同步任务依次执行，异步任务则放入任务队列，一旦同步任务执行完毕，就开始循环执行任务队列里的任务。
而异步任务根据优先级被放入两个队列，宏任务队列和微任务队列。主线程中同步任务执行完毕，首先会检查微任务队列，直到微任务队列为空，才会检查宏任务队列

## browser side

### 宏任务

1. script
2. setTimeout
3. setInterval
4. I/O
5. postMessage
6. messageChannel

### 微任务

7. Promise.then/catch/finally
    1. 需要注意 then 的回调如果不是 function，则会直接执行
8. await 之后的代码
9. MutationObserver 的回调

### Summary
1. 事件循环不一定每轮都伴随着重渲染，但是如果有微任务，一定会伴随着微任务执行。
2. 决定浏览器视图是否渲染的因素很多，浏览器是非常聪明的。
3. requestAnimationFrame在重新渲染屏幕之前执行，非常适合用来做动画。
4. requestIdleCallback在渲染屏幕之后执行，并且是否有空执行要看浏览器的调度，如果你一定要它在某个时间内执行，请使用 timeout参数。
5. resize和scroll事件其实自带节流，它只在 Event Loop 的渲染阶段去派发事件到 EventTarget 上。

## node side

事件循环分为多个阶段，每个阶段都有一个队列。当一个阶段的**所有任务都执行完毕**或者**达到最大执行限制**之后，才会进入下个阶段

1. timers
    1. setTimeout/setInterval
2. pending callbacks
    1. system related callbacks such as types of TCP errors
3. idle, prepare
    1. 仅供内部使用
4. **poll(轮询)**
    1. 执行 IO 回调
    2. 检查 setTimeout 的回调是否要加入到 timers 阶段
5. check
    1. setImmediate。当 poll 阶段空闲时，会检查是否有 setImmediate 的任务，如果有会马上执行
6. close callback
    1. 关闭连接的回调，如：socket.on('close', callback)

**process.nextTick()会在进入任何一个阶段执行**
