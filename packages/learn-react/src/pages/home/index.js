import React from "react";
import { connect } from "react-redux";
import "./index.scss";

const Home = ({ count, increase, decrease }) => {
    return (
        <div>
            current: {count}
            <div className="handlers">
                <button onClick={increase}>increase</button>
                <button onClick={decrease}>decrease</button>
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
