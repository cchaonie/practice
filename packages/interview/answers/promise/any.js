async function any(promises) {
  let finalError = null;
  for (const p of promises) {
    try {
      const val = await p;
      return val;
    } catch (e) {
      finalError = e;
    }
  }
  return finalError;
}

function anyNaive(promises) {
  return new Promise((resolve, reject) => {
    let errorCount = 0;
    for (const p of promises) {
      p.then(resolve).catch(e => {
        errorCount++;
        if (errorCount === promises.length) {
          reject(e);
        }
      });
    }
  });
}
