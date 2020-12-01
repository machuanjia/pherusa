/** @format */

import { AsyncComponent } from '@components/index'
import marketRoute from './market.route'
import projectRoute from './project.route'
import productRoute from './product.route'
import trainRoute from './train.route'
import managementRoute from './operate.route'

const AboutView = AsyncComponent(() => import('../views/about/about.view'))
const RedirectView = AsyncComponent(() => import('../views/redirect/redirect.view'))
const LoginView = AsyncComponent(() => import('../views/login/login.view'))
const NotFontVIew = AsyncComponent(() => import('../views/no-fond/no-font.view'))

//动态路由，根据后台返回的权限动态生成
export const asyncRouters = [marketRoute, projectRoute, productRoute, trainRoute, managementRoute]

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
