<template>
  <div class="w-full h-full flex flex-row gap-2">
    <div :class="{ 'tree-bg': showActive, 'flat-bg': !showActive }">
      <template v-for="(item, index) in showData" :key="index">
        <span v-if="showActive" class="line-num select-none">{{ index + 1 }}&nbsp;&nbsp;</span>
        <span>
          <!-- key长度为0,不显示前缀,视为边界 -->
          <template v-if="item.key.length != 0">
            <!-- 前置空格 -->
            <template v-if="showActive">
              <span v-for="nbspNum in item.key.length" :key="nbspNum"
                >&nbsp;&nbsp;&nbsp;&nbsp;</span
              >
            </template>
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
              <span style="color: red">"{{ item.key[item.key.length - 1] }}"</span>
              <span class="colon">:</span>
            </template>
          </template>

          <!-- value -->
          <span :style="getLabelStyle(item.type[item.type.length - 1])">{{
            getValueContent(item.type[item.type.length - 1], item.value)
          }}</span>

          <!-- 分号 -->
          <span
            v-if="
              !['ArrayStart', 'ObjectStart'].includes(item.type[item.type.length - 1] as string) &&
              index !== showData.length - 1 &&
              !item.isEnd
            "
            >,</span
          >
          <span>{{}}</span>
        </span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts" name="">
import type { DataFlattenType, FullType } from '@/types/jsonPreCode'
import type { Config } from '@/types/main'
import { computed } from 'vue'
const data = defineModel<DataFlattenType[]>('value', { default: [] })
const props = defineProps<{
  config: Config
}>()

/** 展示的数据 */
const showData = computed<DataFlattenType[]>(() => {
  return data.value
})
/** 是否展示树形结构 */
const showActive = computed(() => {
  return !(props.config.showMode == 'flat')
})

/** 获取标签样式 */
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
/** 获取value内容 */
function getValueContent(type: FullType | undefined, value: unknown) {
  switch (type) {
    case 'String':
      const res = (value as string).replace(/\n/g, '')
      return `"${res}"`
    case 'Null':
      return 'null'
    default:
      return value
  }
}
</script>

<style scoped lang="scss">
.tree-bg {
  display: grid;
  grid-template-columns: max-content repeat(1, 1fr);
  .colon {
    &::before,
    &::after {
      content: ' ';
    }
  }
}
.flat-bg {
  word-break: break-all;
}
</style>

<script lang="ts">
export default {
  name: 'JsonPreCode',
}
</script>
