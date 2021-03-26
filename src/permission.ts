import { find, uniqBy } from 'lodash'

import routes, { asyncRouters, ROUTE_APP_KEY } from '@routes/index'
import store from '@stores/store'
import { getUserInfo } from '@apis/users'
import {
  SET_PERMISSIONS,
  SET_ROLES,
  SET_ROUTERS,
  SET_USET_ID,
  SET_FLATTEN_ROUTERS,
} from '@stores/app/app.types'
import { getToken, redirectTo } from '@utils/index'

import { getRoute } from './utils'

export const whiteList = [`${process.env.PUBLIC_URL}/login`]

export const isPermission = (permission: string): boolean => {
  const permissions = store.getState().app.permissions || []
  return permissions.includes(permission)
}

const hasPermission = (permissions: string[], route) => {
  if (route.meta && route.meta.permission) {
    return permissions.includes(route.meta.permission)
  }
  return true
}

export const getFlattenRoutes = (routeList, flattenRoutes) => {
  routeList.forEach((route) => {
    flattenRoutes.push(route)
    if (route.children) {
      getFlattenRoutes(route.children, flattenRoutes)
    }
  })
}

export const filterFlattenRoutes = (routesList) => {
  const flattenRoutes = []
  getFlattenRoutes(routesList, flattenRoutes)
  return flattenRoutes
}

export const filterAsyncRoutes = (routesList, permissions: string[]) => {
  const res = []
  routesList.forEach((route) => {
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
  const permissions = store.getState().app.permissions || []
  const asyncRoutes = filterAsyncRoutes(asyncRouters, permissions)
  const app = find(routes, (n) => {
    return n.meta.key === ROUTE_APP_KEY
  })
  app &&
    (app.children = uniqBy([...app.children, ...asyncRoutes], (n) => {
      return n.meta.key
    }))
  return routes
}

export const setInfo = async () => {
  try {
    const { data } = await getUserInfo()
    const { roles = [], permissions = [] } = data
    store.dispatch({
      type: SET_USET_ID,
      id: data.majorKeyId,
    })
    store.dispatch({
      type: SET_ROLES,
      roles,
    })
    store.dispatch({
      type: SET_PERMISSIONS,
      permissions,
    })
    const routesArray = getAuthRoutes()
    const flattenRouters = filterFlattenRoutes(routesArray)
    store.dispatch({
      type: SET_ROUTERS,
      routers: routesArray,
    })
    store.dispatch({
      type: SET_FLATTEN_ROUTERS,
      flattenRouters,
    })
  } catch (e) {
    console.log(e)
  }
}

export const checkAuth = async () => {
  if (getToken()) {
    if (whiteList.includes(getRoute())) {
      redirectTo({
        path: `${window.location.protocol}//${window.location.host}${process.env.PUBLIC_URL}/dashboard/index`,
        isHash: false,
      })
    } else {
      if (store.getState().app.id) {
        return
      }
      setInfo()
    }
  } else if (whiteList.includes(getRoute())) {
    console.log('ridirect to route')
  }
}
