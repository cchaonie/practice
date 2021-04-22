function bind(fn, thisObj) {
    return function (...args) {
        return fn.apply(thisObj, args);
    };
}

Function.prototype.ownCall = function (context, ...args) {
    context = typeof context === "object" ? context : window;
    // 防止覆盖掉原有属性
    const key = Symbol();
    // 这里的this为需要执行的方法
    context[key] = this;
    // 方法执行
    const result = context[key](...args);
    delete context[key];
    return result;
};
