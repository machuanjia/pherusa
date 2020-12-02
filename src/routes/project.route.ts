/** @format */

import { AsyncComponent } from '@components/index'
import MainLayout from '@layouts/main'
const ProjectClueView = AsyncComponent(() => import('@views/project/project-clue.view'))
const ProjectReportView = AsyncComponent(() => import('@views/project/project-report.view'))

const projectRoute = {
    path: '/project',
    component: MainLayout,
    meta: {
        key: 'Project',
        name: '项目与交易',
        className: 'menu',
        permission: 'project*',
    },
    children: [
        {
            path: '/project/club',
            component: ProjectClueView,
            meta: {
                key: 'ProjectClue',
                name: '线索',
                className: 'menu',
                permission: 'project.club*',
            },
        },
        {
            path: '/project/report',
            component: ProjectReportView,
            meta: {
                key: 'ProjectReport',
                name: '项目报备',
                className: 'menu',
                permission: 'project.report*',
            },
        },
    ],
}
export default projectRoute
