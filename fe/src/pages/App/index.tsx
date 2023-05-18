import { Dropdown, Layout, MenuProps, message } from "antd";
import React, { useState } from "react";
import "./index.css";
import Navi from "../.././components/Nav";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const { Header, Sider } = Layout;

export const X = React.createContext({
  state: [],
  setState: (list: never[]) => {},
});

const App: React.FC = () => {
  const nav = useNavigate();
  const items: MenuProps['items'] = [
    {
      label: '退出登录',
      key: '1',
    }
  ];
  const onClick: MenuProps['onClick'] = ({ key }) => {
    if(key === "1"){
      axios.post('/api/user/logout').then(res => {
        if(res.data.code === -2){
          nav("../");
        }
      })
    }
    nav("../");
    message.info("当前账户已退出登录");
  };
  const [state, setState] = useState([]);
  return (
    <X.Provider value={{ state, setState }}>
      <Layout>
        <Header className="header">
          <div className="logo">人员管理系统</div>
          <div className="userinfo">
            <span id="username">admin</span>
            <Dropdown overlayClassName="overlay" menu={{ items, onClick }}>
              <div id="exit">
                <img id="avator" src="avatar1.jpg" alt="avator"></img>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Layout>
          <Sider>
            <Navi />
          </Sider>
          <Layout style={{ padding: "0 24px 24px", overflowY: "scroll" }}>
            <Outlet></Outlet>
          </Layout>
        </Layout>
      </Layout>
    </X.Provider>
  );
};

export default App;
