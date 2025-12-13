<template>
  <div class="w-full h-full flex flex-row gap-2">
    <!-- <div class="flex flex-col">
      <span v-for="(item, index) in res" :key="index" class="line-num">{{ index  }}</span>
    </div> -->
    <div class="render-bg">
      <div>
        <template v-for="(item, index) in res" :key="index">
          <span class="line-num select-none">{{ index }}&nbsp;&nbsp;</span>
          <!-- 前置空格 -->
          <span v-for="nbspNum in item.key.length - 1" :key="nbspNum">
            &nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <!-- key -->
          <!-- 当为括号结尾|数组,不限制key值 -->
          <span
            v-if="
              !(
                item.type[item.type.length - 2] == 'Array' ||
                item.type[item.type.length - 1] == 'ArrayEnd' ||
                item.type[item.type.length - 1] == 'ObjectEnd'
              )
            "
            style="color: red"
          >
            "{{ item.key[item.key.length - 1] }}"
          </span>
          :
          <!-- value -->
          <span :style="getLabelStyle(item.type[item.type.length - 1])">{{
            getValueContent(item.type[item.type.length - 1], item.value)
          }}</span>
          <br />
        </template>
      </div>
      <!-- debug 当前对象type -->
      <!-- <span class="select-none"> &nbsp;&nbsp; &nbsp;&nbsp;{{ item.type }}</span> -->
    </div>
  </div>
</template>

<script setup lang="ts" name="">
import type { FullType } from '@/types/global'
import dataFlatten from '@/utils/dataFlatten'

const data = defineModel<object>('value')
const res = dataFlatten(data.value)
console.log(res)

function getLabelStyle(type: FullType | undefined) {
  switch (type) {
    case 'String':
      return 'color: green'
    case 'Number':
      return 'color: blue'
    case 'Boolean':
      return 'color: yellow'
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
  width: 100%;
  display: grid;
  grid-template-columns: max-content repeat(1, 1fr);
}
</style>

<script lang="ts">
export default {
  name: 'JsonPreCode',
}
</script>
