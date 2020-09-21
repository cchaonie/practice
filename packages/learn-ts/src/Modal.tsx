import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class Modal extends Component {
  render() {
    return ReactDOM.createPortal(
      <div>
        <button>click me</button>
        {this.props.children}
      </div>,
      document.getElementById("portal")
    );
  }
}
