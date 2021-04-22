/*
 * @Author: D.Y
 * @Date: 2021-02-04 15:27:20
 * @LastEditTime: 2021-04-22 19:25:10
 * @LastEditors: D.Y
 * @FilePath: /pherusa/src/routes/component.ts
 * @Description: 
 */
import { asyncComponent } from '@components/index';
import RouteLayout from '@layouts/route-layout';

const tableView = asyncComponent(() => import('@views/comps/table/index'));

const componentsRoute = {
  path: '/components',
  component: RouteLayout,
  meta: {
    key: 'Components',
    name: 'router.component',
    iconType: 'component',
  },
  children: [
    {
      path: '/components/list',
      component: tableView,
      meta: {
        key: 'CList',
        name: 'router.list',
        iconType: 'list',
      },
    }
  ],
};
export default componentsRoute;
