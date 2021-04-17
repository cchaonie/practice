function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
/**
 * 深拷贝，使用JSON.stringify 和 JSON.parse会存在的问题
 * 1. 正则、函数、Symbol无法复制（正则变成空对象，函数和Symbol直接忽略）
 * 2. 循环引用报错
 * 3. 重复引用会重复复制
 * @param {*} source
 * @param {*} target
 * @returns
 */
function deepClone(target, cloned) {
  if (!isObject(target)) return target;
  const clonedObjects = cloned || new WeakMap();
  let value = clonedObjects.get(target);
  if (value) return value;
  let result;
  if (Array.isArray(target)) {
    result = new Array(target.length);
  } else {
    result = {};
  }
  clonedObjects.set(target, result);
  for (const key in target) {
    result[key] = deepClone(target[key], clonedObjects);
  }
  return result;
}

const foo = {
  a: 1,
  b: {
    a: 2,
    b: [1, 2],
  },
};

const zoo = {
  f: foo,
}

foo.z = zoo;

console.log(deepClone(foo));
