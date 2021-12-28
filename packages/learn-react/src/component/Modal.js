import React, { Component } from "react";
import ReactDOM from "react-dom";

export class Modal extends Component {
    render() {
        return ReactDOM.createPortal(
            <button>click me</button>,
            document.getElementById("portal")
        );
    }
}
