<script setup lang="ts">
import { onMounted } from 'vue'
import { initTheme } from '@/utils/theme'
import Index from './layout/index.vue';
onMounted(() => {
  initTheme()
})
</script>

<template>
  <Index></Index>
</template>

<style lang="scss">
@use './style/custom.scss';

.app-container {
  background-color: var(--bg-primary);
}

.app-header {
  background-color: var(--bg-header);
}

.app-main {
  background-color: var(--bg-primary);
}

.app-footer {
  background-color: var(--bg-footer);
}
</style>
