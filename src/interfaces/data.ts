export enum UploadStateFe {
  default = 0,
  loading = 90,
  networkError = 100
}

export const uploadStateMap = {
  [UploadStateFe.default]: '等待中...',
  [UploadStateFe.loading]: '正在上传',
  [UploadStateFe.networkError]: '上传失败，网络错误',
}
