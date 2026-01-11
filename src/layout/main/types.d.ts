export interface Config {
  /** 显示模式 tree:树形结构 flat:平铺结构 */
  showMode: 'tree' | 'flat'
  /** 主题 light:亮色 dark:暗色 */
  theme: 'light' | 'dark'
  /** 超出显示 */
  overflow: 'break' | 'scroll'
}
