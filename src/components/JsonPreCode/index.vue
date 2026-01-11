<template>
  <div
    class="w-full h-full flex flex-row gap-2 background"
    :class="{ 'overflow-hidden break-all': useConfig.overflow }"
  >
    <div :class="{'tree-bg': useConfig.showMode, 'text-nowrap': !useConfig.overflow }">
      <template v-for="(item, index) in data" :key="index">
        <!-- 行号 -->
        <span v-if="useConfig.showMode" class="line-num">{{ index + 1 }}&nbsp;&nbsp;</span>

        <!-- 内容 -->
        <span class="text-warp" :class="{ 'text-nowrap': !useConfig.overflow }">
          <!-- key长度为0,不显示前缀,视为边界 -->
          <template v-if="item.key.length != 0">
            <!-- 前置空格 -->
            <template v-if="useConfig.showMode">
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
              <span class="syntax-key">"{{ item.key[item.key.length - 1] }}"</span>
              <span class="colon">:</span>
            </template>
          </template>

          <!-- value -->
          <span :class="getLabelClass(item.type[item.type.length - 1])">{{
            getValueContent(item.type[item.type.length - 1], item.value)
          }}</span>

          <!-- 分号 -->
          <span
            v-if="
              !['ArrayStart', 'ObjectStart'].includes(item.type[item.type.length - 1] as string) &&
              index !== data.length - 1 &&
              !item.isEnd
            "
            >,</span
          >
        </span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts" name="">
import type { DataFlattenType, FullType } from './types'
import type { Config } from '@/layout/main/types'
import { computed } from 'vue'

/** ====================  常量  ==================== */
const props = defineProps<{
  config: Config
}>()

/** 使用的配置 */
const useConfig = computed(() => {
  return {
    /** 展示模式 T:树形结构 F:平铺结构 */
    showMode: props.config.showMode == 'tree',
    /** 超出显示模式 T:换行 F:滚动 */
    overflow: props.config.overflow == 'break',
  }
})

/** ====================  数据  ==================== */
const data = defineModel<DataFlattenType[]>('value', { default: [] })

/** ====================  方法  ==================== */
/** 获取标签类名 */
function getLabelClass(type: FullType | undefined) {
  switch (type) {
    case 'String':
      return 'syntax-string'
    case 'Number':
      return 'syntax-number'
    case 'Boolean':
      return 'syntax-boolean'
    case 'Null':
      return 'syntax-null'
    case 'ArrayStart':
    case 'ArrayEnd':
    case 'ObjectStart':
    case 'ObjectEnd':
      return 'syntax-bracket'
    default:
      return 'syntax-key'
  }
}

/** 获取value内容 */
function getValueContent(type: FullType | undefined, value: unknown) {
  switch (type) {
    case 'String': {
      const res = (value as string).replace(/\n/g, '')
      return `"${res}"`
    }
    case 'Null':
      return 'null'
    default:
      return value
  }
}
</script>

<style scoped lang="scss">
.background {
  * {
    font-size: 1rem !important;
  }

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
}

// 行号样式
.line-num {
  color: var(--text-secondary) !important;
  user-select: none;
}

// 语法高亮 - 使用CSS变量支持主题切换
.syntax-string {
  color: var(--syntax-string);
}

.syntax-number {
  color: var(--syntax-number);
}

.syntax-boolean {
  color: var(--syntax-boolean);
}

.syntax-null {
  color: var(--syntax-null);
}

.syntax-key {
  color: var(--syntax-key);
}

.syntax-bracket {
  color: var(--syntax-bracket);
}
</style>

<script lang="ts">
export default {
  name: 'JsonPreCode',
}
</script>
