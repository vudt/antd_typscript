import React, { useEffect, useState } from "react";
import { Layout, PageHeader, Form, Input, Button, Row, Col, Radio, DatePicker, Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UploadFile } from "antd/lib/upload/interface";
import { IBreadcrumb } from "../../../../interfaces";
import FormUser from "../../../../components/users/form";
import { Member } from "../../../../models/Member";
import { getMember } from "../../../../api/member";
import { useRouter } from "next/router";

export default function Edit(pageProps) {
  const { Content } = Layout;
  const [member, setMember] = useState<Member>()
  const router = useRouter();
  
  const routes: IBreadcrumb[] = [
    { path: 'index', breadcrumbName: 'Dashboard' },
    { path: '/users', breadcrumbName: 'Users' },
    { path: 'second', breadcrumbName: 'Edit' }
  ]

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
    <PageHeader
      ghost={false}
      title="Edit user"
      breadcrumb={{ routes }}
      subTitle="This is a subtitle"
    />
    <Content className="site-layout-background" style={{ padding: 24, margin: 24, minHeight: 280}}>
      <FormUser action="edit"  member={member} />
    </Content>
    </>
  )
}

export async function getServerSideProps(context) {
  return {
		props: {
      query: context.query
		}
	}
}