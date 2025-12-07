<template>
  <div class="h-full flex flex-col p-2 gap-2">
    <div>1</div>
    <ElCard class="flex-1" body-class="h-full bg-red-500 !p-0">
      <div class="flex h-full gap-2 flex-row">
        <ElInput
          v-model="userInput"
          resize="none"
          class="flex-[3] h-full"
          input-style="height:100%"
          type="textarea"
        ></ElInput>
        <div class="flex-[7]">
          <pre><code>{{ showMessage }}</code></pre>
        </div>
      </div>
    </ElCard>
  </div>
</template>

<script setup lang="ts" name="">
import { ElCard, ElInput } from 'element-plus'
import { computed, ref } from 'vue'

const userInput = ref('')
const showMessage = computed(()=>{
  if(userInput.value===''){
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
