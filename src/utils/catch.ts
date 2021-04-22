import { getItem, setItem, removeItem } from 'laiye-pro'

const tokenKey = 'authorization'
export const getToken = () => getItem(tokenKey)
export const setToken = (value: string) => setItem(tokenKey, value)
export const removeToken = () => removeItem(tokenKey)
