export function curry(fn, ...initialArgs) {
    const maxParams = fn.length;
    let args = [...initialArgs];
    if (args.length >= maxParams) {
        return fn.apply(null, args);
    }
    return function curryed() {
        const currParams = Array.prototype.slice.call(arguments);
        args = [...args, ...currParams];
        if (args.length < maxParams) {
            return curryed;
        } else {
            return fn.apply(null, args);
        }
    };
}
