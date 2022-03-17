import React, {useEffect, useState} from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Spin } from "antd";
import { Oval } from "react-loader-spinner";
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { clearState, refreshToken } from "../redux/authSlice";

export default function withAuth<T>(WrappedComponent: React.ComponentType<T>) {

  const componentWithAuth = (props: T) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [token, setToken] = useState(null);
    const { userInfo, errorMessage } = useSelector((state: RootState) => state.auth)

    useEffect(()=>{
      const user_token: string = localStorage.getItem('user_token')
      if (user_token) {
        dispatch(refreshToken())
      } else {
        dispatch(clearState())
        router.push('/login')
      }
    },[])

    useEffect(() => {
      if (userInfo) {
        setToken(userInfo.auth_token);
      } else if (errorMessage) {
        dispatch(clearState())
        router.push('/login')
      }
    }, [userInfo, errorMessage])

    if (!token) {
      return (
        <>
        <Head>
          <title>Loading...</title>
        </Head>
        <WrapLoader>
          <Oval color="#00BFFF" />
        </WrapLoader>
        </>
      )
    }

    if (token) {
      return <WrappedComponent 
                user={null}
                isAuthenticated={false}
                authToken={null}
                {...props} 
              />
    } 
  }
  return componentWithAuth;
}

const WrapLoader = styled.div`
  display: flex;
  flext-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 1;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  background: #fff;
`;


// const withAuth = (WrappedComponent: any) => {

//   const ComponentWithAuth = <P extends object>(props: P) => {
//     return (
//       <WrappedComponent {...props} />
//     )
//   }
//   return ComponentWithAuth
// }


// export default withAuth