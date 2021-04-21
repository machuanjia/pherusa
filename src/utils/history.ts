/*
 * @Author: D.Y
 * @Date: 2021-04-20 10:06:53
 * @LastEditTime: 2021-04-20 14:35:32
 * @LastEditors: D.Y
 * @FilePath: /pherusa/src/utils/history.ts
 * @Description: 
 */
/** @format */

import { createBrowserHistory } from 'history'
import { removeToken } from './catch'

export const history = createBrowserHistory()

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
  // history.push('/login')
  removeToken()
  window.location.href = `${window.location.protocol}//${window.location.host}${process.env.PUBLIC_URL}/login`
}
