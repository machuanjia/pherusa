/** @format */

import { AsyncComponent } from '@components/index'
import MainLayout from '@layouts/main'

const OperateInfoView = AsyncComponent(() => import('@views/operate/info/operate-info.view'))
const OperateSignView = AsyncComponent(() => import('@views/operate/sign/operate-sign.view'))
const OperateCertificateView = AsyncComponent(() => import('@views/operate/certificate'))
// const OperateAdminView = AsyncComponent(() => import('@views/Operate/admin'))

const operateRoute = {
    path: '/operate',
    component: MainLayout,
    meta: {
        key: 'Operate',
        name: '经营与管理',
        className: 'menu',
        permission: 'operate*',
    },
    children: [
        {
            path: '/operate/info',
            component: OperateInfoView,
            meta: {
                key: 'OperateInfo',
                name: '公司信息管理',
                className: 'menu',
                permission: 'operate.info*',
            },
        },
        {
            path: '/operate/sign',
            component: OperateSignView,
            meta: {
                key: 'OperateSign',
                name: '线上签约及续约',
                className: 'menu',
                permission: 'operate.sign*',
            },
        },
        {
            path: '/operate/certificate',
            component: OperateCertificateView,
            meta: {
                key: 'OperateCertificate',
                name: '合作伙伴证书下载',
                className: 'menu',
                permission: 'operate.certificate*',
            },
        },
    ],
}
export default operateRoute
