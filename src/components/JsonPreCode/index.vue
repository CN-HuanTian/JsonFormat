<template>
  <div class="w-full h-full">
    <pre><code>{{ showData }}</code></pre>
  </div>
</template>

<script setup lang="ts" name="">
const showData = defineModel('value')
</script>

<style scoped></style>

<script lang="ts">
export default {
  name: 'JsonPreCode',
}
</script>
