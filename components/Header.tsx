import React from 'react';
import { Layout, Menu, Dropdown, Space, Divider, Avatar, Badge } from 'antd';
import { UserOutlined, LogoutOutlined, BellOutlined, DownOutlined } from '@ant-design/icons';

const Header = (props) => {
  const { Header } = Layout;
  const menu = (
    <Menu style={{minWidth: '150px'}}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          Profile
        </a>
      </Menu.Item>
      <Divider style={{margin: 0}} />
      <Menu.Item key="2" icon={<LogoutOutlined/>}>
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  const Notifications = (
    <Menu style={{minWidth: '150px'}}>
      <Menu.Item key="1">
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          You have new order
        </a>
      </Menu.Item>
      <Divider style={{margin: 0}} />
      <Menu.Item key="2">
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        You have new order
        </a>
      </Menu.Item>
    </Menu>
  )

  return (
    <Header className="header">
      <div className="logo" />
      <div className="header-right">
          <Space style={{margin: '0 15px'}}>
            <Dropdown overlay={Notifications}>
              <Badge count={5}>
                <Avatar icon={<BellOutlined />} />
              </Badge>
            </Dropdown>
          </Space>
          <Space>
            <Dropdown overlay={menu}>
              <a style={{color: '#fff'}} className="ant-dropdown-link">
                Hi, Vudang <DownOutlined />
              </a>
            </Dropdown>
          </Space>
      </div>
    </Header>
  )
}

export default Header;