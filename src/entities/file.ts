/** @format */

export interface IFile {
    id: number
    name: string
    date: string
    uid?: string // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
    status?: string // 状态有：uploading done error removed
    response?: string // 服务端响应内容
    linkProps?: string // 下载链接额外的 HTML 属性
}

export type FileState = {
    files: IFile[]
}

export type FileAction = {
    type: string
    payload?: any
}

export type DispatchType = (args: FileAction) => FileAction
