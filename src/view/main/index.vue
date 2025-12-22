<template>
  <div class="h-full flex flex-col gap-2">
    <div class="w-full flex justify-between">
      <div></div>
      <div class="flex gap-2 [&>*]:!m-0">
        <ElRadioGroup v-model="config.showMode">
          <ElRadioButton label="树状" value="tree"></ElRadioButton>
          <ElRadioButton label="扁平" value="flat"></ElRadioButton>
        </ElRadioGroup>
        <ElButton @click="handleCopy" type="primary">复制</ElButton>
        <ElButton @click="handleExport" type="primary">导出</ElButton>
        <ElButton v-if="config.theme == 'light'" @click="handelTheme('dark')" :icon="Moon" circle />
        <ElButton v-else @click="handelTheme('light')" :icon="Sunny" circle />
      </div>
    </div>
    <ElCard class="flex-1" body-class="h-full !p-0">
      <div class="flex h-full gap-2 flex-row">
        <ElInput
          v-model="userInput"
          resize="none"
          class="flex-[3] h-full input-textarea [&>textarea]:text-[16px]"
          input-style="height:100%;padding:8px 0 8px 16px;"
          type="textarea"
        ></ElInput>
        <div class="border border-gray-300 flex-[7] overflow-hidden rounded-sm">
          <ShowData
            class="w-full h-full"
            v-model:value="userInput"
            v-model:config="config"
            v-model:resultValue="useValue"
          ></ShowData>
        </div>
        <!-- <ElScrollbar class="flex-[5] overflow-hidden">
          <pre>{{ useValue }}</pre>
        </ElScrollbar> -->
      </div>
    </ElCard>
  </div>
</template>

<script setup lang="ts" name="">
import { Sunny, Moon } from '@element-plus/icons-vue'
import { ElCard, ElInput, ElButton, ElRadioGroup, ElRadioButton } from 'element-plus'
import { changeTheme, copy, exportFile } from '@/utils/function'
import { ref } from 'vue'
import type { Config } from '@/types/main'
import ShowData from './showData.vue'
import type { DataFlattenType } from '@/types/jsonPreCode'

/** 用户输入内容 */
const userInput = ref(
  `{"title":"JSON在线解析","test":null,"bool":true,"json.url":"https://www.json.cn","keywords":"JSON在线解析","Function":["JSON美化","JSON数据类型显示","JSON数组显示角标","高亮显示","错误提示","123","&nbsp;"," ","<h1>JSON在线解析</h1>",{"备注":["www.json.cn","json.cn"]}],"About":{"QQ":661275469},"Special":["&currency","&timestamp","&region","&params","&lt;&lt;sane&gt;&gt;","gbk -> utf-8","gbk -> utf-8"],"numbers":[305667554401374209,103248655202358790,123456789012345679,987654321098765432,246813579246813579,135792468013579246,864209864209864209,123456789098765432,987654321012345679,246813579135792468],"id2":22022621134265013,"BigNumber":71357798191653192098,"content":"永和九年，岁在癸丑，暮春之初，会于会稽山阴之兰亭，修禊事也。群贤毕至，少长咸集。此地有崇山峻岭，茂林修竹，又有清流激湍，映带左右，引以为流觞曲水，列坐其次。虽无丝竹管弦之盛，一觞一咏，亦足以畅叙幽情。\\n是日也，天朗气清，惠风和畅。仰观宇宙之大，俯察品类之盛，所以游目骋怀，足以极视听之娱，信可乐也。\\n夫人之相与，俯仰一世。或取诸怀抱，悟言一室之内；或因寄所托，放浪形骸之外。虽趣舍万殊，静躁不同，当其欣于所遇，暂得于己，快然自足，不知老之将至；及其所之既倦，情随事迁，感慨系之矣。向之所欣，俯仰之间，已为陈迹，犹不能不以之兴怀，况修短随化，终期于尽！古人云：死生亦大矣。'岂不痛哉！\\n每览昔人兴感之由，若合一契，未尝不临文嗟悼，不能喻之于怀。固知一死生为虚诞，齐彭殇为妄作。后之视今，亦犹今之视昔，悲夫！故列叙时人，录其所述，虽世殊事异，所以兴怀，其致一也。后之览者，亦将有感于斯文。","Ciallo":"Ciallo"}`,
)
/** 配置项 */
const config = ref<Config>({
  showMode: 'tree',
  theme: 'light',
})
/** 处理后的数据 */
const useValue = ref<DataFlattenType[]>([])
/** ====================  方法  ==================== */
/** 复制 */
function handleCopy() {
  copy(useValue.value)
}
/** 导出 */
function handleExport() {
  exportFile(useValue.value)
}
/** 切换主题 */
function handelTheme(theme: 'light' | 'dark') {
  changeTheme(theme)
  config.value.theme = theme
}
</script>

<style scoped lang="scss">
.input-textarea :deep(.el-textarea__inner) {
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
<script lang="ts">
export default {
  name: 'MainIndex',
}
</script>
