import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import TestRender from "../../component/TestRender/TestRender";

import "./index.scss";

const Home = ({ count, increase, decrease }) => {
    const channel = new MessageChannel();
    channel.port1.onmessage = e => {
        console.log(e.data, e.origin);
    };
    useEffect(() => {
        // frames[0].postMessage("hello there", "*");
        window.onmessage = e => {
            console.log(e.data, e.origin);
        };
    }, []);

    const [showTestRender, setShowTestRender] = useState(false);
    const handleClick = () => setShowTestRender(show => !show);

    const postMessageToSelf = () => {
        setTimeout(() => console.log("this is a timeout"), 0);
        Promise.resolve("micro task").then(console.log);
        window.postMessage("message to myself", "*");
    };

    const postMessageUsingChannel = () => {
        postMessageToSelf();
        channel.port2.postMessage("p2 say hello");
    };

    return (
        <div>
            current: {count}
            <div className="handlers">
                <button onClick={increase}>increase</button>
                <button onClick={decrease}>decrease</button>
                <button onClick={postMessageToSelf}>postMessageToSelf</button>
                <button onClick={postMessageUsingChannel}>
                    postMessageUsingChannel
                </button>
                {/* <iframe src="http://localhost:9001"></iframe> */}
            </div>
            <div>
                <button onClick={handleClick}>show</button>
                {showTestRender && <TestRender />}
            </div>
        </div>
    );
};

export default connect(
    state => ({ ...state }),
    dispatch => ({
        increase: () => dispatch({ type: "INCREASE" }),
        decrease: () => dispatch({ type: "DECREASE" }),
    })
)(Home);
