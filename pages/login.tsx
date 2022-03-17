import React, { useEffect, useState } from 'react'
import { Col } from 'antd';
import Head from 'next/head';
import styled from 'styled-components';
import LoginForm from '../components/LoginForm';
import { useRouter } from 'next/router';
import { clearState } from '../redux/authSlice';

const Login = () => {
  const router = useRouter()
  const [isDisplay, setDisplay] = useState<boolean>(false)
  
  useEffect(() => {
    const user_token = localStorage.getItem('user_token')
    if (user_token) {
      router.push('/dashboard/users')
    } else {
      setDisplay(true)
    }
  }, [])  

  if (!isDisplay) {
    return (
      <>
        <Head>
          <title>Loading...</title>
        </Head>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Col offset={8} span={8}>
        <WrapperFormLogin>
          <Title>Login</Title>
          <LoginForm />
        </WrapperFormLogin>
      </Col>
    </>
  )
}

const WrapperFormLogin = styled.div`
  margin: 60px 0 30px;
  padding: 45px 30px 30px 30px;
  background: #fff;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.5em;
  margin: 0 0 30px;
`;

export async function getServerSideProps(context: any) {
  return {
		props: {
			layout: 'Login'
		}
	}
}

// Login.layout = "Login";
export default Login;