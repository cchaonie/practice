function intervalFn(fn, delay) {
  return setInterval(fn, delay);
}

function timeoutFakeFn(fn, delay) {
  if (typeof fn !== 'function') throw new Error("fn is not function")
  timeoutFakeFn.timeId = setTimeout(() => {
    fn();
    timeoutFakeFn(...arguments);
  }, delay)
}

const func = () => console.log(111);

timeoutFakeFn(func, 2000);

setTimeout(() => clearTimeout(timeoutFakeFn.timeId), 11000)