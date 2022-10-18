/**
 * fetch 超时取消
 * @param {*} url
 * @param {*} timeout
 * @returns
 */
function timeoutFetch(url, timeout) {
  let timer = null;
  const controller = new AbortController();
  return Promise.race([
    fetch(url, { signal: controller.signal }).then(data => {
      if (timer) {
        clearTimeout(timer);
      }
      return data;
    }),
    new Promise(
      (resolve, reject) =>
        (timer = setTimeout(() => {
          controller.abort();
          reject('timeout');
        }, timeout))
    ),
  ]);
}
