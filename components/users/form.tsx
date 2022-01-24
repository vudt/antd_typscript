import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, Radio, DatePicker, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UploadFile } from "antd/lib/upload/interface";
import axios from 'axios';
import { createMember } from '../../api/member';
import { useRouter } from 'next/router';
import { Member } from '../../models/Member';
// import {MemberObj} from '../../interfaces/member';

interface PropsFormUser {
  action: string,
  member: Member
}

const FormUser: React.FC<PropsFormUser> = (props) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const router = useRouter()
  // console.log(parseInt(router.query.id as string))
  // console.log(props.member)

  // useEffect(()=>{
  //   if (props.action == 'new') return;
  //   (async () => {
  //     try {
  //       const response = await axios.get('https://corecmms.com/api/v1/pictures')
  //       if (response.data) {
  //         setFileList(response.data)
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   })()
  // }, [])

  useEffect(() => {
    console.log(props.member)
    if (props.member) {
      setFileList(props.member.images)
    }
  },[props.member])

  useEffect(() => {
    // set value field image
    console.log('update field images')
    let fieldValue: any[] = []
    if (fileList) {
      fieldValue = formatImageValues(fileList)
      console.log(fieldValue)
    }
    form.setFieldsValue({image: fieldValue})
  }, [fileList])

  const formatImageValues = (files: any) => {
    const arrImages: any[] = files.map((item: any) => {
      if (item.response) {
        return {id: item.response.id, url: item.response.url}
      } else {
        return {id: item.id, url: item.url}
      } 
    })
    return arrImages
  }

  const labelCol = {
    xs: {offset: 0, span: 24},
    md: {offset: 2, span: 6},
    xl: {offset: 4, span: 4}
  }

  const wrapperCol = { xs: 24, md: 12, xl: 8 }

  const onFinish = async(values: any) => {
    console.log('Success:', values)
    const formData = new FormData()
    for(var key in values) {
      if (key === 'image') {
        formData.append(key, JSON.stringify(values[key]))
      } else {
        formData.append(key, values[key])
      }
      formData.append(key, values[key])
    }
    const response = await createMember(formData)
    console.log(response)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleUpload = async({file, fileList}: any) => {
    try {
      if (file.status) {
        setFileList(fileList)
      } else {
        const newArr: any[] = fileList.filter((item: any) => item.uid !== file.uid)
        console.log(newArr)
        setFileList(newArr)
      }
    } catch(error){
      console.log(error.response)
    }
  }

  const handleRemove = async(file: any) => {
    console.log(file)
    try {
      const result: boolean = confirm('Are your sure?')
      if (result === false) return false;
      if (result === true) {
        let id: any = null
        if (file.response) {
          id = file.response.id          
        } else if(file.id) {
          id = file.id
        }
        const response = await axios.delete(`https://corecmms.com/api/v1/pictures/${id}`)
        console.log(response.data)
        if (response.data.status == true) {
          return true
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleBeforeUpload = (file: any) => {
    console.log(file)
    if (file.size > 2000000) {
      message.error('Uploaded images must not exceed 2mb!');
      return false
    }
    return true
  }

  const validate_confirm_password = async(rule, value) => {
    if (!value || form.getFieldValue('password') === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Confirm password do not match!'))
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  if (!props.member) {
    return null
  }

  console.log(props.member)

  return(
    
    <Form
        form={form}
        name="frmUser"
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        initialValues={props.member}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row>
          <Col span={24}>
            <Form.Item
              label="First Name"
              name="first_name"
              rules={[{ required: true, message: 'Please input your first name!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Last Name"
              name="last_name"
              rules={[{ required: true, message: 'Please input your last name!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Email is not valid!' }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Password"
              name="password"
              rules={
                [
                  {required: true, message: 'Please input your password!'},
                  {min: 6, message: 'Password at least 6 characters!'}, 
                  {max: 20, message: 'Password cannot more than 20 characters!'}
                ]
              }
            >
               <Input.Password />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Confirm Password"
              name="password_confirm"
              rules={[
                {required: true, message: 'Please confirm your password!'},
                // {validator: validate_confirm_password}
                {
                  validator(rule, value) {
                    if (!value || form.getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Confirm password do not match!'))
                  }
                }
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: 'Please input your gender!' }]}
            >
              <Radio.Group>
                <Radio value={1}>Male</Radio>
                <Radio value={0}>Female</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Date of birth"
              name="date_of_birth"
              rules={[{ required: true, message: 'Please input your date of bith!' }]}
            >
              <DatePicker format={'DD/MM/YYYY'} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Gallery"
              name="image"
              rules={[{ required: true, message: 'Please upload your image!' }]}
            >
              <Upload
                accept=".jpg, .png, jpeg"
                name="image"
                action="https://corecmms.com/api/v1/pictures"
                listType="picture-card"
                maxCount={2}
                fileList={fileList}
                onChange={handleUpload}
                onRemove={handleRemove}
                beforeUpload={handleBeforeUpload}
                showUploadList={{showPreviewIcon: false}}
              >
                {fileList.length >= 2 ? null : uploadButton}
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item wrapperCol={{ offset: 12, span: 12 }}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>

      </Form>
  )
}

export default FormUser;