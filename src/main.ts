import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import 'element-plus/dist/index.css'


import './assets/main.css'

const app = createApp(App)

app.use(ElementPlus, { locale: zhCn })
app.mount('#app')
