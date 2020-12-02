/** @format */

import { AsyncComponent } from '@components/index'
import MainLayout from '@layouts/main'
const FileView = AsyncComponent(() => import('@views/file/file.view'))

const marketRoute = {
    path: '/market',
    component: MainLayout,
    meta: {
        key: 'Market',
        name: '营销与销售',
        className: 'menu',
        permission: 'market*',
    },
    children: [
        {
            path: '/market/sale',
            component: FileView,
            meta: {
                key: 'MarketSale',
                name: '销售工具包',
                className: 'sub-menu',
                permission: 'market.sale*',
            },
        },
        {
            path: '/market/activities',
            component: FileView,
            meta: {
                key: 'MarketActivities',
                name: '市场活动工具包',
                className: 'sub-menu',
                permission: 'market.activities*',
            },
        },
        {
            path: '/market/solution',
            component: FileView,
            meta: {
                key: 'MarketSolution',
                name: '解决方案',
                className: 'sub-menu',
                permission: 'market.solution*',
            },
        },
        {
            path: '/market/price',
            component: FileView,
            meta: {
                key: 'MarketPrice',
                name: '产品价格表',
                className: 'sub-menu',
                permission: 'market.price*',
            },
        },
    ],
}
export default marketRoute
