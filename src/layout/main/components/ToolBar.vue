<script setup lang="ts" name="">
import { copy } from '@/utils/clipboard'
import { exportFile } from '@/utils/file'
import { changeTheme } from '@/utils/theme'
import { ElRadioGroup, ElRadioButton, ElButton, ElPopover, ElForm, ElFormItem } from 'element-plus'
import { Icon } from '@iconify/vue'
import type { Config } from '../types'
import type { DataFlattenType } from '@/components/JsonPreCode/types'

/** ====================  数据  ==================== */
/** 全局配置 */
const config = defineModel<Config>('config', { default: {} })

/** 使用的数据 */
const useValue = defineModel<DataFlattenType[]>('useValue', { default: [] })

/** ====================  方法  ==================== */
/** 切换主题 */
function handelTheme(theme: 'light' | 'dark') {
  changeTheme(theme)
  config.value.theme = theme
}
</script>

<template>
  <!-- 工具栏 -->
  <div class="w-full flex justify-end flex gap-2 [&>*]:!m-0 mb-2">
    <!-- 显示模式 -->
    <ElRadioGroup v-model="config.showMode">
      <ElRadioButton label="树状" value="tree"></ElRadioButton>
      <ElRadioButton label="扁平" value="flat"></ElRadioButton>
    </ElRadioGroup>
    <!-- 复制导出 -->
    <ElButton @click="copy(useValue)" type="primary">复制</ElButton>
    <ElButton @click="exportFile(useValue)" type="primary">导出</ElButton>
    <!-- 切换主题 -->
    <ElButton v-if="config.theme == 'light'" @click="handelTheme('dark')" type="primary">
      <Icon icon="mdi:weather-night" />
    </ElButton>
    <ElButton v-else @click="handelTheme('light')" type="primary">
      <Icon icon="mdi:weather-sunny" />
    </ElButton>
    <!-- 更多设置 -->
    <ElPopover placement="bottom-end" width="auto" trigger="click">
      <template #reference>
        <ElButton>
          <Icon icon="mdi:format-list-bulleted" />
        </ElButton>
      </template>
      <template #default>
        <div class="w-full min-w-[200px]">
          <ElForm :model="config">
            <ElFormItem label="超出显示">
              <ElRadioGroup v-model="config.overflow">
                <ElRadioButton label="换行" value="break"></ElRadioButton>
                <ElRadioButton label="滚动" value="scroll"></ElRadioButton>
              </ElRadioGroup>
            </ElFormItem>
          </ElForm>
        </div>
      </template>
    </ElPopover>
  </div>
</template>

<style scoped></style>
