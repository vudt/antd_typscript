import axios, {AxiosError} from "axios";

interface ILogin {
  email: string,
  password: string
}

async function userLogin(params: ILogin) {
  try {
    console.log(params)
    const response = await axios.post('https://corecmms.com/api/v1/login', params)
    return response.data
  } catch (error) {
    const { response } = error as AxiosError;
    console.log(response)
    console.log(error)
    console.log(error.response)
  }
}

async function refreshToken() {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('user_token')
    }
    const response = await axios.post('https://corecmms.com/api/v1/refresh-token', null, {headers: headers})
    return response.data
  } catch (error) {
    console.log(error)
  }
}

async function userLogout() {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('user_token')
    }
    const response = await axios.post('https://corecmms.com/api/v1/logout', null, {headers: headers})
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export default { userLogin, userLogout, refreshToken }