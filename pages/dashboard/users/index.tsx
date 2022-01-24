import React, { useEffect, useState } from "react";
import { Layout, Table, Tag, Space, PageHeader, Button } from 'antd';
import { IBreadcrumb } from "../../../interfaces";
import TableUSer from "../../../components/users/table";

export default function Users(pageProps) {
  const { Content } = Layout;
  const routes: IBreadcrumb[] = [
    { path: 'index', breadcrumbName: 'Dashboard' },
    { path: '/users', breadcrumbName: 'Users' },
    { path: 'second', breadcrumbName: 'List' }
  ]

  return(
    <>
      <PageHeader
        ghost={false}
        title="List users"
        breadcrumb={{ routes }}
        subTitle="This is a subtitle"
        extra={[
          <Button href={'/dashboard/users/new'} key="1" type="primary">
            Add user
          </Button>,
        ]}
      />
      <Content className="site-layout-background" style={{ padding: 24, margin: 24, minHeight: 280}}>
        <TableUSer />
      </Content>
    </>
  )
}

export async function getServerSideProps(context) {
  return {
		props: {
			// params: context.params,
      query: context.query
		}
	}
}