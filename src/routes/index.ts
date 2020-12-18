/** @format */

import { AsyncComponent } from '@components/index'
import marketRoute from './market.route'
import projectRoute from './project.route'
import productRoute from './product.route'
import trainRoute from './train.route'
import managementRoute from './operate.route'
import bpmnRoute from './bpmn.route'
import MainLayout from '@layouts/main'

const AboutView = AsyncComponent(() => import('@views/about'))
const RedirectView = AsyncComponent(() => import('@views/redirect'))
const LoginView = AsyncComponent(() => import('@views/login'))
const NotFontVIew = AsyncComponent(() => import('@views/no-fond'))
const DashboardView = AsyncComponent(() => import('@views/dashboard'))

//动态路由，根据后台返回的权限动态生成
export const asyncRouters = [bpmnRoute]

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
            name: 'dashboard',
            redirect: '/dashboard/index',
            iconType:'dashboard'
        },
        children: [
            {
                path: '/dashboard/index',
                component: DashboardView,
                meta: {
                    key: 'DashboardIndex',
                    name: 'dashboardIndex',
                    className: 'sub-menu',
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
