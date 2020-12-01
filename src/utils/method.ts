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
