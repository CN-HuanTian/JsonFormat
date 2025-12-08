<script setup lang="ts">
import { ElContainer, ElHeader, ElMain, ElFooter } from 'element-plus'
import HeaderIndex from '@/view/header/index.vue'
import MainIndex from '@/view/main/index.vue'
import FooterIndex from '@/view/footer/index.vue'
</script>

<template>
  <ElContainer class="h-100vh min-h-[500px] flex flex-col">
    <ElHeader class="bg-blue !p-0">
      <HeaderIndex></HeaderIndex>
    </ElHeader>
    <ElMain class="flex-1 overflow-hidden">
      <MainIndex></MainIndex>
    </ElMain>
    <ElFooter class="bg-yellow !p-0">
      <FooterIndex></FooterIndex>
    </ElFooter>
  </ElContainer>
</template>

<style lang="scss">
@import './style/custom.scss';
</style>
