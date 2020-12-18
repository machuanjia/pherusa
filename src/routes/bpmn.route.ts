/** @format */

import { AsyncComponent } from '@components/index'
import MainLayout from '@layouts/main'
const BpmnView = AsyncComponent(() => import('@views/bmpn/index'))

const bpmnRoute = {
  path: '/bpmn',
  component: MainLayout,
  meta: {
    key: 'Bpmn',
    name: '业务流程',
    iconType: 'pie-chart',
    permission: 'bpmn*',
  },
  children: [
    {
      path: '/bpmn/index',
      component: BpmnView,
      meta: {
        key: 'BpmnEditor',
        name: 'Bpmn编辑器',
        iconType: 'line-chart',
        permission: 'bpmn.editor*',
      },
    },
  ],
}
export default bpmnRoute
