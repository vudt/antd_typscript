import React from 'react';
import { Layout, Button } from 'antd';

const LayoutLogin = (pageProps) => {
  const { Footer } = Layout;
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {pageProps.children}
      {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
    </Layout>
  )
}

export default LayoutLogin;