/** @format */

import { AsyncComponent } from '@components/index'
import RouteLayout from '@layouts/route-layout'
const TableView = AsyncComponent(() => import('@views/comps/table/index'))
const EditorView = AsyncComponent(() => import('@views/comps/editor/index'))
const GraphLayoutView = AsyncComponent(() => import('@views/comps/graph-layout/index'))
const CytoscapeView = AsyncComponent(() => import('@views/comps/cytoscape/index'))
const X6View = AsyncComponent(() => import('@views/comps/x6/index'))

const componentsRoute = {
  path: '/components',
  component: RouteLayout,
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
    {
      path: '/components/graph-layout',
      component: GraphLayoutView,
      meta: {
        key: 'GraphLayout',
        name: '画布布局',
        iconType: 'LayoutOutlined',
      },
    },
    {
      path: '/components/cytoscape',
      component: CytoscapeView,
      meta: {
        key: 'Cytoscape',
        name: 'Cytoscape',
        iconType: 'LayoutOutlined',
      },
    },
    {
      path: '/components/x6',
      component: X6View,
      meta: {
        key: 'X6',
        name: 'X6',
        iconType: 'LayoutOutlined',
      },
    },
  ],
}
export default componentsRoute
