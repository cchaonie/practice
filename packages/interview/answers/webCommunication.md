# web 通信

1. `targetWindow.postMessage(message, targetOrigin, [transfer])`
    1. `targetWindow` 可以有以下来源：
        1. `window.open` (to spawn a new window and then reference it),
        2. `window.opener` (to reference the window that spawned this one),
        3. `HTMLIFrameElement.contentWindow` (to reference an embedded <iframe> from its parent window),
        4. `window.parent` (to reference the parent window from within an embedded <iframe>), or
        5. `window.frames + an index value` (named or numeric).
   2. `message` 即传递给`targetWindow`的消息，可以是任何对象，即不需要手动序列化
   3. `targetOrigin` 应该在的origin，如果不在的化消息不会发送成功
   4. 一个`Transferable`对象，一旦传递过去之后，在当前页面即不可用，在这里一般是 `MessageChannel` 实例
2. MessageChannel
   1. channel.port1.postMessage(message, transferableList)
3. service worker
4. web worker

## 同源 tab 通信

1. localStorage. 当 storage 发生变化就会触发`storage`
2. window.open() 或者 iframe 的方式，可以使用 window.postMessage 通信

## BroadcastChannel

指定 origin 下的任意 browsing context 来订阅它。它允许同源的不同浏览器窗口，Tab 页，frame 或者 iframe 下的不同文档之间相互通信。通过触发一个 message 事件，消息可以广播到所有监听了该频道的 BroadcastChannel 对象。
