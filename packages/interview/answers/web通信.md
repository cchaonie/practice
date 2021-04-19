# web通信
1. postMessage
  contentWindow.postMessage()
2. MessageChannel
  1. service worker
  2. web worker

## 同源tab通信
1. localStorage. 当storage发生变化就会触发`storage`
2. window.open() 或者 iframe的方式，可以使用window.postMessage通信

## BroadcastChannel
指定 origin 下的任意 browsing context 来订阅它。它允许同源的不同浏览器窗口，Tab页，frame或者 iframe 下的不同文档之间相互通信。通过触发一个 message 事件，消息可以广播到所有监听了该频道的 BroadcastChannel 对象。