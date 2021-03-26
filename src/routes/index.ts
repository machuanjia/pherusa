/*
 * @Author: xulijing
 * @Date: 2021-02-24 16:42:55
 * @LastEditTime: 2021-03-26 11:35:51
 * @FilePath: /pherusa/src/routes/index.ts
 */
import { asyncComponent } from '@components/index'
import MainLayout from '@layouts/main'
import RouteLayout from '@layouts/route-layout'
import componentsRoute from './component'

export const ROUTE_APP_KEY = 'app'

const AboutView = asyncComponent(() => import('@views/about'))
const RedirectView = asyncComponent(() => import('@views/redirect'))
const LoginView = asyncComponent(() => import('@views/login'))
const NotFontVIew = asyncComponent(() => import('@views/no-fond'))

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
      redirect: '/project'
    },
    children:[]},
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
