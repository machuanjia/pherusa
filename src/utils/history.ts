/** @format */

import { createBrowserHistory } from 'history'
import { message } from 'laiye-antd'
const history = createBrowserHistory()

export const redirectTo = (option: { path: string; isHash?: boolean }) => {
    const { path, isHash = true } = option
    isHash ? history.push(path) : (window.location.href = path)
}

export const replaceTo = (option: { path: string }) => {
    const { path } = option
    history.replace(path)
    history.go(1)
}

export const getRoute = () => {
    return history.location.pathname
}

export const logout = () => {
    // message.warn('登录已超期，请重新登录!')
    window.location.href = `${window.location.protocol}//${window.location.host}${process.env.PUBLIC_URL}/login`
}
