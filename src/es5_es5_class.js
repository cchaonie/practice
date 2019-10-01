/** es5 class  */
// 定义构造函数
function Person(name) {
  this.name = name;
  this.sayHello = function(name) {
    console.log("hello " + name);
  }
}

// 修改原型对象
Person.prototype.family = "Stark";
Person.prototype.fight = function(target) {
  console.log('fight with ' + target);
}

// 设置函数对象的属性
Person.foo = 'foo';
Person.bar = function() {
  console.log('barbarbar');
}

/** es6 class */

// 定义class
class Foo{
  // 直接在类中定义实例属性
  fooo = 'fooo'

  constructor() {
    // 在构造函数中定义实例属性
    this.foo = 'foo';
    // 在构造函数中定义实例方法
    this.bar = function() {
      console.log('bar')
    }
  }

  // 此方法会定义在 Foo.prototype 上，被所有的实例共享
  baz() {
    console.log('baz')
  }
  
  // 此方法会定义在 Foo 上，即函数对象本身的属性
  static bazz() {
    console.log('bazz')
  }
}

