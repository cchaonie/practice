module.exports = {
  getPromise: (n, time) =>
    new Promise(resolve =>
      setTimeout(() => {
        resolve(n);
      }, time)
    ),
};
