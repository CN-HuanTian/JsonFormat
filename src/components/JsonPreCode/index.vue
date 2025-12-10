<template>
  <div class="w-full h-full flex flex-row">
    <!-- 行号列 -->
    <div class="flex flex-col">
      <p v-for="(value, index) in showData" :key="index" class="text-blue px-4">
        {{ index }}
      </p>
    </div>
    <!-- 内容列 -->
    <ElScrollbar height="100%" :horizontal="true" :vertical="false">
      <div class="inline-block min-w-full">
        <pre v-for="(value, index) in showData" :key="index">{{ value }}</pre>
      </div>
    </ElScrollbar>
  </div>
</template>

<script setup lang="ts" name="">
import { ElScrollbar } from 'element-plus'
import { computed } from 'vue'

const data = defineModel<string>('value')
const showData = computed(() => {
  return JSON.stringify(data.value, null, 4).split('\n')
})
</script>

<style scoped></style>

<script lang="ts">
export default {
  name: 'JsonPreCode',
}
</script>
