/** @format */

import routes, { asyncRouters } from '@routes/index'
import store from '@stores/store'
import { getUserInfo } from '@apis/users'
import { SET_PERMISSIONS, SET_ROLES, SET_ROUTERS, SET_USET_ID, SET_FLATTEN_ROUTERS } from '@stores/app/app.types'
import { getRoute } from './utils'

export const whiteList = [`${process.env.PUBLIC_URL}/login`]

export const checkAuth = async () => {
  if (whiteList.includes(getRoute())) {
    return
  }
  if (store.getState().app.roles.length > 0) {
    return
  }
  setInfo()
}

export const setInfo = async () => {
  try {
    const { data } = await getUserInfo()
    if (data && data.roles) {
      store.dispatch({
        type: SET_USET_ID,
        id: data.majorKeyId,
      })
      store.dispatch({
        type: SET_ROLES,
        roles: data.roles,
      })
      store.dispatch({
        type: SET_PERMISSIONS,
        permissions: data.permissions,
      })
      const allRoutes = getAuthRoutes()
      const flattenRouters = filterFlattenRoutes(allRoutes)
      store.dispatch({
        type: SET_ROUTERS,
        routers: allRoutes,
      })
      store.dispatch({
        type: SET_FLATTEN_ROUTERS,
        flattenRouters: flattenRouters,
      })
    }
  } catch (e) {}
}

export const isPermission = (permission: string): boolean => {
  const permissions = store.getState()['app']['permissions'] || []
  return permissions.includes(permission)
}

const hasPermission = (permissions: string[], route) => {
  if (route.meta && route.meta.permission) {
    return permissions.includes(route.meta.permission)
  } else {
    return true
  }
}

export const getFlattenRoutes = (routes, flattenRoutes) => {
  routes.forEach(route => {
    flattenRoutes.push(route)
    if (route.children) {
      getFlattenRoutes(route.children, flattenRoutes)
    }
  })
}

export const filterFlattenRoutes = routes => {
  let flattenRoutes = []
  getFlattenRoutes(routes, flattenRoutes)
  return flattenRoutes
}

export const filterAsyncRoutes = (routes, permissions: string[]) => {
  const res = []
  routes.forEach(route => {
    const r = { ...route }
    if (hasPermission(permissions, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, permissions)
      }
      res.push(r)
    }
  })
  return res
}

export const getConstantRoutes = () => {
  return [...routes]
}

export const getAuthRoutes = () => {
  const permissions = store.getState()['app']['permissions'] || []
  const asyncRoutes = filterAsyncRoutes(asyncRouters, permissions)
  return [...routes, ...asyncRoutes]
}
