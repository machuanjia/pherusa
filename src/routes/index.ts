/** @format */

import { asyncComponent } from '@components/index'
import componentsRoute from './component.route'
import MainLayout from '@layouts/main'
import RouteLayout from '@layouts/route-layout'

export const ROUTE_APP_KEY = 'app'

const AboutView = asyncComponent(() => import('@views/about'))
const RedirectView = asyncComponent(() => import('@views/redirect'))
const LoginView = asyncComponent(() => import('@views/login'))
const NotFontVIew = asyncComponent(() => import('@views/no-fond'))
const DashboardView = asyncComponent(() => import('@views/dashboard'))

// 动态路由，根据后台返回的权限动态生成
export const asyncRouters = [componentsRoute]

// 固定路由
const routes = [
  {
    path: '/login',
    meta: {
      key: 'Login',
      name: 'login',
      isHidden: true,
    },
    component: LoginView,
  },
  {
    path: '/about',
    meta: {
      key: 'About',
      name: 'about',
      isHidden: true,
    },
    component: AboutView,
  },
  {
    path: '/redirect',
    component: RedirectView,
    meta: {
      key: 'Redirect',
      name: 'redirect',
      isHidden: true,
    },
  },
  {
    path: '/',
    component: MainLayout,
    meta: {
      key: ROUTE_APP_KEY,
      name: 'App',
      isHidden: true,
    },
    children: [
      {
        path: '/dashboard',
        component: RouteLayout,
        meta: {
          key: 'Dashboard',
          name: 'Dashboard',
          redirect: '/dashboard/index',
          iconType: 'dashboard',
        },
        children: [
          {
            path: '/dashboard/index',
            component: DashboardView,
            meta: {
              key: 'DashboardIndex',
              name: 'Dashboard',
              iconType: 'dashboard',
            },
          },
        ],
      },
    ],
  },

  {
    path: '/404',
    meta: {
      key: 'NotFond',
      name: 'notFond',
      isHidden: true,
    },
    component: NotFontVIew,
  },
]

export default routes
