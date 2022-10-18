// 现有8个图片资源的url，已经存储在数组urls中，且已有一个函数function loading，输入一个url链接，
// 返回一个Promise，该Promise在图片下载完成的时候resolve，下载失败则reject。
// 要求：任何时刻同时下载的链接数量不可以超过3个。

const Promise = require('promise-polyfill');

var urls = [
  'https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg',
  'https://www.kkkk1000.com/images/getImgData/gray.gif',
  'https://www.kkkk1000.com/images/getImgData/Particle.gif',
  'https://www.kkkk1000.com/images/getImgData/arithmetic.png',
  'https://www.kkkk1000.com/images/getImgData/arithmetic2.gif',
  'https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg',
  'https://www.kkkk1000.com/images/getImgData/arithmetic.gif',
  'https://www.kkkk1000.com/images/wxQrCode2.png',
];

function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      console.log('一张图片加载完成');
      resolve();
    };
    img.onerror = reject;
    img.src = url;
  });
}

function fixSizePromise(items, size, handler) {
  const promises = new Array(size);
  for (let i = 0; i < size; i++) {
    promises[i] = handler(items[i]).then(
      res => i,
      err => i
    );
  }

  return items
    .filter((_, idx) => idx >= size)
    .reduce((acc, item) => {
      return acc.then(i => {
        promises[i] = handler(item).then(
          res => i,
          err => i
        );
        return Promise.race(promises);
      });
    }, Promise.race(promises))
    .then(() => Promise.all(promises));
}

fixSizePromise(urls, 3, loadImg)
  .then(final => {
    console.log(final);
    console.log('所有图片加载完成');
  })
  .catch(err => {
    console.error(err);
  });

function autoAdd(items, promises, handler) {
  if (items.length) {
    promises.push(
      handler(items.shift()).then(
        () => {
          autoAdd(items, promises, handler);
        },
        err => {
          console.log(err);
          autoAdd(items, promises, handler);
        }
      )
    );
  }
}

const promises = [];

for (let i = 0; i < 3; i++) {
  autoAdd(items, promises, loadImg);
}
