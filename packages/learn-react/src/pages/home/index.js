import React, { Component } from "react";
import "./index.scss";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="flex flex-col">
                    <div style={{ background: "red" }}>1</div>
                    <div style={{ background: "green" }}>2</div>
                </div>
                <h1>Portal</h1>
            </div>
        );
    }
}
