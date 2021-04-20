# 富文本编辑器
富文本编辑器有两个主要功能：
1. 用户可以实时编辑页面内容
2. 用户对编辑内容可以自行设置样式

实现页面内容可编辑主要有两种方式：
1. 在页面中内嵌iframe, 并设置`contentWindow.designMode = "on"`
2. 使用div元素，并设置`contenteditable="true"`

通过`document.execCommand()`可以实时通过执行命令的方式改变页面内容
通过`contentWindwo.getSelection()`可以获取用户在iframe中选中的文本内容