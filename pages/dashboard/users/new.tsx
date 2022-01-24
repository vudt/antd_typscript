import React, { useEffect, useState } from "react";
import { Layout, PageHeader, Form, Input, Button, Row, Col, Radio, DatePicker, Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UploadFile } from "antd/lib/upload/interface";
import axios from 'axios';
import { createMember } from "../../../api/member";
import { IBreadcrumb } from "../../../interfaces";
import FormUser from "../../../components/users/form";
import { Member } from "../../../models/Member";

export default function CreateUser(pageProps) {
  const { Content } = Layout;
  const [member, setMember] = useState<Member>()

  const routes: IBreadcrumb[] = [
    { path: 'index', breadcrumbName: 'Dashboard' },
    { path: '/users', breadcrumbName: 'Users' },
    { path: 'second', breadcrumbName: 'Add new' }
  ]

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
    <PageHeader
      ghost={false}
      title="Create user"
      breadcrumb={{ routes }}
      subTitle="This is a subtitle"
    />
    <Content className="site-layout-background" style={{ padding: 24, margin: 24, minHeight: 280}}>
      <FormUser action="new" member={member} />
    </Content>
    </>
  )
}