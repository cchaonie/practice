export function all(promises) {
    return new Promise((resolve, reject) => {
        const data = [];
        let resolvedCount = 0;
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(v => {
                data[i] = v;
                resolvedCount++;
                if (resolvedCount === promises.length) {
                    resolve(data);
                }
            }, reject);
        }
        resolve(data);
    });
}
