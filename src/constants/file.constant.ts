/** @format */

import { keyBy } from 'lodash'

export const FILE_STATUS = [
    {
        key: 'uploading',
        label: '上传中',
    },
    {
        key: 'done',
        label: '上传成功',
        icon: 'iconfont icontableSuccess text-success',
    },
    {
        key: 'error',
        label: '上传失败',
        icon: 'iconfont iconwulaiClose text-danger',
    },
    {
        key: 'removed',
        label: '已删除',
        icon: 'iconfont icondelete text-warning',
    },
]

export const FILE_STATUS_MAP = keyBy(FILE_STATUS, 'key')
