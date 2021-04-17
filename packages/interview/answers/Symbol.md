# Symbol

symbol 是 JS 的一种基本数据类型，由函数`Symbol(description?: string)`返回，不支持`new Symbol()`语法。
每次调用`Symbol()`的返回值都是唯一的，即：

```js
Symbol() === Symbol(); // false
```

可以使用 Object 返回 symbol 的包装对象，类似`Number(1)`

```js
typeof symbol;// "symbol"
s = Symbol("foo");
// +s => TypeError
String(s) === "Symbol(foo)"; // true

// not enumerate, not returned by Object.getOwnPropertyNames(), can retrive by:
Object.getOwnPropertySymbols();
```

## 静态函数

| name                  | 作用                                                        |
| --------------------- | ----------------------------------------------------------- |
| Symbol.for(key)       | 在全局 symbol 注册表中查找一个 symbol，没找到则创建一个新的 |
| Symbol.keyFor(symbol) | 找 symbol 的 key                                            |
