import type { DataFlattenType } from '@/components/JsonPreCode/types'
import { jsonToString } from './format'

/**
 * 导出文件,文件名为当前时间
 * @param message 扁平化的数据
 */
export function exportFile(message: DataFlattenType[]) {
  const date = new Date()
    .toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    .replace(/\D/g, '')
  const file = new File([jsonToString(message)], `${date}.json`, {
    type: 'application/json',
  })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(file)
  a.download = file.name
  a.click()
}
