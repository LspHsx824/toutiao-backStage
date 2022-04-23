import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import {ElMessage} from 'element-plus'


import store from "@/store"
import router from "@/router"

const app = createApp(App)

app.provide("$message",ElMessage)

app.use(ElementPlus).use(store).use(router).mount('#app')
