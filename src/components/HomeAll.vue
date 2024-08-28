<template>
  <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      background-color="green"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
  >
    <el-menu-item index="1">FCFZ欢迎您~</el-menu-item>
    <div>
      <el-sub-menu index="2">
        <template #title>阅览工具</template>
        <el-menu-item index="2-1">邮件阅览</el-menu-item>
        <el-menu-item index="2-2">通知阅览</el-menu-item>
        <el-menu-item index="2-3">我的任务</el-menu-item>
      </el-sub-menu>
    </div>
    <el-menu-item index="3">Info</el-menu-item>
    <el-menu-item index="4">本人</el-menu-item>
    <el-menu-item index="5" @click="dialogVisible = true">
        退出登录
    </el-menu-item>
    <el-dialog
        v-model="dialogVisible"
        title="Tips"
        width="500"
    >
      <span>您是否要退出登录？</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">不退出</el-button>
          <el-button type="primary" @click="UserLogin">
            确定退出
          </el-button>
        </div>
      </template>
    </el-dialog>
  </el-menu>
</template>
<script setup>
import { ref } from 'vue'
import router from "@/routes";
import {ElNotification} from "element-plus";

const activeIndex2 = ref('1')
const dialogVisible = ref(false)

const handleSelect = (key,keyPath) => {
  console.log(key, keyPath)
}
// 判断用户是否登录
function Success(str){
  ElNotification({
    title: '成功',
    message: str,
    type: 'success'
  })
}

const UserLogin=()=>{
  dialogVisible.value = false;
  Success("退出成功");
  router.push("/login")
}
</script>

<style scoped>
</style>