# Flexbox

## flex 属性

flex: flex-grow flex-shrink flex-basis
默认值：0 1 auto
flex-basis: auto 意味着如果制定了`width` 或者 `height`则使用，否则使用`content`作为初始尺寸。
如果设置 flex-basis: 0px/ 0%; 则表示初始尺寸全部为 0，由第二阶段 flex-grow 来分配空间
初始尺寸处理完毕后：

1. 如果有剩余空间，则按照`flex-grow`的比例分配给每个 item；
2. 如果空间不足，则要根据`flex-shrink`计算每个 item 应当收缩的尺寸。若有两个 item，flex-shrink 是 2，3，则计算规则如下：
3. item1 的收缩尺寸：(2 _ w1) / (2 _ w1 + 3 _ w2) _ 不足空间
4. item2 的收缩尺寸：(3 _ w2) / (2 _ w1 + 3 _ w2) _ 不足空间
