// debounce, 防抖，使高频函数 n 秒后发生一次
function debounce(fn, time) {
  if (typeof fn !== "function") {
    throw new Error('debunce 只能对函数节流')
  }
  let timeoutId = null;
  return function() {
    // 取消上一次的延迟
    clearTimeout(timeoutId);
    // 重新开始延迟
    timeoutId = setTimeout(() => fn.apply(this, arguments), time);
  }
}

//throttle，节流，使高频函数执行后 n 秒才能再次执行
function throttle(fn, time) {
  let canRun = true;
  return function() {
    if (!canRun){
      return;
    }
    canRun = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      canRun = true;
    }, time);
  }
}

function throttleWithTimestamp(fn, time) {
  let previous = 0;
  return function() {
    const now = new Date().getTime();
    if (time < now - previous) {
      fn.apply(this, arguments);
      previous = now;
    }
  }
}

const myfunc = function(name, age) {
  console.log(`hello ${name} ${age}`)
}

const foo = {
  debouncedFunc: debounce(myfunc, 3000),
  throttledFunc: throttle(myfunc, 10),
  throttledWithTimestampFunc: throttleWithTimestamp(myfunc, 10)
}

for (let i = 0; i < 10000000; i++) {
  // foo.debouncedFunc('tom', 20);
  // foo.throttledFunc('jerry', 30);
  foo.throttledWithTimestampFunc('timestamp', 40);
}