// 写一个 mySetInterval(fn, a, b),每次间隔 a,a+b,a+2b 的时间，然后写一个 myClear，停止上面的 mySetInterval

function mySetInterval(fn, a, b) {
    let myTimer = null;
    let count = 0;

    const callback = () => {
        fn.call(null);
        myTimer = setTimeout(callback, a + ++count * b);
    };

    myTimer = setTimeout(callback, a);

    return () => {
        clearTimeout(myTimer);
    };
}
