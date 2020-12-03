/** @format */

import { AsyncComponent } from '@components/index'
import MainLayout from '@layouts/main'
const FileView = AsyncComponent(() => import('@views/file/file.view'))

const TrainCenterView = AsyncComponent(() => import('@views/train/center/train-center.view'))
const TrainEngineerView = AsyncComponent(() => import('@views/train/engineer/train-engineer.view'))
const TrainShootingView = AsyncComponent(() => import('@views/train/shooting/train-shooting.view'))
const TrainInstructorView = AsyncComponent(() => import('@views/train/instructor/train-instructor.view'))

const trainRoute = {
  path: '/train',
  component: MainLayout,
  meta: {
    key: 'Train',
    name: '培训与认证',
    className: 'menu',
    permission: 'train*',
  },
  children: [
    {
      path: '/train/center',
      component: TrainCenterView,
      meta: {
        key: 'TrainCenter',
        name: '合作伙伴培训中心',
        className: 'menu',
        permission: 'train.center*',
      },
    },
    {
      path: '/train/engineer',
      component: TrainEngineerView,
      meta: {
        key: 'TrainEngineer',
        name: 'UiBot工程师认证',
        className: 'menu',
        permission: 'train.engineer*',
      },
    },
    {
      path: '/train/shooting',
      component: TrainShootingView,
      meta: {
        key: 'TrainShooting',
        name: 'UiBot靶场',
        className: 'menu',
        permission: 'train.shooting*',
      },
    },
    {
      path: '/train/instructor',
      component: TrainInstructorView,
      meta: {
        key: 'TrainInstructor',
        name: 'RPA项目教官',
        className: 'menu',
        permission: 'train.instructor*',
      },
    },
    {
      path: '/train/resource',
      component: FileView,
      meta: {
        key: 'TrainResource',
        name: 'UiBot开发资料下载',
        className: 'menu',
        permission: 'train.resource*',
      },
    },
  ],
}
export default trainRoute
