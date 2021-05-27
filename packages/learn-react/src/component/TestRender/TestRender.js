import React, { useEffect, useState } from "react";

export default function TestRender() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log("TestRender [mount]");
        return () => console.log("TestRender [will unmount]");
    }, []);
    return (
        <div>
            TestRender
            <button onClick={() => setCount(count => count + 1)}>add</button>
            <p>{count}</p>
        </div>
    );
}
