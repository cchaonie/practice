import React, { useCallback } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "element-theme-default";
import { Layout, Menu } from "element-react";

export default function App() {
  const onSelect = useCallback(() => {}, []);

  return (
    <div className="app">
      <Layout.Row className="header">
        <div className="container navigation">
          <Layout.Col span="6">
            <h1 className="title">Tencentcloud Tools</h1>
          </Layout.Col>
          <Layout.Col span="18">
            <Menu
              defaultActive="1"
              className="menu"
              mode="horizontal"
              menuTrigger="click"
              onSelect={onSelect}
            >
              <Menu.Item index="1">处理中心</Menu.Item>
              <Menu.SubMenu index="2" title="我的工作台">
                <Menu.Item index="2-1">选项1</Menu.Item>
                <Menu.Item index="2-2">选项2</Menu.Item>
                <Menu.Item index="2-3">选项3</Menu.Item>
              </Menu.SubMenu>
              <Menu.Item index="3">订单管理</Menu.Item>
            </Menu>
          </Layout.Col>
        </div>
      </Layout.Row>
      <Layout.Row className="main container">
        <Layout.Col span="6" className="h100">
          <Menu defaultActive="2" className="submenu">
            <Menu.SubMenu
              index="1"
              title={
                <span>
                  <i className="el-icon-message"></i>导航一
                </span>
              }
            >
              <Menu.ItemGroup title="分组一">
                <Menu.Item index="1-1">选项1</Menu.Item>
                <Menu.Item index="1-2">选项2</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="分组2">
                <Menu.Item index="1-3">选项3</Menu.Item>
              </Menu.ItemGroup>
            </Menu.SubMenu>
            <Menu.Item index="2">
              <i className="el-icon-menu"></i>导航二
            </Menu.Item>
            <Menu.Item index="3">
              <i className="el-icon-setting"></i>导航三
            </Menu.Item>
          </Menu>
        </Layout.Col>
        <Layout.Col span="18" className="h100">
          <div className="">
            <div>content area</div>
          </div>
        </Layout.Col>
      </Layout.Row>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
