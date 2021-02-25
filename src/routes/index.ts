/*
 * @Author: xulijing
 * @Date: 2021-02-24 16:42:55
 * @LastEditTime: 2021-02-25 17:47:15
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
const ProjectView = asyncComponent(() => import('@views/project'))
const ProjectLabelView = asyncComponent(() => import('@views/label'))
const ProjectDataView = asyncComponent(() => import('@views/data'))
const ProjectMarkFileView = asyncComponent(() => import('@views/mark-file'))
const ProjectMarkTextView = asyncComponent(() => import('@views/mark-txt'))

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
    children: [
      {
        path: '/project',
        component: ProjectView,
        meta: {
            key: 'Project',
            name: '项目管理',
            iconType: 'desktop',
            redirect: '/project'
          }
      },{
          path: '/label',
          component: ProjectLabelView,
          meta: {
            key: 'ProjectLabelView',
            name: '标签管理',
            isHidden: true,
          }
      }, {
          path: '/data',
          component: ProjectDataView,
          meta: {
            key: 'ProjectDataView',
            name: '数据管理',
            isHidden: true,
          },
      },{
        path: '/mark_txt',
        component: ProjectMarkTextView,
        meta: {
          key: 'ProjectMarkTextView',
          name: '文本标注',
          isHidden: true,
        },
    },{
      path: '/mark_file',
      component: ProjectMarkFileView,
      meta: {
        key: 'ProjectMarkFileView',
        name: '文档标注',
        isHidden: true,
      },
    }
  ]},
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
