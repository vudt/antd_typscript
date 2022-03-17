import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, Row, Col, Radio, DatePicker, Upload, Select, Space, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadFile } from "antd/lib/upload/interface";
import axios from 'axios';
import { createMember, updateMember } from '../../api/member';
import { useRouter } from 'next/router';
import { Member } from '../../models/Member';
import { Spin } from "antd";
const yourhandle = require('countrycitystatejson')
// import {MemberObj} from '../../interfaces/member';

interface PropsFormUser {
  action: string,
  member: Member
}

const FormUser: React.FC<PropsFormUser> = (props) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const router = useRouter()
  const {action, member} = props
  const { Option } = Select
  const [arrCities, setListCity] = useState<string[]>([])
  // console.log(parseInt(router.query.id as string))
  
  useEffect(() => {
    console.log(props.member)
    form.resetFields();

    if (props.member) {
      let images: any[] = []
      if (props.member.images) {
        images = props.member.images
      } 
      setFileList(images)
      if (props.member.country) {
        const listCity: string[] = yourhandle.getStatesByShort(props.member.country)
        setListCity(listCity)
      }
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
    // router.push(`/dashboard/users/edit/5?create=success`, undefined, {shallow: true})
    // console.log(values)
    // return false
    const formData = new FormData()
    for(var key in values) {
      if (key === 'image' || key === 'transfer_history') {
        formData.append(key, JSON.stringify(values[key]))
      } else {
        formData.append(key, values[key])
      }
    }
    
    if (action == 'new') {
      const response = await createMember(formData)
      if (response.id) {
        // redirect
        router.push({
          pathname:  `/dashboard/users/edit/${response.id}`, 
          query: {create: 'success'}
        })
      }
    } else if (action == 'edit') {
      const response = await updateMember(member.id, formData)
      if (response.id) {
        message.success('Updated successfully.');
      }
    }
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

  const renderCountries = () => {
    // const listCountries = yourhandle.getCountries()
    let options = yourhandle.getCountries().map((item: any, index: number) => {
      return (
        <Option key={index} value={item.shortName}>{item.name}</Option>
      )
    })
    return options
  }

  const renderCities = (arrCities: string[]) => {
    if (arrCities.length == 0) return 
    let options = arrCities.map((name: any, index: number) => {
      return (
        <Option key={index} value={name}>{name}</Option>
      )
    })
    return options
  }

  const onChangeCountry = (value: any) => {
    form.setFieldsValue({city: null})
    const listCity: string[] = yourhandle.getStatesByShort(value)
    setListCity(listCity)
  }

  const onChangeCity = (value: any) => {
    console.log(value)
  }

  const onSearch = (value: any) => {
    // console.log(`search ${value}`)
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
    return <div style={{textAlign: 'center', margin: '60px 0'}}><Spin size="large" /></div>
  }

  console.log(props.member)

  return(
    <Form
        form={form}
        name="frmUser"
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        initialValues={{...props.member}}
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
                  {required: props.member.id ? false : true, message: 'Please input your password!'},
                  {min: 6, message: 'Password at least 6 characters!'}, 
                  {max: 20, message: 'Password cannot more than 20 characters!'},
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
                {required: props.member.id ? false : true, message: 'Please confirm your password!'},
                {
                  validator(rule, value) {
                    if (!props.member.id) {
                      if (!value || form.getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                    } else if(form.getFieldValue('password') === value) {
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
              label="Country"
              name="country"
              rules={[{ required: true, message: 'Please input your country!' }]}
            >
              <Select
                showSearch
                placeholder="Select your country"
                optionFilterProp="children"
                onChange={onChangeCountry}
                onSearch={onSearch}
                filterOption={(input, option) => {
                  return (
                    option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0 
                  );
                }}
              >
                { renderCountries() }
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: 'Please input your city!' }]}
            >
              <Select
                showSearch
                placeholder="Select your city"
                optionFilterProp="children"
              >
                { renderCities(arrCities) }
              </Select>
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

          <Col offset={8} span={16}>
            <label style={{display: 'block', margin: '0 0 10px'}}><strong>Transfer history</strong></label>
            <Form.List 
              name="transfer_history"
              rules={[
                {
                  validator: async (_, transfer_history) => {
                    if (!transfer_history || transfer_history.length < 1) {
                      return Promise.reject(new Error('Please add transfer history.'));
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        wrapperCol={{xs: 24}}
                        {...restField}
                        name={[name, 'club_name']}
                        rules={[{ required: true, message: 'Missing Club name' }]}
                      >
                        <Input placeholder="Club Name" style={{ width: '100%' }} />
                      </Form.Item>
                      <Form.Item
                        wrapperCol={{xs: 24}}
                        {...restField}
                        name={[name, 'join_date']}
                        rules={[{ required: true, message: 'Missing start date' }]}
                      >
                        {/* <Input placeholder="Join Date" style={{ width: '100%' }} /> */}
                        <DatePicker placeholder="Join Date" format={'DD/MM/YYYY'} />
                      </Form.Item>
                      <Form.Item
                        wrapperCol={{xs: 24}}
                        {...restField}
                        name={[name, 'fee']}
                        rules={[{ required: true, message: 'Missing fee' }]}
                      >
                        <InputNumber
                          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/\$\s?|(,*)/g, '')}
                          placeholder="Fee" 
                          style={{ width: '100%' }} 
                        />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add transfer history
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
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
        <Form.Item wrapperCol={{ offset: 8, span: 12 }}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
  )
}

export default FormUser;