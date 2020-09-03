import axios from 'axios'
import { MessageBox, Message, Loading } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'


let loadingHandler = null // loading句柄
let loadingCount = 0 // loading计数器

const handleLoadingClose = () => {
  if (loadingCount > 0) {
    loadingCount--
  }
  if (loadingHandler && !loadingCount) {
    loadingHandler.close()
    loadingHandler = null
  }
}
// create an axios instance
const service = axios.create({
  baseURL: `${process.env.VUE_APP_BASE_API}`, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // if (window.__POWERED_BY_QIANKUN__) {
    //   config.baseURL = `http://${store.state['micro-app-setting'].microAppEntry}${process.env.VUE_APP_BASE_API}`
    // }
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    if (config.loadingText) {
      loadingCount++
      if (!loadingHandler) {
        loadingHandler = Loading.service({ fullscreen: true, text: config.loadingText })
      }
    }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    handleLoadingClose()
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
    handleLoadingClose()

    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
      Message({
        message: res.message || '请求出错，请稍后再试！',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 401 || res.code === 403) {
        MessageBox.confirm(`${res.message}，请点击重新登录，或者去点击取消按钮留在本页面`, '注销确认', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || '请求出错，请稍后再试！'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    handleLoadingClose()
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
