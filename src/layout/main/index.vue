<script setup lang="ts">
import { ElInput, ElSplitter, ElSplitterPanel } from 'element-plus'
import { onBeforeMount, ref, watch } from 'vue'
import ShowData from './components/ShowData.vue'
import type { DataFlattenType } from '@/components/JsonPreCode/types'
import ToolBar from './components/ToolBar.vue'
import type { Config } from './types'
import { getSystemTheme } from '@/utils/theme'
import { isMobile } from '@/utils/device'

/** ====================  数据  ==================== */

/** 配置项 */
const config = ref<Config>({
  showMode: 'tree',
  theme: 'light',
  overflow: 'break',
  indent: 4,
})

/** 用户输入内容 */
const userInput = ref('')
/** debug */
// const userInput = ref(
//   `{"title":"JSON在线解析","test":null,"bool":true,"json.url":"https://www.json.cn","keywords":"JSON在线解析","Function":["JSON美化","JSON数据类型显示","JSON数组显示角标","高亮显示","错误提示","123","&nbsp;"," ","<h1>JSON在线解析</h1>",{"备注":["www.json.cn","json.cn"]}],"About":{"QQ":661275469},"Special":["&currency","&timestamp","&region","&params","&lt;&lt;sane&gt;&gt;","gbk -> utf-8","gbk -> utf-8"],"numbers":[305667554401374209,103248655202358790,123456789012345679,987654321098765432,246813579246813579,135792468013579246,864209864209864209,123456789098765432,987654321012345679,246813579135792468],"id2":22022621134265013,"BigNumber":71357798191653192098,"content":"永和九年，岁在癸丑，暮春之初，会于会稽山阴之兰亭，修禊事也。群贤毕至，少长咸集。此地有崇山峻岭，茂林修竹，又有清流激湍，映带左右，引以为流觞曲水，列坐其次。虽无丝竹管弦之盛，一觞一咏，亦足以畅叙幽情。\\n是日也，天朗气清，惠风和畅。仰观宇宙之大，俯察品类之盛，所以游目骋怀，足以极视听之娱，信可乐也。\\n夫人之相与，俯仰一世。或取诸怀抱，悟言一室之内；或因寄所托，放浪形骸之外。虽趣舍万殊，静躁不同，当其欣于所遇，暂得于己，快然自足，不知老之将至；及其所之既倦，情随事迁，感慨系之矣。向之所欣，俯仰之间，已为陈迹，犹不能不以之兴怀，况修短随化，终期于尽！古人云：死生亦大矣。'岂不痛哉！\\n每览昔人兴感之由，若合一契，未尝不临文嗟悼，不能喻之于怀。固知一死生为虚诞，齐彭殇为妄作。后之视今，亦犹今之视昔，悲夫！故列叙时人，录其所述，虽世殊事异，所以兴怀，其致一也。后之览者，亦将有感于斯文。","Ciallo":"Ciallo"}`,
// )

/** 处理后的数据 */
const useValue = ref<DataFlattenType[]>([])

/** ====================  生命周期  ==================== */
onBeforeMount(() => {
  const userConfig = localStorage.getItem('userConfig')
  if (userConfig) {
    const configData = JSON.parse(userConfig)
    console.log(configData)
    Object.assign(config.value, configData)
  } else {
    config.value.theme = getSystemTheme()
  }
})

watch(
  () => config.value,
  () => {
    localStorage.setItem('userConfig', JSON.stringify(config.value))
  },
  {
    deep: true,
  },
)
</script>
<template>
  <div class="h-full flex flex-col gap-2">
    <!-- 工具栏 -->
    <ToolBar v-model:config="config" v-model:use-value="useValue" />
    <!-- 主体 -->
    <div class="flex-1 overflow-hidden">
      <ElSplitter
        class="gap-2 h-full overflow-hidden"
        :layout="isMobile() ? 'vertical' : 'horizontal'"
      >
        <ElSplitterPanel :min="isMobile() ? '50px' : '250px'" size="30%">
          <ElInput
            v-model="userInput"
            resize="none"
            class="flex-[3] h-full input-textarea"
            input-style=""
            type="textarea"
          />
        </ElSplitterPanel>
        <ElSplitterPanel :min="isMobile() ? '50px' : '250px'" class="h-full !overflow-hidden">
          <div class="json-preview-container h-full overflow-hidden rounded-sm">
            <ShowData
              class="w-full h-full"
              v-model:value="userInput"
              v-model:config="config"
              v-model:resultValue="useValue"
            />
          </div>
        </ElSplitterPanel>
      </ElSplitter>
    </div>
  </div>
</template>
<style scoped lang="scss">
.input-textarea :deep(.el-textarea__inner) {
  font-size: 1rem !important;
  color: var(--text-primary) !important;
  border: 1px solid var(--border-color);
  background-color: var(--bg-input);
  box-shadow: none !important;
  height: 100%;
  padding: 8px;
  &::-webkit-scrollbar {
    display: none;
  }
  &:hover {
    border: 1px solid var(--border-hover);
  }
  &:focus {
    border-color: var(--border-hover);
  }
}

.json-preview-container {
  border: 1px solid var(--border-color);
  background-color: var(--bg-code);
  &:hover {
    border-color: var(--border-hover);
  }
}
</style>
