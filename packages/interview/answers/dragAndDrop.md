### react drag & drop
与clipboard类似，dragEvent也有一个DataTransfer类型的属性`dataTransfer`。当未元素设置`draggable`时，就可以在`dragStart`事件上通过`dataTransfer.setData("text/plain", "I am drag content")`设置drag的数据

需要重点注意drag&drop事件的触发，要使用drag&drop，整个流程如下：
1. 为需要drag的元素设置`draggable`
2. 监听draggable元素的`dragstart`事件，在该监听器中使用`event.dataTransfer.setData(mimeType, data)`设置传输的数据，并设置`dataTransfer.allowEffect`，可选值为：
    1. copy
    2. move
    3. link
    4. copyLink
    5. copyMove
    6. linkMove
    4. none
    5. all
    6. uninitialized(default, same as all)
3. 监听drag target的`dragenter` `dragover` `drop`事件，并在`onDragEnter`和`onDragOver`中调用`event.preventDefault()`停止默认行为，从而识别当前元素为drag target，此时方可出发onDrop事件