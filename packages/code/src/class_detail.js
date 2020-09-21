class A {
  constructor(name) {
    this.name = name;
  }

  say() {
    console.log(`my name is ${this.name}`)
  }
}

class B extends A {
  constructor(name, age) {
    super(name);
    this.age = age;
  }

  show() {
    console.log(`my age is ${this.age}`)
  }
}

const a = new A('tom');
const b = new B('jerry', 1);
