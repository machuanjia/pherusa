/** @format */

import axios from 'axios'
import { removeToken } from '@utils/catch'
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
        // code == 200: success
        // code == 4000 session失效, 需要退出登录
        const res = response.data
        if (res.code !== 200) {
            if (res.code === 4000) {
                confirm({
                    title: '确定登出',
                    content: '你已被登出，可以取消继续留在该页面，或者重新登录?',
                    onOk() {
                        logout()
                    },
                    onCancel() {},
                })
            } else {
                message.error(message.error(res.message || 'Something is error!'))
            }
            return Promise.reject(new Error(res.message || 'Error'))
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
