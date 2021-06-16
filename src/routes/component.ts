/*
 * @Author: D.Y
 * @Date: 2021-02-04 15:27:20
 * @LastEditTime: 2021-04-26 17:31:33
 * @LastEditors: D.Y
 * @FilePath: /pherusa/src/routes/component.ts
 * @Description:
 */
import { asyncComponent } from 'pherusa-pro'
import RouteLayout from '@layouts/route-layout'
import i18n from 'i18next'

const tableView = asyncComponent(() => import('@views/comps/table/index'))

const componentsRoute = {
  path: '/components',
  component: RouteLayout,
  meta: {
    key: 'Components',
    name: i18n.t('router.component'),
    icon: 'table',
  },
  children: [
    {
      path: '/components/list',
      component: tableView,
      meta: {
        key: 'CList',
        name: i18n.t('router.list'),
        icon: 'table'
      },
    }
  ],
}
export default componentsRoute
