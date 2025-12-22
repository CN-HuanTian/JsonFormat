<template>
  <div class="w-full h-full">
    <ElScrollbar height="100%" class="w-full">
      <!-- 树状展示 -->
      <div class="p-[8px] w-full h-full">
        <JsonPreCode v-model:value="showMessage" :config="config"></JsonPreCode>
      </div>
    </ElScrollbar>
  </div>
</template>

<script setup lang="ts" name="">
import { ElScrollbar } from 'element-plus'
import JsonPreCode from '@/components/JsonPreCode/index.vue'
import { computed, watch } from 'vue'
import type { Config } from '@/types/main'
import dataFlatten from '@/utils/dataFlatten'
import type { DataFlattenType } from '@/types/jsonPreCode'
/** 用户输入内容 */
const userInput = defineModel<string>('value', { default: '' })
/** 配置项 */
const config = defineModel<Config>('config', {
  default: {
    showMode: 'tree',
  },
})
/** 给父组件使用的值 */
const resultValue = defineModel<DataFlattenType[]>('resultValue', { default: [] })

/** 应展示内容 */
const showMessage = computed(() => {
  if (userInput.value === '') {
    return parseJson('{}')
  }
  return parseJson(userInput.value)
})

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

<style scoped></style>
