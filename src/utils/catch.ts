/** @format */

import Cookies from 'js-cookie'

const tokenKey = 'token' //authorization
export const getToken = () => Cookies.get(tokenKey)
export const setToken = (value: string) => Cookies.set(tokenKey, value)
export const removeToken = () => Cookies.remove(tokenKey)
