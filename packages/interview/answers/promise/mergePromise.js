// 请实现一个mergePromise函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组data中。
const { getPromise } = require('./utils');

const async1 = () => getPromise(1, 1000);
const async2 = () => getPromise(2, 4000);
const async3 = () => getPromise(3, 2000);

const mergePromise = promises => {
  const result = [];
  return promises.reduce(
    (a, c, i) =>
      a.then(c).then(r => {
        result[i] = r;
        console.log(r);
        return result;
      }),
    Promise.resolve()
  );
};

const ps = [async1, async2, async3];

mergePromise(ps).then(r => {
  console.log('done');
  console.log(r);
});
