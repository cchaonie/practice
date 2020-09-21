import React, { Component } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { Content } from "./Content";
import { CircleCorner } from "./CircleCorner";
import TransitionComp from "./component/animations/index";

@ErrorBoundary
export default class App extends Component {
  render() {
    return (
      <div>
        <h1>upload record file</h1>
        <Content />
        <CircleCorner />
        <TransitionComp/>
      </div>
    );
  }
}
