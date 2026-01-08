<template>
  <ElContainer class="h-100vh min-h-[500px] flex flex-col app-container">
    <ElHeader class="app-header !p-0">
      <HeaderIndex></HeaderIndex>
    </ElHeader>
    <ElMain class="flex-1 overflow-hidden app-main">
      <MainIndex></MainIndex>
    </ElMain>
    <ElFooter class="app-footer !p-0">
      <FooterIndex></FooterIndex>
    </ElFooter>
  </ElContainer>
</template>

<script setup lang="ts" name="">
import { ElContainer, ElHeader, ElMain, ElFooter } from 'element-plus'
import HeaderIndex from '@/layout/header/index.vue'
import MainIndex from '@/layout/main/index.vue'
import FooterIndex from '@/layout/footer/index.vue'
</script>

<style scoped></style>
<script lang="ts">
export default {
  name: 'LayoutIndex',
}
</script>
