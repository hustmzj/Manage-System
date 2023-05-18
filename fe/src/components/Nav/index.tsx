import { InfoCircleOutlined, TeamOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React from 'react';
import './index.css'

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('人员管理', 'sub1', <TeamOutlined />),
  getItem('关于', 'sub2', <InfoCircleOutlined />)
];

const App: React.FC = () => {

  const nav = useNavigate();

  const onClick: MenuProps['onClick'] = e => {
    if(e.key === 'sub1') {
      nav("/main");
    }
    else if(e.key === 'sub2') {
      nav("/main/about")
    }
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['sub1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};

export default App;