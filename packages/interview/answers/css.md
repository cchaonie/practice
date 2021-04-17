
## 水平居中

1. 固定宽度＋ margin:auto
2. 绝对定位＋ translateX(-50%)
3. flex 布局
4. inline-block 的父元素设置 text-align:center

## 垂直居中

1. 绝对定位＋ translateY
2. flex
3. 父元素 display:table-cell; vertical-align:middle，子元素 inline-block

## 三角形

```css
.triangle {
  height: 0;
  width: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 60px solid red;
}
```
