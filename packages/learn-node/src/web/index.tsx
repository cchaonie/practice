import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

export function App() {
  return (
    <div className={"main"}>
      <h1>hello ssr</h1>
    </div>
  );
}

ReactDOM.hydrate(<App/>, document.getElementById("id"));
