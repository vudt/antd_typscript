import React from 'react';
import { Layout, Menu, Dropdown, Space, Divider, Avatar, Badge } from 'antd';
import { UserOutlined, LogoutOutlined, BellOutlined, DownOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { userLogOut } from '../redux/authSlice';
import { AppDispatch, useAppDispatch } from '../redux/store';
import { useRouter } from 'next/router';

const Header = (props) => {
  // const dispatch: AppDispatch = useDispatch()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { Header } = Layout;

  const logOut = async() => {
    const status = await dispatch(userLogOut()).unwrap()
    if (status) {
      router.push('/login')
    }
  }

  const menu = (
    <Menu style={{minWidth: '150px'}}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        <a target="_blank" rel="noopener noreferrer">
          Profile
        </a>
      </Menu.Item>
      <Divider style={{margin: 0}} />
      <Menu.Item key="2" icon={<LogoutOutlined/>}>
        <a onClick={logOut}>Logout</a>
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