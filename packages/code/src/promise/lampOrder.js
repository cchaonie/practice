// 红灯3秒亮一次，绿灯1秒亮一次，黄灯2秒亮一次；如何使用Promise让三个灯不断交替重复亮灯？
const Promise = require("promise-polyfill");

function red() {
    console.log("red");
}
function green() {
    console.log("green");
}
function yellow() {
    console.log("yellow");
}

const timeout = (time, callback) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            callback();
            resolve();
        }, time);
    });
};

const steps = () => {
    return Promise.resolve()
        .then(() => timeout(3000, red))
        .then(() => timeout(1000, green))
        .then(() => timeout(2000, yellow))
        .then(steps);
};

steps();
