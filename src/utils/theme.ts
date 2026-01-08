/**
 * 获取系统主题
 * @returns 系统主题 light | dark
 */
export function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * 初始化主题，自动检测系统主题并应用
 */
export function initTheme() {
  const theme = getSystemTheme()
  changeTheme(theme)
}

/**
 * 更改主题
 * @param theme light | dark
 */
export function changeTheme(theme: 'light' | 'dark') {
  const html = document.querySelector('html')
  if (html) {
    html.className = theme
  }
}
