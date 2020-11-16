/** @format */

import axios from 'axios'
// import { getToken } from '@utils/catch'

const service = axios.create({
    baseURL: APP_CONFIGRATION.env.api, //process.env.REACT_APP_BASE_API, // url = base url + request url
    timeout: 5000,
    // withCredentials: true // send cookies when cross-domain requests
})

// Request interceptors
service.interceptors.request.use(
    config => {
        // Add X-Access-Token header to every request, you can add other custom headers here
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
        // Some example codes here:
        // code == 20000: success
        // code == 50001: invalid access token
        // code == 50002: already login in other place
        // code == 50003: access token expired
        // code == 50004: invalid user (user not exist)
        // code == 50005: username or password is incorrect
        const res = response.data
        if (res.code !== 20000) {
            // alert error
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // 你已被登出，可以取消继续留在该页面，或者重新登录
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
