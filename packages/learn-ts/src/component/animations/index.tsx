import React, { Component, Fragment } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./index.scss";

interface TransitionCompState {
  show: boolean;
}

class TransitionComp<T> extends Component<T, TransitionCompState> {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
    this.handleToggole = this.handleToggole.bind(this);
  }

  render() {
    return (
      <Fragment>
        <TransitionGroup>
          <CSSTransition
            in={this.state.show}
            timeout={1000}
            classNames="fade"
            unmountOnExit
            onEntered={el => {
              el.style.color = "blue";
            }}
            appear={true}
          >
            <div>hello</div>
          </CSSTransition>
        </TransitionGroup>
        <button onClick={this.handleToggole}>toggole</button>
      </Fragment>
    );
  }

  handleToggole() {
    this.setState({
      show: this.state.show ? false : true
    });
  }
}

export default TransitionComp;
