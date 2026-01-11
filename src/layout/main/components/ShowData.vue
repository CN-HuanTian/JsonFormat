<script setup lang="ts" name="">
import { ElScrollbar } from 'element-plus'
import JsonPreCode from '@/components/JsonPreCode/index.vue'
import { computed, watch } from 'vue'
import type { Config } from '../types'
import dataFlatten from '@/utils/format'
import type { DataFlattenType } from '@/components/JsonPreCode/types'

/** ====================  常量  ==================== */
/** 应展示内容 */
const showMessage = computed(() => {
  if (userInput.value === '') {
    return parseJson('{}')
  }
  return parseJson(userInput.value)
})

/** ====================  数据  ==================== */
/** 用户输入内容 */
const userInput = defineModel<string>('value', { default: '' })

/** 配置项 */
const config = defineModel<Config>('config', { default: {} })

/** 给父组件使用的值 */
const resultValue = defineModel<DataFlattenType[]>('resultValue', { default: [] })

/** ====================  方法  ==================== */
function parseJson(input: string): DataFlattenType[] {
  try {
    const json = JSON.parse(input)
    return dataFlatten(json)
  } catch (error) {
    const e = {
      error: (error as { message: string }).message,
    }
    return dataFlatten(e)
  }
}

/** ====================  生命周期  ==================== */
watch(
  showMessage,
  (value) => {
    resultValue.value = value
  },
  {
    immediate: true,
  },
)
</script>
<template>
  <div class="w-full h-full">
    <ElScrollbar height="100%">
      <!-- 树状展示 -->
      <div class="p-[8px] w-full h-full">
        <JsonPreCode v-model:value="showMessage" :config="config"></JsonPreCode>
      </div>
    </ElScrollbar>
  </div>
</template>
<style scoped></style>
