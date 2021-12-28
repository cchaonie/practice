## react 剪贴板

react 支持 onCopy onCut onPaste 事件。clipboardEvent 有一个属性 clipboardData, 其类型是 DataTransfer，包含了 onCopy 和 onCut 的数据

## react drag & drop

与 clipboard 类似，dragEvent 也有一个 DataTransfer 类型的属性`dataTransfer`。当未元素设置`draggable`时，就可以在`dragStart`事件上通过`dataTransfer.setData("text/plain", "I am drag content")`设置 drag 的数据

需要重点注意 drag&drop 事件的触发，要使用 drag&drop，整个流程如下：

1. 为需要 drag 的元素设置`draggable`
2. 监听 draggable 元素的`dragstart`事件，在该监听器中使用`event.dataTransfer.setData(mimeType, data)`设置传输的数据，并设置`dataTransfer.allowEffect`，可选值为：
   1. copy
   2. move
   3. link
   4. copyLink
   5. copyMove
   6. linkMove
   7. none
   8. all
   9. uninitialized(default, same as all)
3. 监听 drag target 的`dragenter` `dragover` `drop`事件，并在`onDragEnter`和`onDragOver`中调用`event.preventDefault()`停止默认行为，从而识别当前元素为 drag target，此时方可出发 onDrop 事件
