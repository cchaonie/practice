import React, { useEffect, useRef } from "react";

export const Loading = (props) => {
    const { loading } = props;
    const $container = useRef(null);
    useEffect(() => {
        const child = document.createElement("div");
        child.style = "height: 100px; background-color: red";
        $container.current.append(child);
        return () => {
            console.log("unmount");
            child.remove();
        }
    }, [props.loading]);

    return <div ref={$container}>{loading}</div>
}