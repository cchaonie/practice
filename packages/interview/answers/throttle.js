/**
 * 节流函数：触发一次之后，delay之内都不会再触发
 * @param {*} fn
 * @param {*} delay
 * @returns
 */
function throttle(fn, delay) {
  let lastCall = +new Date();
  let restTime = delay;
  return function (...args) {
    const now = +new Date();
    if (restTime <= now - lastCall) {
      fn.call(null, args);
      restTime = delay;
    } else {
      restTime -= now - lastCall;
    }
    lastCall = now;
  };
}
