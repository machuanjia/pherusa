/** @format */

import { AsyncComponent } from '@components/index'
import bpmnRoute from './bpmn.route'
import componentsRoute from './component.route'
import MainLayout from '@layouts/main'

const AboutView = AsyncComponent(() => import('@views/about'))
const RedirectView = AsyncComponent(() => import('@views/redirect'))
const LoginView = AsyncComponent(() => import('@views/login'))
const NotFontVIew = AsyncComponent(() => import('@views/no-fond'))
const DashboardView = AsyncComponent(() => import('@views/dashboard'))

//动态路由，根据后台返回的权限动态生成
export const asyncRouters = [bpmnRoute, componentsRoute]

//固定路由
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
      key: 'about',
      name: 'about',
      isHidden: true,
    },
    component: AboutView,
  },
  {
    path: '/',
    exact: true,
    component: RedirectView,
    meta: {
      key: 'Redirect',
      name: 'redirect',
      isHidden: true,
    },
  },
  {
    path: '/dashboard',
    component: MainLayout,
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
