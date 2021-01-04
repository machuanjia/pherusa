/** @format */

import { AsyncComponent } from '@components/index'
import RouteLayout from '@layouts/route-layout'
const TableView = AsyncComponent(() => import('@views/comps/table/index'))
const EditorView = AsyncComponent(() => import('@views/comps/editor/index'))
const GraphLayoutView = AsyncComponent(() => import('@views/comps/graph-layout/index'))
const CytoscapeView = AsyncComponent(() => import('@views/comps/cytoscape/index'))
const X6View = AsyncComponent(() => import('@views/comps/x6/index'))
const BpmnView = AsyncComponent(() => import('@views/bmpn/index'))

const componentsRoute = {
  path: '/components',
  component: RouteLayout,
  meta: {
    key: 'Components',
    name: '组件',
    iconType: 'component',
  },
  children: [
    {
      path: '/components/list',
      component: TableView,
      meta: {
        key: 'CList',
        name: '列表',
        iconType: 'list',
      },
    },
    {
      path: '/components/editor',
      component: EditorView,
      meta: {
        key: 'CEditor',
        name: '富文本',
        iconType: 'editor',
      },
    },
    {
      path: '/components/graph-layout',
      component: GraphLayoutView,
      meta: {
        key: 'GraphLayout',
        name: '画布布局',
        iconType: 'layout',
      },
    },
    {
      path: '/components/cytoscape',
      component: CytoscapeView,
      meta: {
        key: 'Cytoscape',
        name: 'Cytoscape',
        iconType: 'cytoscape',
      },
    },
    {
      path: '/components/x6',
      component: X6View,
      meta: {
        key: 'X6',
        name: 'X6',
        iconType: 'x6',
      },
    },
    {
      path: '/components/bpmn',
      component: BpmnView,
      meta: {
        key: 'BpmnEditor',
        name: 'Bpmn编辑器',
        iconType: 'bpmn',
      },
    },
  ],
}
export default componentsRoute
