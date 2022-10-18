const { getPromise } = require('./utils');

const runnerWithLimit = (limit, tasks) => {
  let runningCount = 0;
  const startTime = +new Date();

  const pick = () => {
    if (tasks.length && runningCount < limit) {
      const task = tasks.shift();
      runningCount += 1;
      return task().then(r => {
        console.log('Spend time:', new Date() - startTime);
        console.log(r);
        runningCount -= 1;
        return pick();
      });
    }
  };
  for (let i = 0; i < limit; i += 1) {
    pick();
  }
};

// test

const task1 = () => getPromise(1, 2000);
const task2 = () => getPromise(2, 1000);
const task3 = () => getPromise(3, 3000);
const task4 = () => getPromise(4, 4000);
const task5 = () => getPromise(5, 1000);
const task6 = () => getPromise(6, 2000);
const task7 = () => getPromise(7, 5000);
const task8 = () => getPromise(8, 2000);
const task9 = () => getPromise(9, 5000);
const task10 = () => getPromise(10, 8000);
const task11 = () => getPromise(11, 600);

runnerWithLimit(3, [
  task1,
  task2,
  task3,
  task4,
  task5,
  task6,
  task7,
  task8,
  task9,
  task10,
  task11,
]);
