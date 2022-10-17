# Containing Block 包含块

包含块的作用是用来作为计算某些属性的百分比值的基数

1. `margin` `padding` `width` `height`
2. absolute fixed 的 offset

## 识别包含块

包含块完全取决于目标元素的 position 属性:

1. static relative sticky => **content box** of the nearest ancestor element that is
   1. a block container
   2. 建立了 BFC
2. absolute => **padding box** of the nearest ancestor whose position is not static
3. fixed => viewport(连续媒体) or page area(分页媒体)
4. absolute and fixed 也可由 **padding box** of the nearest ancestor that has following:
   1. transform 和 perspective 的值 **not none**
   2. will-change 的值是 transform 或 perspective
   3. filter 的值 not none 和 will-change
   4. contain 的值是 paint

## 计算过程

1. 基于 containing block 的 width 计算的属性
   1. left
   2. right
   3. width
   4. **padding**
   5. **margin**
2. 基于 containing block 的 height 计算的属性
   1. height
   2. top
   3. bottom
