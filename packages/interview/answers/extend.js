function Super(name) {
    this.name = name;
}
Super.prototype.sayName = function(){
    console.log(this.name);
}
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
    subInstance.sayName = function() {
        console.log(this.name);
    }
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

// class CustomClass {

// }

const CustomClass = class {}

/**
 * 特点：
 * 1. 自动 use strict
 * 2. 不能像function一样提升
 * 3. 块作用域
 * 4. new.target 指向被当作构造函数时调用的函数，否则为undefined
 */


