/**
 * 这里默认参数都是 不需要参数的函数。如果需要处理参数的话，会比较麻烦
 * @param {*} queryStatus
 * @param {*} successCallback
 */
function omniPoller(queryStatus, successCallback) {
  if (
    typeof queryStatus !== "function" ||
    typeof successCallback !== "function"
  ) {
    throw Error("parameters should be functoin");
  }
  const factor = 1.5,
    delay = 1000;
  const attempt = delay =>
    new Promise((resolve, reject) => {
      try {
        resolve(queryStatus());
      } catch (error) {
        console.log(error);
        reject(error);
      }
    }, delay);
  attempt(delay)
    .then(result => {
      if (result) {
        successCallback();
      } else {
        attempt(factor * delay);
      }
    })
    .catch(e => console.log(e));
}

let count = 0;

function queryStatus() {
  count++;
  console.log(count);
  if (count == 5) return true;
  return false;
}

function callback() {
  console.log("in cb");
}


omniPoller(queryStatus, callback);