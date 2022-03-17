import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';
import { login, clearState, userLogin } from '../redux/authSlice';
import { RootState, useAppSelector } from '../redux/store';
import { AuthState } from '../interfaces/auth';
import { useRouter } from 'next/router';

const LoginForm = (props) => {

  const dispatch = useDispatch()
  const router = useRouter()
  // const { isLogged, isLoading, userInfo, errorMessage } = useSelector((state: RootState) => state.auth)
  const { isLogged, isLoading, errorMessage } = useAppSelector(state => state.auth)

  useEffect(()=> {
    if (errorMessage) {
      message.error(errorMessage);
      dispatch(clearState())
    } 
  }, [errorMessage])

  useEffect(() => {
    if (isLogged) {
      router.push('/dashboard/users')
    }
  }, [isLogged])

  const submitForm = async(values: any) => {
    dispatch(userLogin(values))
  }

  return (
    <>
    <Form
      name="login"
      labelCol={{span: 8}}
      wrapperCol={{span: 16}}
      onFinish={submitForm}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="email"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isLoading ? true : false}>
          Login
        </Button>
      </Form.Item>
    </Form>
    </>
  )
}

export default LoginForm