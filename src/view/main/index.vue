<template>
  <div class="h-full flex flex-col gap-2">
    <div>1</div>
    <ElCard class="flex-1" body-class="h-full !p-0">
      <div class="flex h-full gap-2 flex-row">
        <ElInput
          v-model="userInput"
          resize="none"
          class="flex-[3] h-full"
          input-style="height:100%"
          type="textarea"
        ></ElInput>
        <div class="border border-gray-300 flex-[7] overflow-hidden bg-white rounded-sm">
          <ElScrollbar height="100%" class="w-full">
            <div class="p-1 w-full h-full">
              <JsonPreCode v-model:value="showMessage"></JsonPreCode>
            </div>
          </ElScrollbar>
        </div>
      </div>
    </ElCard>
  </div>
</template>

<script setup lang="ts" name="">
import { ElCard, ElInput, ElScrollbar } from 'element-plus'
import { computed, ref } from 'vue'
import JsonPreCode from '@/components/JsonPreCode/index.vue'

const userInput = ref('')
const showMessage = computed(() => {
  if (userInput.value === '') {
    return ''
  }
  try {
    return JSON.parse(userInput.value)
  } catch (error) {
    return error
  }
})
</script>

<style scoped></style>
<script lang="ts">
export default {
  name: 'MainIndex',
}
</script>
