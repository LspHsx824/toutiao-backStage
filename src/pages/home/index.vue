<template>
  <el-container class="layout-container-demo">
    <el-aside class="Aside" width="auto">
      <Aside class="aside-menu" :isCollapse="isCollapse" />
    </el-aside>

    <el-container class="right-ctn">
      <el-header class="Header">
        <Suspense>
          <template v-slot:default>
            <Header @change-collapse="isCollapse = !isCollapse" :isCollapse="isCollapse" />
          </template>
          <template v-slot:fallback>
            <h3>加载中.....</h3>
          </template>
        </Suspense>
      </el-header>

      <!-- 内部容器 + 滚动条 -->
      <el-main>
        <el-scrollbar>
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>
  
  <script  setup>
// import { ref } from 'vue'

import { ref } from "vue"

import Aside from "@/pages/HomeAside/Aside.vue";
import Header from "@/pages/Header/header";

const isCollapse = ref(false)


</script>
  
  <style scoped>
.layout-container-demo {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.aside-menu {
  height: 100vh;
}

.Header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-main{
  /* padding-bottom: 0; */
}
</style>
  