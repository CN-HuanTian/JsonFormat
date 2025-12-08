import { createApp } from 'vue'
import App from './App.vue'
// unocss
import 'virtual:uno.css'
// element-plus
import 'element-plus/dist/index.css'
// //highlight.js
// import 'highlight.js/styles/stackoverflow-light.css'
// import hljs from 'highlight.js'
// import json from 'highlight.js/lib/languages/json'
// import hljsVuePlugin from "@highlightjs/vue-plugin";
// hljs.registerLanguage('json', json);

const app = createApp(App)
// app.use(hljsVuePlugin)
app.mount('#app')
