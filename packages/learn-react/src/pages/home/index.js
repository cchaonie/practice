import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import TestRender from "../../component/TestRender/TestRender";

import "./index.scss";

const Home = ({ count, increase, decrease }) => {
    useEffect(() => {
        frames[0].postMessage("hello there", "*");
        window.onmessage = e => {
            console.log(e.data, e.origin);
        };
    }, []);
    const [showTestRender, setShowTestRender] = useState(false);
    const handleClick = () => setShowTestRender(show => !show);
    return (
        <div>
            current: {count}
            <div className="handlers">
                <button onClick={increase}>increase</button>
                <button onClick={decrease}>decrease</button>
                <iframe src="http://localhost:9001"></iframe>
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
