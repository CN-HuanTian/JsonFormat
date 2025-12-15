import { ElMessage } from 'element-plus'

/**
 * 复制文本
 * @param message 复制的文本
 */
export function copy(message: string) {
  try {
    navigator.clipboard.writeText(message)
    ElMessage.success('复制成功')
  } catch (err) {
    ElMessage.error('复制失败')
    console.error('复制失败:', err)
  }
}

/**
 * 导出文件,文件名为当前时间
 * @param message 导出的文件内容
 */
export function exportFile(message: string) {
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
  const file = new File([message], `${date}.json`, {
    type: 'application/json',
  })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(file)
  a.download = file.name
  a.click()
}

/** 更改主题
 * @param theme light | dark
 */
export function changeTheme(theme: 'light' | 'dark') {
  const html = document.querySelector('html')
  if (html) {
    html.className = theme
  }
}
