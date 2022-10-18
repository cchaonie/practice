// 红灯3秒亮一次，绿灯1秒亮一次，黄灯2秒亮一次；如何使用Promise让三个灯不断交替重复亮灯？
const red = () => console.log('red');
const green = () => console.log('green');
const blue = () => console.log('blue');

const delay = (fn, time) =>
  new Promise(resolve =>
    setTimeout(() => {
      fn();
      resolve();
    }, time)
  );

const start = () => {
  delay(red, 3000)
    .then(() => delay(green, 1000))
    .then(() => delay(blue, 2000))
    .then(start);
};

start();
