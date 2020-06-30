import React, { Component } from "react";
import Modal from "./Modal.js";
import store from "./store";
import Lazy from "./Lazy";
import Card from "./component/card";
import { Loading } from "./component/loading";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      display: false,
    };
  }

  componentDidMount() {
    console.log("parent did mount");
  }

  componentDidUpdate() {
    console.log("parent did update");
  }

  render() {
    const { visible, display } = this.state;
    return (
      <div>
        <h1>Portal</h1>
        <Modal></Modal>
        <button onClick={() => this.setState({ visible: !this.state.visible })}>toggle</button>
        <button onClick={() => this.setState({ display: !this.state.display })}>display toggle</button>
        <button
          onClick={() => () => {
            import("./dynamic")
              .then((module) => console.log(`successfully load ${module}`))
              .catch((e) => console.error(`load error: ${e}`));
          }}
        >
          import()
        </button>
        {visible ? <Lazy></Lazy> : null}
        <Card />
        <div style={{ display: display ? "block" : "none" }}>
          <Loading loading={"1"} />
        </div>
      </div>
    );
  }
}

store.dispatch({
  type: "A",
  payload: { count: 100 },
});
