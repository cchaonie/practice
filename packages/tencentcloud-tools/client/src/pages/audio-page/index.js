import React from "react";
import { Layout, Menu } from "element-react";

export function AudioPage() {
  return (
    <>
      <Layout.Col span="6" className="h100">
        <Menu defaultActive="1" className="submenu">
            <Menu.Item index="1">
            <i className="el-icon-menu"></i>一句话识别
          </Menu.Item>
          <Menu.Item index="2">
            <i className="el-icon-menu"></i>录音文件识别
          </Menu.Item>
          <Menu.Item index="3">
            <i className="el-icon-setting"></i>实时语音识别
          </Menu.Item>
        </Menu>
      </Layout.Col>
      <Layout.Col span="18" className="h100">
        <div className="">
          <div>content area</div>
        </div>
      </Layout.Col>
    </>
  );
}
