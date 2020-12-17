/** @format */

export const getFileIconByName = (name: string) => {
  const _names = name.split('.')
  const ext = _names.length > 0 ? _names[_names.length - 1] : 'file'
  let iconImg
  switch (ext) {
    case 'mp4':
    case 'rm':
    case 'avi':
    case 'wmv':
      iconImg = 'videoIcon'
      break
    case 'jpeg':
    case 'jpg':
    case 'png':
    case 'gif':
      iconImg = 'imgIcon'
      break
    case 'xlsx':
    case 'xls':
      iconImg = 'excelIcon'
      break
    case 'pdf':
      iconImg = 'pdfIcon'
      break
    case 'zip':
    case 'rar':
      iconImg = 'zipIcon'
      break
    case 'ppt':
    case 'pptx':
      iconImg = 'pptIcon'
      break
    case 'doc':
    case 'docx':
      iconImg = 'wordIcon'
      break
    case 'wma':
    case 'amr':
    case 'mp3':
      iconImg = 'radioIcon'
      break
    case 'dir':
    case 'file':
      iconImg = 'fileIcon'
      break
    default:
      iconImg = 'otherfileIcon'
      break
  }
  return `https://cdn.wul.ai/official/img/${iconImg}.png`
}
