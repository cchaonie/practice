function bind(fn, thisObj) {
  return function (...args) {
    return fn.apply(thisObj, args);
  };
}
