# JSON
无论是序列化还是反序列化，其过程都是深度优先的
## JSON.parse(text[, reviver])
1. text: 要解析的字符串
2. reviver：转换函数

## JSON.stringify(value[, replacer[, space]])
1. value 是会被转换的值
  1. 尝试调用toJSON()
  2. 基本类型的包装对象会转换成原始值
  3. undefined、函数、Symbol会被忽略
  4. 循环引用和`BigInt`报TypeError
  5. Date会转换成string
  6. NaN和Infinity及null都会作为null
  7. 其他类型的对象仅序列化可枚举属性
2. replacer：
  1. function(k, v): 所有的属性均会以key/value的形式调用这个函数;返回undefined则去除该属性
  2. array：数组中所列属性名才会被序列化
3. space
  1. 控制字符间距