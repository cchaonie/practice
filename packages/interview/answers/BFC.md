# BFC 块格式化上下文

## FC 格式化上下文

具体可分为 BFC IFC FFC GFC

块格式化上下文是页面中的一块独立的渲染区域，这个区域内部的元素有一套渲染规则
可以形成块格式化上下文的属性有：

1. display: inline-block/table-cell/inline-flex/flex
2. overflow: auto/hidden/scroll
3. float: left/right
4. position: absolute/fixed/sticky
5. 根元素

盒子模型就是块格式化上下文内部盒子的渲染规则。
而行格式化上下文就是在一行内不同的盒子如何渲染。如水平方向上的 padding margin border 会影响行盒子与相邻元素之间的距离，而垂直方向的这些属性则无法改变相邻两行之间的距离

## 作用
1. 清除浮动，防止浮动容器高度塌陷
2. 防止垂直方向上的margin重叠
