/** @format */

import moment from 'moment'

export const dateFormatFull = (date: number) => {
  if (!date) return
  return moment(date.toString().length === 10 ? date * 1000 : date).format('YYYY-MM-DD HH:mm:ss')
}

export const dateFormatDay = (date: number) => {
  if (!date) return
  return moment(date.toString().length === 10 ? date * 1000 : date).format('YYYY年MM月DD日')
}
