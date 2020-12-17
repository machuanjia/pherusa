/** @format */

export const getFileSize = (value: number) => {
  if (!value) {
    return '0 Bytes'
  }
  const unitArr = new Array('Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB')
  let index = 0
  const srcsize = parseFloat(value.toString())
  index = Math.floor(Math.log(srcsize) / Math.log(1024))
  let size: number | string = srcsize / Math.pow(1024, index)
  size = size.toFixed(2)
  return size + unitArr[index]
}

export const specialCharacter = "[`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'"

export const isIncludeSpecialCharacter = (character: string) => {
  return character.length === 1 && specialCharacter.indexOf(character) > -1
}

export const isMobile = () => {
  return document.documentElement.clientWidth <= 768
}

export const getHeight = (sub = 0) => {
  return document.documentElement.clientHeight - sub
}
