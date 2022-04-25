import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {ElMessage} from 'element-plus'

import * as Icons  from "@element-plus/icons-vue"

// element icon 由于 图标库 已转移， 现在需要 按需加载
// 或者统一注册 icon 图标

// console.log(Icons);



import store from "@/store"
import router from "@/router"

const app = createApp(App)

Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key])
  })
  

app.provide("$message",ElMessage)

app.use(ElementPlus).use(store).use(router).mount('#app')
