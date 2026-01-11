<script setup lang="ts" name="">
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="h-full w-full px-5 flex items-center justify-between header-content">
    <p class="text-xl font-bold header-title">JSON在线解析工具</p>
    <a href="https://github.com/CN-HuanTian/JsonFormat" target="_blank">
      <Icon class="cursor-pointer" style="font-size: 24px" icon="mdi:github-box" />
    </a>
  </div>
</template>

<style scoped>
.header-content {
  color: var(--text-header);
}

.header-title {
  color: var(--text-header);
}
</style>
