import React from "react";
import { Layout, Menu } from "element-react";

export function ImagePage() {
    return <>
    <Layout.Col span="6" className="h100">
      <Menu defaultActive="2" className="submenu">
        <Menu.Item index="2">
          <i className="el-icon-menu"></i>图片增强
        </Menu.Item>
      </Menu>
    </Layout.Col>
    <Layout.Col span="18" className="h100">
      <div className="">
        <div>content area</div>
      </div>
    </Layout.Col>
  </>
}