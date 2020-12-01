/** @format */

import { createBrowserHistory } from 'history'
import { removeToken } from './catch'
const history = createBrowserHistory()

export const redirectTo = (option: { path: string; isHash: boolean }) => {
    const { path, isHash = true } = option
    isHash ? history.push(path) : (window.location.href = path)
}

export const logout = () => {
    removeToken()
    window.location.href = `${window.location.protocol}//${window.location.host}/login`
}
