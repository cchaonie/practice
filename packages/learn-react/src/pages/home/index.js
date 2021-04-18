import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./index.scss";

const Home = ({ count, increase, decrease }) => {
  useEffect(() => {
    frames[0].postMessage("hello there", "*");
    window.onmessage = (e) => {
        console.log(e.data, e.origin);
    }
  }, []);
  return (
    <div>
      current: {count}
      <div className="handlers">
        <button onClick={increase}>increase</button>
        <button onClick={decrease}>decrease</button>
        <iframe src="http://localhost:9001"></iframe>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({ ...state }),
  (dispatch) => ({
    increase: () => dispatch({ type: "INCREASE" }),
    decrease: () => dispatch({ type: "DECREASE" }),
  })
)(Home);
