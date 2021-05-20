const isPromise = val => val instanceof Promise;
const isObject = val => val && typeof val === "object";

const doAsync = fn => process.nextTick(fn);

const resolvePromise = (promise, x, resolve, reject) => {
    if (x === promise) {
        reject(new TypeError("value is the same promise"));
    } else if (isPromise(x)) {
        x.then(resolve, reject);
    } else if (isObject(x)) {
        try {
            const xThen = x.then;
            if (typeof xThen === "function") {
                x.then(resolve, reject);
            } else {
                resolve(x);
            }
        } catch (error) {
            reject(error);
        }
    } else {
        resolve(x);
    }
};

function Promise(executor) {
    this.penddingThenCallback = [];

    const InnerStatus = {
        PEDDING: "pedding",
        FULFILLED: "fulfilled",
        REJECTED: "REJECTED",
    };

    let status = InnerStatus.PEDDING;
    let finalValue;
    let rejectedReason;

    const _reject = reason => {
        if (status !== InnerStatus.PEDDING) return;
        rejectedReason = reason;
        status = InnerStatus.REJECTED;

        for (let i = 0; i < this.penddingThenCallback.length; i++) {
            const { resolve, reject, onFulfilled, onRejected, promise } =
                this.penddingThenCallback[i];
            doAsync(() => {
                if (typeof onRejected === "function") {
                    try {
                        const x = onRejected(rejectedReason);
                        resolvePromise(promise, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                } else {
                    reject(rejectedReason);
                }
            });
        }
    };

    const _resolve = value => {
        if (status !== InnerStatus.PEDDING) return;
        if (value === this) {
            _reject(new TypeError("value is the same promise"));
        } else {
            finalValue = value;
            status = InnerStatus.FULFILLED;

            for (let i = 0; i < this.penddingThenCallback.length; i++) {
                const { resolve, reject, onFulfilled, onRejected, promise } =
                    this.penddingThenCallback[i];
                doAsync(() => {
                    if (typeof onFulfilled === "function") {
                        try {
                            const x = onFulfilled(finalValue);
                            resolvePromise(promise, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    } else {
                        resolve(value);
                    }
                });
            }
        }
    };

    try {
        executor(_resolve, _reject);
    } catch (error) {
        _reject(error);
    }
}

Promise.prototype.then = (onFulfilled, onRejected) => {
    const p = new Promise((resolve, reject) => {
        if (status === InnerStatus.FULFILLED) {
            doAsync(() => {
                if (typeof onFulfilled === "function") {
                    try {
                        const x = onFulfilled(finalValue);
                        resolvePromise(p, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                } else {
                    resolve(finalValue);
                }
            });
        } else if (status === InnerStatus.REJECTED) {
            doAsync(() => {
                if (typeof onRejected === "function") {
                    try {
                        const x = onRejected(rejectedReason);
                        resolvePromise(p, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                } else {
                    resolve(rejectedReason);
                }
            });
        } else {
            this.penddingThenCallback.push({
                resolve,
                reject,
                onFulfilled,
                onRejected,
                promise: p,
            });
        }
    });
    return p;
};

Promise.resolve = val => new Promise(resolve => resolve(val));

Promise.reject = reason => new Promise((_, reject) => reject(reason));

module.exports = Promise;
