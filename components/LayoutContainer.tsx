import React from 'react';
import { Layout, PageHeader, Button } from 'antd';
import Header from './Header';
import Sidebar from './Sidebar';

const { Content, Footer } = Layout;
const LayoutContainer = (pageProps) => {
  
  const routes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'Users',
    },
    {
      path: 'second',
      breadcrumbName: 'List',
    },
  ];
  
  return(
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Layout>
        <Sidebar />
        <Layout>
          {/* <PageHeader
              ghost={false}
              title="List users"
              breadcrumb={{ routes }}
              subTitle="This is a subtitle"
              extra={[
                <Button href={'/dashboard/user/new'} key="1" type="primary">
                  Add user
                </Button>,
              ]}
          />
          <Content className="site-layout-background" style={{ padding: 24, margin: 24, minHeight: 280}}>
            {pageProps.children}
          </Content> */}
          {pageProps.children}
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default LayoutContainer

