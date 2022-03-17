import React from "react";
import Head from "next/head";
import { Layout, PageHeader, Button } from 'antd';
import Link from "next/link";
import { IBreadcrumb } from "../../../interfaces";
import TableUSer from "../../../components/users/table";
import withAuth from "../../../HOCs/withAuth";

const Users = (pageProps: any) => {
  const { Content } = Layout;
  const routes: IBreadcrumb[] = [
    { path: '', breadcrumbName: 'Dashboard' },
    { path: '/dashboard/users', breadcrumbName: 'Users' },
    { path: '', breadcrumbName: 'List' }
  ]

  const itemRender = (route, params, routes, paths) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link href={`/${paths.join('/')}`}>{route.breadcrumbName}</Link>
    );
  }

  return(
    <>
      <Head>
        <title>Users - Dashboard</title>
      </Head>
      <PageHeader
        ghost={false}
        title="List users"
        breadcrumb={{routes, itemRender}}
        subTitle=""
        extra={[
          <Button key="1" type="primary">
            <Link href="/dashboard/users/new">Add user</Link>
          </Button>,
        ]}
      />
      <Content className="site-layout-background" style={{ padding: 24, margin: 24, minHeight: 280}}>
        <TableUSer />
      </Content>
    </>
  )
}

Users.layout = "Dashboard"

export async function getServerSideProps(context: any) {
  return {
		props: {
      query: context.query,
      layout: "Dashboard"
		}
	}
}

export default withAuth(Users)