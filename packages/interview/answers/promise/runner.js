/**
 * auto runner for generator function
 * @param {Generator} fn 
 * @returns 
 */
function runner(fn) {
    const it = fn();
    const data = [];
    let next = null;
    do {
        next = it.next();
        data.push(next.value);
    } while (!next.done);
    return data;
}