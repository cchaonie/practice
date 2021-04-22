# ES6 和 ES5 的面向对象和继承

## ES5 的构造函数

### 概述

1. JS 中的继承与传统的面向对象的继承不同，是**基于原型**的
2. 在 ES5 中，所有的函数都有两种调用方式：
   1. 作为普通函数调用
   2. 作为构造函数调用
3. 在 ES5 中，所有的函数默认都有一个`prototype`属性，指向一个对象
4. 在 ES5 中，函数的声明会提升至当前上下文的顶部
5. 当使用 new 去调用一个函数时，作用过程如下：
   1. 创建一个空的对象
   2. 将这个空对象的原型属性 `__proto__`指向该函数的 `prototype` 属性指向的对象
   3. 将 `this` 指向这个对象
   4. 执行函数体的逻辑
   5. **若函数返回基本数据类型，则返回值变成新创建的对象；若函数返回一个对象，则丢弃新创建的对象，返回原对象**

## ES6 的类

### 概述

1. ES6 中的类（class）本质上依旧是一个函数（function）
2. ES6 中新增了箭头函数，与 ES5 中的函数有区别：
   1. 箭头函数没有自己的 this，其中的 this 是所在环境中的 this
   2. 箭头函数不能被当做构造函数调用，因此也没有 `prototype` 属性
3. ES6 中的类存在**TDZ（暂时性死区）**现象, 即在定义`class`之前不能使用
4. ES6 中类的内部默认开启严格模式—— `use strict;`
5. ES6 中类的**所有方法**默认都是**不可枚举**的，并且不能作为构造函数调用
6. ES6 中的类只能使用 `new` 调用，否则会抛出异常
7. ES6 位 `new` 添加了 `target` 属性，当函数被当做构造函数调用时，`new.target` 指向当前函数，否则为`undefined`
8. 在类的外部可以重命名类，但是在类的内部不可以

### 实现

```js
/** es6 class */
// 定义class
class Foo {
  // 直接在类中定义实例属性
  fooo = "fooo";
  constructor() {
    // 在构造函数中定义实例属性
    this.foo = "foo";
    // 在构造函数中定义实例方法
    this.bar = function () {
      console.log("bar");
    };
  }
  // 此方法会定义在 Foo.prototype 上，被所有的实例共享
  baz() {
    console.log("baz");
  }
  // 此方法会定义在 Foo 上，即函数对象本身的属性
  static bazz() {
    console.log("bazz");
  }
}
```

## ES5 中的继承

```javascript
function Super(name) {
  this.name = name;
}
Super.prototype.sayName = function () {
  console.log(this.name);
};
// 原型链
function Sub(name, age) {
  this.name = name;
  this.age = age;
}
Sub.prototype = new Super();
// 缺陷：子类型实例会共享原型对象的引用类型

// 借用构造函数
function Sub(name, age) {
  Super.call(this, name);
  this.age = age;
}
// 缺陷：原型链丢失

// 组合继承
function Sub(name, age) {
  Super.call(this, name);
  this.age = age;
}
Sub.prototype = new Super();
// 缺陷：Super会执行两次

// 原型继承
function extend(prototype) {
  const subInstance = Object.create(prototype);
  return subInstance;
}
// 缺陷： 实质是关联两个对象，并不涉及构造函数

// 寄生式继承
function extend(prototype) {
  const subInstance = Object.create(prototype);
  subInstance.sayName = function () {
    console.log(this.name);
  };
  return subInstance;
}
// 缺陷： 与原型继承类似

// 组合寄生式继承
function Sub(name, age) {
  Super.call(this, name);
  this.age = age;
}
Sub.prototype = Object.create(Super.prototype);
// 相对而言目前是最完美的方式
```
