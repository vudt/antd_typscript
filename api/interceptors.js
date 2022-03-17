import axios from "axios";

const instance = axios.create({
  baseURL: process.env.END_POINT,
  headers: {
    "Content-Type": "application/json",
  },
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('user_token')
    if (token) {
      // config.headers["Authorization"] = 'Bearer ' + token;
      config.headers["Authorization"] = token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // console.log(error.config)
    // console.log(error.response)
    const originalConfig = error.config
    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      try {
        const params = {username: process.env.AUTH_USERNAME, password: process.env.AUTH_PASSWORD}
        const resp = await instance.post(`${process.env.END_POINT}/api/user/login`, params)
        if (resp.data.token) {
          localStorage.setItem('authToken', resp.data.token)
        }
        return instance(originalConfig)
      } catch (err) {
        return Promise.reject(err)
      }
    }
    return Promise.reject(error);
  }
);

export default instance;