async function any(promises) {
    let finalError = null;
    for (const p of promises) {
        try {
            const val = await p;
            return val;
        } catch (e) {
            finalError = e;
        }
    }
    return finalError;
}
