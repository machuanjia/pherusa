/*
 * @Author: xulijing
 * @Date: 2021-02-24 19:30:12
 * @LastEditTime: 2021-02-24 19:33:40
 * @FilePath: /pherusa/src/utils/mark.ts
 */
// 页面只有title+table，例如信息抽取版本列表、自定义模板模板列表
export const getTableHeight = (gap: number = 332) =>
  document.getElementById('root').clientHeight - gap;

export const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // eslint-disable-next-line
  return `${parseInt(`${bytes / Math.pow(k, i)}`, 10)}${sizes[i]}`;
};
