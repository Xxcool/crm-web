/**
 * Created by lijinfeng on 2019/2/19.
 */

import moment from 'moment'
import "moment/locale/zh-cn"

export function downloadFile(file, name) {
  const blob = new Blob([file])
  const fileName = `${name + moment().format("YYYY-MM-DD HH:mm:ss")}.xls`
  if ('download' in document.createElement('a')) {
    const link = document.createElement('a')
    link.download = fileName
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    document.body.appendChild(link)
    link.click()
    URL.revokeObjectURL(link.href)
    document.body.removeChild(link)
  } else {
    navigator.msSaveBlob(blob, fileName)
  }
}
