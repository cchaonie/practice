const Promise = require("../index");

module.exports = {
    resolved: value => Promise.resolve(value),
    rejected: reason => Promise.reject(reason),
    deferred: function () {
        let resolve, reject;
        return {
            promise: new Promise((rel, rej) => {
                resolve = rel;
                reject = rej;
            }),
            resolve,
            reject,
        };
    },
};
