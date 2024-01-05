import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from './auth'

// create an axios instance
const service = axios.create({
  // baseURL: 'http://localhost:3000', // localhost服务器端接口地址
  baseURL: 'http://10.4.32.45:3000', //  备注：如果是通过ip访问那就需要改成本机的ip地址
  // baseURL: process.env.VUE_APP_BASE_API, // url = baseUrl + requestUrl
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  // }
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    const token = getToken()
    if (token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = token // express-jwt默认获取 authorization 请求头来解析token , 可自定义一些解析逻辑，比如使用其他 Header 字段，自定义抛出异常等, 参考文章 https://www.cnblogs.com/zkqiang/p/11810203.html
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    console.log('相应拦截', response);
    const res = response.data

    // if the custom code is not 200 and 0, it is judged as an error.
    if (res.code !== 200 && res.code !== 0) {
      //  401 无效的token
      if (res.code === 401) {
        // to re-login
        MessageBox.confirm('身份验证失败', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/logout').then(() => {
            location.reload()
          })
        })
        return
      }
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    else {
      return res
    }
  },
  error => {
    console.log(error); // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
