# Flexbox
## flex属性
flex: flex-grow flex-shrink flex-basis
默认值：0 1 auto
flex-basis: auto意味着如果制定了`width` 或者 `height`则使用，否则使用`content`作为初始尺寸。
如果设置flex-basis: 0px/ 0%; 则表示初始尺寸全部为0，由第二阶段flex-grow来分配空间
初始尺寸处理完毕后：
1. 如果有剩余空间，则按照`flex-grow`的比例分配给每个item；
2. 如果空间不足，则要根据`flex-shrink`计算每个item应当收缩的尺寸。若有两个item，flex-shrink是2，3，则计算规则如下：
  1. item1的收缩尺寸：(2 * w1) / (2 * w1 + 3 * w2) * 不足空间
  2. item2的收缩尺寸：(3 * w2) / (2 * w1 + 3 * w2) * 不足空间