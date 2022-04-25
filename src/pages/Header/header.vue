<script setup>
import { reactive, toRef,unref, inject, defineEmits, defineProps } from "vue";

import { ref } from 'vue'
// import { ElMessageBox } from 'element-plus'

import { useRouter, useRoute } from "vue-router"
import { getUserProfile } from "@/api/user";

const emits = defineEmits(["change-collapse"]);

const Router = useRouter()
const route = useRoute()
const props = defineProps({
  isCollapse: {
    typee: Boolean,
  },
});

const isCollapse = toRef(props, "isCollapse")

const ElMessage = inject("$message");

const dialogVisible = ref(false)

const getUserInfo = async () => {
  try {
    const {
      data: { data },
    } = await getUserProfile();
    return reactive(data);
  } catch (err) {
    ElMessage({
      message: "服务器异常，请稍后重试",
      type: "error",
    });
  }
};
let userInfo = await getUserInfo();

const onlogout = () => {
  dialogVisible.value = true
}

const handleLogout = ()=>{
    Router.push({
      name:"login",
      query:{
        redirect:route.fullPath
      }
    })
}


</script>

<template>
  <div class="header-left">
    <el-icon class="icon" :class="{ tsform: isCollapse }" @click="emits('change-collapse')">
      <!-- <component :is="props.isCollapse? 'fold':'unfold'"></component> -->
      <fold />
    </el-icon>
    <span>XXXXXXX 科技教育有限公司</span>
  </div>

  <el-dropdown trigger="click">
    <span class="el-dropdown-link">
      <!-- <img :src="userInfo.photo" alt=""> -->
      <img src=@/assets/avatar.jpg alt="">
      {{ userInfo.name }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <el-icon :size="20">
            <setting />
          </el-icon>个人设置
        </el-dropdown-item>
        <el-dropdown-item @click="onlogout">
          <el-icon>
            <i class="iconfont icon-logout"></i>
          </el-icon>
          <span class="text">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <!-- 退出登录  popup -->
  <el-dialog v-model="dialogVisible" title="退出登录" width="30%" >
    <span>确定退出登录吗？每一片贫瘠的土地都需要坚定的挖掘者！</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleLogout">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
.header-left {
  display: flex;
  align-items: center;
  .icon {
    font-size: 34px;
    margin-right: 10px;
  }
  span {
    font-size: 24px;
  }
}
.el-dropdown-link {
  display: flex;
  align-items: center;
  img {
    border-radius: 50%;
    margin-right: 10px;
  }
}
.tsform {
  transform: rotateY(180deg);
}
.iconfont {
  padding-left: 12px !important;
  // padding-right:5px
}
.text {
  margin-left: 5px;
}
</style>
