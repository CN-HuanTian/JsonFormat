<template>
  <div class="w-full h-full">
    <ElScrollbar height="100%" class="w-full">
      <!-- 树状展示 -->
      <div class="p-[8px] w-full h-full">
        <JsonPreCode v-if="config?.showMode == 'tree'" v-model:value="showMessage"></JsonPreCode>
        <p v-else class="w-full h-full break-all">{{ showMessage }}</p>
      </div>
    </ElScrollbar>
  </div>
</template>

<script setup lang="ts" name="">
import { ElScrollbar } from 'element-plus'
import JsonPreCode from '@/components/JsonPreCode/index.vue'
import { computed, watch } from 'vue'
import type { Config } from '@/types/main'
/** 用户输入内容 */
const userInput = defineModel<string>('value', { default: '' })
/** 配置项 */
const config = defineModel<Config>('config', {})
/** 给父组件使用的值 */
const resultValue = defineModel<object>('resultValue', { default: {} })

/** 应展示内容 */
const showMessage = computed(() => {
  if (userInput.value === '') {
    return ''
  }
  try {
    return JSON.parse(userInput.value)
  } catch (error) {
    console.log(error)
    return {}
  }
})
watch(showMessage, (value) => {
  resultValue.value = value
},{
  immediate: true
})
</script>

<style scoped></style>
