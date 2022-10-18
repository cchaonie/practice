/**
 * only ths last call will emit the result
 * @param {*} promiseFn
 * @returns
 */
function lastPromise(promiseFn) {
  let count = 0;
  return () => {
    count++;
    return new Promise(resolve => {
      const currentCount = count;
      promiseFn().then(v => {
        if (count === currentCount) {
          resolve(v);
        }
      });
    });
  };
}

let value = 0;

const promiseFn = () =>
  new Promise(resolve => setTimeout(() => resolve(value++), 0));

const lastFn = lastPromise(promiseFn);

lastFn().then(console.log); // nothing
lastFn().then(console.log); // nothing
lastFn().then(console.log); // 3
