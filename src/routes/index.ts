/*
 * @Author: xulijing
 * @Date: 2021-02-24 16:42:55
 * @LastEditTime: 2021-04-27 15:43:16
 * @FilePath: /pherusa/src/routes/index.ts
 */
import { asyncComponent } from 'laiye-pro'
import MainLayout from '@layouts/main'
import componentsRoute from './component'
import { NoFond } from 'laiye-pro'
import i18n from 'i18next'

export const ROUTE_APP_KEY = 'app'

const LoginView = asyncComponent(() => import('@views/login'))
const DashboardView = asyncComponent(() => import('@views/dashboard'))

// 动态路由，根据后台返回的权限动态生成
export const asyncRouters = [componentsRoute]

// 固定路由
const routes = [
  {
    path: '/login',
    meta: {
      key: 'Login',
      name: i18n.t('login'),
      isHidden: true,
    },
    component: LoginView,
  },
  {
    path: '/',
    component: MainLayout,
    meta: {
      key: ROUTE_APP_KEY,
      name: i18n.t('App'),
      isHidden: true,
    },
    children: [
      {
        path: '/dashboard',
        component: DashboardView,
        meta: {
          key: 'Dashboard',
          name: i18n.t('router.dashboard'),
          icon: 'dashboard'
        },
      },
    ],
  },
  {
    path: '/404',
    meta: {
      key: 'NotFond',
      name: i18n.t('notFond'),
      isHidden: true,
    },
    component: NoFond,
  },
]

export default routes
