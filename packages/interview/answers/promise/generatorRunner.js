/**
 * auto runner for generator function
 * @param {Generator} fn
 * @returns
 */
function generatorRunner(fn) {
  const it = fn();
  const data = [];
  let next = null;
  do {
    next = it.next();
    data.push(next.value);
  } while (!next.done);
  return data;
}

function* g() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  return 10;
}

const data = generatorRunner(g);
console.log(data);
