function parent() {
  return () => {
    console.log(this.a);
  }
}

a = 0;

let obj1 = {
  a: 1
}

let obj2 = {
  a: 2
}

parent()();

parent.call(obj1)();

parent.call(obj2)();