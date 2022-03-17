import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Layout, PageHeader, Form, Input, Button, Row, Col, Radio, DatePicker, Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UploadFile } from "antd/lib/upload/interface";
import Link from "next/link";
import { createMember } from "../../../api/member";
import { IBreadcrumb } from "../../../interfaces";
import FormUser from "../../../components/users/form";
import { Member } from "../../../models/Member";
import withAuth from "../../../HOCs/withAuth";

const CreateUser = (pageProps) => {
  const { Content } = Layout;
  const [member, setMember] = useState<Member>()

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
    const defaultState = {
      id: null,
      first_name: null,
      last_name: null, 
      email: null,
      gender: 0,
      date_of_birth: null,
      image: []
    }
    const memberState = new Member(defaultState) 
    setMember(memberState)
    console.log(memberState)
  }, [])

  return(
    <>
      <Head>
        <title>Add user - Dashboard</title>
      </Head>
      <PageHeader
        ghost={false}
        title="Create user"
        breadcrumb={{ routes, itemRender }}
        subTitle=""
      />
      <Content className="site-layout-background" style={{ padding: 24, margin: 24, minHeight: 280}}>
        <FormUser action="new" member={member} />
      </Content>
    </>
  )
}

// CreateUser.layout = "Dashboard"

export async function getServerSideProps(context: any) {
  return {
		props: {
      layout: "Dashboard"
		}
	}
}

export default withAuth(CreateUser);