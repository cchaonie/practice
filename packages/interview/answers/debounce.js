/**
 * 防抖：触发操作结束之后，经过 delay 才会执行目标函数
 * @param {*} fn 
 * @param {*} delay 
 * @returns 
 */
function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      clearTimeout(timer);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  };
}

const myFn = () => console.log('hello debounce');

const debounced = debounce(myFn);
const cancel = debounced();

// cancel();
