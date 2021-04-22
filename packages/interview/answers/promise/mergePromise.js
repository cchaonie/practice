// 请实现一个mergePromise函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组data中。
const Promise = require("promise-polyfill");

const timeout = ms =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });

const ajax1 = () =>
    timeout(2000).then(() => {
        console.log("1");
        return 1;
    });

const ajax2 = () =>
    timeout(1000).then(() => {
        console.log("2");
        return 2;
    });

const ajax3 = () =>
    timeout(2000).then(() => {
        console.log("3");
        return 3;
    });

const mergePromise = ajaxArray => {
    // 在这里实现你的代码
    const data = [];
    return ajaxArray.reduce((controller, ajax) => {
        return controller.then(ajax).then(v => {
            data.push(v);
            return data;
        });
    }, controller);
    // let controller = Promise.resolve();
    // ajaxArray.forEach(ajax => {
    //     controller = controller.then(ajax).then(v => {
    //         data.push(v);
    //         return data;
    //     });
    // });
    // return controller;
};

mergePromise([ajax1, ajax2, ajax3]).then(data => {
    console.log("done");
    console.log(data); // data 为 [1, 2, 3]
});
