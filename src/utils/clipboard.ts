import type { DataFlattenType } from '@/components/JsonPreCode/types'
import { ElMessage } from 'element-plus'
import { jsonToString } from './format'

/**
 * 复制文本到剪贴板
 * @param message 扁平化的数据
 */
export function copy(message: DataFlattenType[]) {
  try {
    navigator.clipboard.writeText(jsonToString(message))
    ElMessage.success('复制成功')
  } catch (err) {
    ElMessage.error('复制失败')
    console.error('复制失败:', err)
  }
}
