import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Layout, PageHeader, message } from 'antd';
import { IBreadcrumb } from "../../../../interfaces";
import FormUser from "../../../../components/users/form";
import { Member } from "../../../../models/Member";
import { getMember } from "../../../../api/member";
import { useRouter } from "next/router";
import Link from "next/link";
import withAuth from "../../../../HOCs/withAuth";

const Edit = (pageProps: any) => {
  console.log(pageProps)
  const { Content } = Layout;
  const [member, setMember] = useState<Member>()
  const router = useRouter();
  
  const routes: IBreadcrumb[] = [
    { path: '/', breadcrumbName: 'Dashboard' },
    { path: '/dashboard/users', breadcrumbName: 'Users' },
    { path: '', breadcrumbName: 'Add new' }
  ]

  const itemRender = (route, params, routes, paths) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link href={`/${paths.join('/')}`}>{route.breadcrumbName}</Link>
    );
  }

  useEffect(()=>{
    if (router.query.create == 'success') {
      message.success('Create successfully!')
    }
    (async () => {
      try {
        console.log(parseInt(router.query.id as string))
        const response = await getMember(parseInt(router.query.id as string))
        console.log(response)
        if (response.data) {
          const memberState = new Member(response.data)
          setMember(memberState)
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [router.query.id])

  console.log(member)

  return(
    <>
      <Head>
        <title>Edit user - Dashboard</title>
      </Head>
      <PageHeader
        ghost={false}
        title="Edit user"
        breadcrumb={{  routes, itemRender }}
        subTitle=""
      />
      <Content className="site-layout-background" style={{ padding: 24, margin: 24, minHeight: 280}}>
        <FormUser action="edit"  member={member} />
      </Content>
    </>
  )
}

export async function getServerSideProps(context: any) {
  return {
		props: {
      query: context.query,
      layout: "Dashboard"
		}
	}
}

export default withAuth(Edit)