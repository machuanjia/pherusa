/*
 * @Author: D.Y
 * @Date: 2021-02-04 18:55:58
 * @LastEditTime: 2021-02-04 19:00:52
 * @LastEditors: D.Y
 * @FilePath: /pherusa/src/utils/validate.ts
 * @Description: 
 */
export const isPhone = value => {
  const regex = /^((\+)?86|((\+)?86)?)0?1[3456789]\d{9}$/
  if (value) {
    return regex.test(value)
  }
  return false
}
