/** @format */

import store from '@stores/store'
// import Cookies from 'js-cookie'

const tokenKey = 'laiye.authorization' 
export const getToken = () => localStorage.getItem(tokenKey)
export const setToken = (value: string) => localStorage.setItem(tokenKey, value)
export const removeToken = () => localStorage.removeItem(tokenKey)

export const getSignAgreement = () => {
  const signAgreement = `${store.getState().app.id}-sign-agreement`
  return localStorage.getItem(signAgreement)
}
export const setSignAgreement = (value: boolean) => {
  const signAgreement = `${store.getState().app.id}-sign-agreement`
  return localStorage.setItem(signAgreement, value.toString())
}
export const removeSignAgreement = () => {
  const signAgreement = `${store.getState().app.id}-sign-agreement`
  localStorage.removeItem(signAgreement)
}

export const getSignConfirm = () => {
  const signConfirm = `${store.getState().app.id}-sign-confirm`
  return localStorage.getItem(signConfirm)
}
export const setSignConfirm = (value: boolean) => {
  const signConfirm = `${store.getState().app.id}-sign-confirm`
  return localStorage.setItem(signConfirm, value.toString())
}
export const removeSignConfirm = () => {
  const signConfirm = `${store.getState().app.id}-sign-confirm`
  localStorage.removeItem(signConfirm)
}

const warnKey = 'laiye.partner.warn'
export const getWarnKey = () => {
  return localStorage.getItem(warnKey)
}
export const setWarnKey = () => {
  return localStorage.setItem(warnKey, 'true')
}
export const removeWarnKey = () => {
  localStorage.removeItem(warnKey)
}
