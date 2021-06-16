function debounce(fn, delay = 300) {
    let timer = null;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
        return () => {
            clearTimeout(timer);
        }
    };
}

const myFn = () => console.log("hello debounce");

const debounced = debounce(myFn);
const cancel = debounced();

// cancel();
