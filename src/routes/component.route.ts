/** @format */

import { AsyncComponent } from '@components/index'
import MainLayout from '@layouts/main'
const TableView = AsyncComponent(() => import('@views/comps/table/index'))
const EditorView = AsyncComponent(() => import('@views/comps/editor/index'))

const componentsRoute = {
    path: '/components',
    component: MainLayout,
    meta: {
        key: 'Components',
        name: '组件',
        iconType: 'appstore',
    },
    children: [
        {
            path: '/components/list',
            component: TableView,
            meta: {
                key: 'CList',
                name: '列表',
                iconType: 'table',
            },
        },
        {
          path: '/components/editor',
          component: EditorView,
          meta: {
              key: 'CEditor',
              name: '富文本',
              iconType: 'table',
          },
      },
    ],
}
export default componentsRoute
