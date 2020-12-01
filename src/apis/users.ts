/** @format */

import request from '@utils/request'

export const signIn = (data: { phone: string; captcha: string }) => {
    return request({
        url: '/auth/login',
        method: 'post',
        data,
    })
}

export const getUserInfo = (params = {}) => {
    return request({
        url: '/auth/user',
        method: 'get',
        params,
    })
}
