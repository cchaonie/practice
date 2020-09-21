import React from "react";
import ReactDOM from "react-dom";
import "element-theme-default";
import { Layout, Menu } from "element-react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ImagePage, AudioPage } from "./pages";
import "./index.scss";


export default function App() {
  return (
    <Router>
      <div className="app">
        <Layout.Row className="header">
          <div className="container navigation">
            <Layout.Col span="6">
              <h1 className="title">Tencentcloud Tools</h1>
            </Layout.Col>
            <Layout.Col span="18">
              <Menu
                defaultActive="1"
                className="menu topMenu"
                mode="horizontal"
                menuTrigger="click"
              >
                <Menu.Item index="1">
                  <Link to="/">图片</Link>
                </Menu.Item>
                <Menu.Item index="2">
                  <Link to="/audio">音频</Link>
                </Menu.Item>
              </Menu>
            </Layout.Col>
          </div>
        </Layout.Row>
        <Layout.Row className="main container">
          <Switch>
            <Route exact path="/">
              <ImagePage />
            </Route>
            <Route path="/audio">
              <AudioPage />
            </Route>
          </Switch>
        </Layout.Row>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
