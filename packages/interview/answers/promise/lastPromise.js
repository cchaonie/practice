function lastPromise(promiseFn) {
    let count = 0;
    return () => {
        count++;
        return new Promise(resolve => {
            const currentCount = count;
            promiseFn().then(v => {
                if (count === currentCount) {
                    resolve(v);
                }
            });
        });
    };
}

let value = 0;

const pfn = () =>
    new Promise(resolve => setTimeout(() => resolve(value++), 0));

const lastFn = lastPromise(pfn);

lastFn().then(console.log);
lastFn().then(console.log);
lastFn().then(console.log);
