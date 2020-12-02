/** @format */

import routes, { asyncRouters } from '@routes/index'
import { map, concat, uniq } from 'lodash'
import store from '@stores/store'
import { getUserInfo } from '@apis/users'
import { SET_ROLES } from '@stores/app/app-types'
import { getToken } from '@utils/catch'

export const checkAuth = async () => {
    return
    if (!getToken()) {
        return
    }
    try {
        const { data } = await getUserInfo()
        if (data && data.roles) {
            store.dispatch({
                type: SET_ROLES,
                roles: data.roles,
            })
        }
    } catch (e) {}
}

export const APP_PERMISSIONS = {
    market: ['market*', 'market.sale*', 'market.activities*', 'market.solution*', 'market.price*'],
    train: ['train*', 'train.center*', 'train.engineer*', 'train.shooting*', 'train.instructor*', 'train.resource*'],
    operate: ['operate*', 'operate.info*', 'operate.sign*', 'operate.certificate*'],
    product: ['product*', 'product.download*', 'product.trial*', 'product.faq*', 'product.support*'],
    project: ['project*', 'project.club*', 'project.report*'],
}

export const ROLE_PERMISSIONS = {
    admin: [
        ...APP_PERMISSIONS.market,
        ...APP_PERMISSIONS.train,
        ...APP_PERMISSIONS.operate,
        ...APP_PERMISSIONS.product,
        ...APP_PERMISSIONS.project,
    ],
    channelManager: [
        ...APP_PERMISSIONS.market,
        ...APP_PERMISSIONS.train,
        ...APP_PERMISSIONS.operate,
        ...APP_PERMISSIONS.product,
        ...APP_PERMISSIONS.project,
    ],
    staff: [
        ...APP_PERMISSIONS.market,
        ...APP_PERMISSIONS.train,
        ...APP_PERMISSIONS.operate,
        ...APP_PERMISSIONS.product,
        ...APP_PERMISSIONS.project,
    ],
    junior: [
        ...APP_PERMISSIONS.market,
        ...APP_PERMISSIONS.train,
        ...APP_PERMISSIONS.operate,
        ...APP_PERMISSIONS.product,
        ...APP_PERMISSIONS.project,
    ],
    middle: [
        ...APP_PERMISSIONS.market,
        ...APP_PERMISSIONS.train,
        ...APP_PERMISSIONS.operate,
        ...APP_PERMISSIONS.product,
        ...APP_PERMISSIONS.project,
    ],
    senior: [
        ...APP_PERMISSIONS.market,
        ...APP_PERMISSIONS.train,
        ...APP_PERMISSIONS.operate,
        ...APP_PERMISSIONS.product,
        ...APP_PERMISSIONS.project,
    ],
    sub: [
        ...APP_PERMISSIONS.market,
        ...APP_PERMISSIONS.train,
        ...APP_PERMISSIONS.operate,
        ...APP_PERMISSIONS.product,
        ...APP_PERMISSIONS.project,
    ],
    invalid: [],
    pending: [
        ...APP_PERMISSIONS.market,
        ...APP_PERMISSIONS.train,
        ...APP_PERMISSIONS.operate,
        ...APP_PERMISSIONS.product,
        ...APP_PERMISSIONS.project,
    ],
}

const hasPermission = (permissions: string[], route) => {
    if (route.meta && route.meta.permission) {
        return permissions.includes(route.meta.permission)
    } else {
        return true
    }
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
    const roles = store.getState()['app']['roles'] || []
    let asyncRoutes = []
    let permissions = []
    map(roles, role => {
        permissions = concat(permissions, ROLE_PERMISSIONS[role])
    })
    permissions = uniq(permissions)
    asyncRoutes = filterAsyncRoutes(asyncRouters, permissions)
    return [...routes, ...asyncRoutes]
}
