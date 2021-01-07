import { asyncComponent } from '@components/index';
import RouteLayout from '@layouts/route-layout';

const tableView = asyncComponent(() => import('@views/comps/table/index'));
const editorView = asyncComponent(() => import('@views/comps/editor/index'));
const graphLayoutView = asyncComponent(() => import('@views/comps/graph-layout/index'));
const cytoscapeView = asyncComponent(() => import('@views/comps/cytoscape/index'));
const x6View = asyncComponent(() => import('@views/comps/x6/index'));
const bpmnView = asyncComponent(() => import('@views/bmpn/index'));

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
    },
    {
      path: '/components/editor',
      component: editorView,
      meta: {
        key: 'CEditor',
        name: 'router.editor',
        iconType: 'editor',
      },
    },
    {
      path: '/components/graph-layout',
      component: graphLayoutView,
      meta: {
        key: 'GraphLayout',
        name: 'router.layout',
        iconType: 'layout',
      },
    },
    {
      path: '/components/cytoscape',
      component: cytoscapeView,
      meta: {
        key: 'Cytoscape',
        name: 'Cytoscape',
        iconType: 'cytoscape',
      },
    },
    {
      path: '/components/x6',
      component: x6View,
      meta: {
        key: 'X6',
        name: 'X6',
        iconType: 'x6',
      },
    },
    {
      path: '/components/bpmn',
      component: bpmnView,
      meta: {
        key: 'BpmnEditor',
        name: 'Bpmn',
        iconType: 'bpmn',
      },
    },
  ],
};
export default componentsRoute;
