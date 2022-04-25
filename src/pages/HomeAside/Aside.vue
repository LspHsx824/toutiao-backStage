<template>
  <el-row>
    <el-col class="menu-container">
      <!-- <h5 class="mb-2">Custom colors</h5> -->
      <el-menu
        router
        active-text-color="#ffd04b"
        background-color="#002033"
        class="el-menu-vertical-demo"
        default-active="/index/content"
        text-color="#fff"
        :collapse="Props.isCollapse"
      >
        <el-menu-item
          v-for="(menu, index) in menuInfo"
          :key="index"
          :index="menu.path"
        >
          <el-icon>
            <component :is="menu.icon"></component>
          </el-icon>
          <span>{{ menu.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive, defineProps } from "vue";

const Props = defineProps({
  isCollapse: {
    typee: Boolean,
  },
});

const menuInfo = reactive([
  { path: "/index/home", name: "首页", icon: "home-filled" },
  { path: "/index/content", name: "内容管理", icon: "Menu" },
  { path: "/index/material", name: "素材管理", icon: "document" },
  {
    path: "/index/essay",
    name: "发布文章",
    icon: "promotion",
  },
  {
    path: "/index/comment",
    name: "评论管理",
    icon: "comment",
  },
  { path: "/index/fans", name: "粉丝管理", icon: "coordinate" },
  { path: "/index/setting", name: "个人设置", icon: "setting" },
]);

// console.log(props.isCollapse);
</script>

<style lang="less" scoped>
// .menu-container {
// width: 200px;
// }
.el-menu-vertical-demo {
  // width: 200px;
  height: 100%;
  background-color: "#333";
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
