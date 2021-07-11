import axios from 'axios'
import { Notification } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
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
    // const res = response.data
    // return res
    // return Promise.reject(new Error(res.message || 'Error'))
    return response
  },
  error => {
    console.log(error) // for debug
    let message = error.response.data.message
    if (!message) {
      message = error.message
    }

    if (error.response.status === 401) {
      Notification({
        title: 'Warning',
        message: message,
        duration: 5 * 1000,
        type: 'warning'
      })
      store.dispatch('user/resetToken').then(() => {
        if (router.currentRoute.path !== '/login') {
          router.push('/login')
        }
      })
    } else if (error.response.status >= 400) {
      const errors = error.response.data.errors
      if (errors && errors.length > 0) {
        message = `${errors[0].field} ${errors[0].default_message}`
      }
      Notification({
        title: 'Error',
        message: message,
        duration: 0,
        type: 'error'
      })
    }

    return Promise.reject(error)
  }
)

export default service
