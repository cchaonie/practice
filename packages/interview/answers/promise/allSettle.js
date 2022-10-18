function allSettle(promises) {
  return new Promise((resolve, reject) => {
    const data = new Array(promises.length).fill(null);
    let settledCount = 0;
    for (let i = 0; i < promises.length; i++) {
      const p = promises[i];
      p.then(
        v => (data[i] = v),
        e => (data[i] = e)
      ).then(() => {
        settledCount++;
        if (settledCount === promises.length) {
          resolve(data);
        }
      });
    }
  });
}
