export function all(promises) {
    return new Promise((resolve, reject) => {
        const data = [];
        let resoledCount = 0;
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(v => {
                data[i] = v;
                resoledCount++;
                if (resoledCount === promises.length) {
                    resolve(data);
                }
            },reject);
        }
        resolve(data);
    });
}
