<template>
  <div class="w-full h-full flex flex-row gap-2">
    <div class="render-bg">
      <template v-for="(item, index) in showData" :key="index">
        <span class="line-num select-none">{{ index + 1 }}&nbsp;&nbsp;</span>
        <span>
          <!-- 前置空格 -->
          <span v-for="nbspNum in item.key.length - 1" :key="nbspNum">
            &nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <!-- key -->
          <!-- 当为括号结尾|数组,不限制key值 -->
          <template
            v-if="
              !(
                item.type[item.type.length - 2] == 'Array' ||
                item.type[item.type.length - 1] == 'ArrayEnd' ||
                item.type[item.type.length - 1] == 'ObjectEnd'
              )
            "
          >
            <span style="color: red"> "{{ item.key[item.key.length - 1] }}"</span>
            <span class="colon">:</span>
          </template>

          <!-- value -->
          <span :style="getLabelStyle(item.type[item.type.length - 1])">{{
            getValueContent(item.type[item.type.length - 1], item.value)
          }}</span>
        </span>
        <!-- debug 当前对象type -->
        <!-- <span class="select-none"> &nbsp;&nbsp; &nbsp;&nbsp;{{ item.type }}</span> -->
      </template>
    </div>
  </div>
</template>

<script setup lang="ts" name="">
import type { DataFlattenType, FullType } from '@/types/jsonPreCode'
import dataFlatten from '@/utils/dataFlatten'
import { computed } from 'vue'

const data = defineModel<object>('value')
const showData = computed<DataFlattenType[]>(() => {
  return dataFlatten(data.value)
})
function getLabelStyle(type: FullType | undefined) {
  switch (type) {
    case 'String':
      return 'color: green'
    case 'Number':
      return 'color: blue'
    case 'Boolean':
      return 'color: orange'
    case 'Null':
      return 'color: gray'
    case 'ArrayStart':
    case 'ArrayEnd':
    case 'ObjectStart':
    case 'ObjectEnd':
      return ''
    default:
      return 'color: red'
  }
}
function getValueContent(type: FullType | undefined, value: unknown) {
  switch (type) {
    case 'String':
      return `"${value}"`
    case 'Null':
      return 'null'
    default:
      return value
  }
}
</script>

<style scoped lang="scss">
.render-bg {
  display: grid;
  grid-template-columns: max-content repeat(1, 1fr);
  .colon {
    &::before,
    &::after {
      content: ' ';
    }
  }
}
</style>

<script lang="ts">
export default {
  name: 'JsonPreCode',
}
</script>
