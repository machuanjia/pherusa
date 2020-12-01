/** @format */

import { AsyncComponent } from '@components/index'
import MainLayout from '@layouts/main/main.layout'
const ProductDocView = AsyncComponent(() => import('../views/product/product-doc.view'))
const ProductTrialView = AsyncComponent(() => import('../views/product/product-trial.view'))
// const ProductFAQView = AsyncComponent(() => import('../views/product/product-faq.view'))
const ProductSupportView = AsyncComponent(() => import('../views/product/product-support.view'))

const productRoute = {
    path: '/product',
    component: MainLayout,
    meta: {
        key: 'Product',
        name: '产品与售后',
        className: 'menu',
        permission: 'product*',
    },
    children: [
        {
            path: '/product/download',
            component: ProductDocView,
            meta: {
                key: 'ProductDownload',
                name: '企业版产品下载',
                className: 'menu',
                permission: 'product.download*',
            },
        },
        {
            path:
                'https://www.fxiaoke.com/XV/Home/Index?upstreamEa=zhulilaiye&fsAppId=FSAID_11490f80#prm/list/=/object_a0h2V__c',
            component: ProductTrialView,
            meta: {
                key: 'ProductTrial',
                name: '企业版产品试用申请',
                className: 'menu',
                isLink: true,
                permission: 'product.trial*',
            },
        },
        {
            path: '/product/faq',
            component: ProductDocView,
            meta: {
                key: 'ProductFAQ',
                name: '常见问题',
                className: 'menu',
                permission: 'product.faq*',
            },
        },
        {
            path: 'https://laiye.kf5.com',
            component: ProductSupportView,
            meta: {
                key: 'ProductSupport',
                name: '售后支持',
                className: 'menu',
                isLink: true,
                permission: 'product.support*',
            },
        },
    ],
}

export default productRoute
