/** @format */

import axios from 'axios'
import { Modal, message } from 'laiye-antd'
import { logout } from '@utils/index'

const { confirm } = Modal

const service = axios.create({
  baseURL: APP_CONFIGRATION.api,
  timeout: 5000,
  // withCredentials: true // send cookies when cross-domain requests
})

// Request interceptors
service.interceptors.request.use(
  config => {
    // config.headers['authorization'] = 'Bearer ' + getToken()
    return config
  },
  error => {
    Promise.reject(error)
  },
)
// Response interceptors
service.interceptors.response.use(
  response => {
    // noPermission = 10001,
    // invalidCaptcha = 10003,
    // userNotLogin = 10004,
    // notAllowSign = 10005,
    // notHasLicense = 10006,
    // copiedPartner = 10007,
    // invalidChannelManager = 10008
    const res = response.data
    if (res.code !== 200) {
      if (res.code === 10001) {
        message.error('没有权限登录，请联系渠道经理!')
      } else if (res.code === 10003) {
        message.error('验证码无效!')
      } else if (res.code === 10004) {
        message.error('用户没有登录，请重新登录!')
        logout()
      } else if (res.code === 10010) {
        logout()
      }
      // else {
      //     message.error(res.message || 'Something is error!')
      // }
      return Promise.reject(res)
    } else {
      return response.data
    }
  },
  error => {
    // alert error.message
    return Promise.reject(error)
  },
)

export default service
