/** @format */

import { IUser } from '@entities/user'
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

export const getUsers = (params = {}) => {
  return request({
    url: '/users',
    method: 'get',
    params,
  })
}

export const createUser = (data: IUser) => {
  return request({
    url: '/users',
    method: 'post',
    data,
  })
}

export const getUserDetail = (id: string, params = {}) => {
  return request({
    url: `/users/${id}`,
    method: 'get',
    params,
  })
}

export const updateUser = (id: string, data: IUser) => {
  return request({
    url: `/users/${id}`,
    method: 'put',
    data,
  })
}

export const deleteUser = (id: string) => {
  return request({
    url: `/users/${id}`,
    method: 'delete',
  })
}
