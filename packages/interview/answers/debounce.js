function debounce(fn, delay) {
    let timer = null;
    let lastCall = 0;
    return function (...args) {
        const now = new Date();
        if (now - lastCall < delay) {
            clearTimeout(timer);
        }
        lastCall = now;
        timer = setTimeout(() => {
            fn.apply(null, args);
        }, delay);
    };
}
