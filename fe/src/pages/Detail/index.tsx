import { Breadcrumb, Layout } from "antd";
import React from "react";
import "./index.css";
import Info from "../.././components/Info";
import { Link } from "react-router-dom";

const { Content } = Layout;

const App: React.FC = () => (
  <>
    <Breadcrumb style={{ margin: "16px 0" }}>
      <Breadcrumb.Item><Link to='../../main'>人员管理</Link></Breadcrumb.Item>
      <Breadcrumb.Item>查看详情</Breadcrumb.Item>
    </Breadcrumb>
    <Content
      className="site-layout-background"
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
      }}
    >
      <Info />
    </Content>
  </>
);

export default App;
