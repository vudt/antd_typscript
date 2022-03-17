import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const { Sider } = Layout;
  const { SubMenu } = Menu;
  const router = useRouter();

  const subMenuPrefix = [
    {route: '/dashboard/users', key: 'sub1'},
    {route: '/dashboard/users/new', key: 'sub1'},
    {route: '/dashboard/users/edit/[id]', key: 'sub1'}
  ]
  const defaultOpenKeys = subMenuPrefix.filter(item => item.route === router.route).map(item => item.key)
  
  const menuItemPrefix = [
   {route: '/dashboard/users', key: '1'},
   {route: '/dashboard/users/new', key: '2'},
   {route: '/dashboard/users/edit/[id]', key: 'sub1'}
  ]
  const defaultSelectedKeys = menuItemPrefix.filter(item => item.route === router.route).map(item => item.key)

  return (
    <Sider 
      breakpoint={"lg"} 
      width={200} 
      collapsedWidth="0"
      onBreakpoint={broken => {
        // console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        // console.log(collapsed, type);
      }}
      className="site-layout-background"
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={defaultSelectedKeys}
        defaultOpenKeys={defaultOpenKeys}
        style={{ height: '100%', borderRight: 0 }}
      >
        <SubMenu key="sub1" icon={<UserOutlined />} title="Users">
          <Menu.Item key="1"><Link href="/dashboard/users">All</Link></Menu.Item>
          <Menu.Item key="2"><Link href="/dashboard/users/new">Add new</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<LaptopOutlined />} title="Products">
          <Menu.Item key="3">All</Menu.Item>
          <Menu.Item key="4">Add new</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  )
}

export default Sidebar;