<template>
    <div>
      <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          background-color="green"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="handleSelect"
      >
        <el-menu-item index="1" style="margin-right: 30%;font-size: 28px">富辰方舟欢迎您~</el-menu-item>
        <el-menu-item index="2" style="margin-left: 35%">本人</el-menu-item>
        <el-menu-item index="3" @click="dialogVisible = true">
          退出登录
        </el-menu-item>
        <el-dialog
            v-model="dialogVisible"
            title="提示"
            width="500"
        >
          <span>您是否要退出登录？</span>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="dialogVisible = false">不退出</el-button>
              <el-button type="primary" @click="UserLogin">确定退出</el-button>
            </div>
          </template>
        </el-dialog>
      </el-menu>
    </div>
    <div>
      <el-row class="tac">
        <el-col :span="12">
          <el-menu
              active-text-color="#ffd04b"
              background-color="#545c64"
              class="el-menu-vertical-demo"
              default-active="2"
              text-color="#fff"
              @open="handleOpen"
              @close="handleClose"
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon><location /></el-icon>
              </template>
              <el-menu-item index="1-4-1">邮件阅览</el-menu-item>
              <el-menu-item index="1-4-2">通知阅览</el-menu-item>
              <el-menu-item index="1-4-3">我的任务</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon><location /></el-icon>
              </template>
              <el-menu-item index="2-4-1">邮件阅览</el-menu-item>
              <el-menu-item index="2-4-2">通知阅览</el-menu-item>
              <el-menu-item index="2-4-3">我的任务</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-col>
      </el-row>
    </div>
</template>
<script setup>
import { ref} from 'vue'
import router from "@/routes";
import {ElNotification} from "element-plus";
import axios from "@/axios/index";

const activeIndex2 = ref('1')
const dialogVisible = ref(false)
const handleSelect = (key,keyPath) => {
  console.log(key, keyPath)
}
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
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
//用户菜单栏
const data=[]
const getMenuData=()=>{
  if (localStorage.getItem("Authorization-Token")!==null){
    axios.get("http://192.168.0.132:7777/cms/menu")
    .then(function (response){
      console.log(response)
      if (response.data.code==="200"){
        console.log(response.data.data)
        data.value=response.data;
        console.log(data.value)
      }else {
        console.log("获取菜单失败")
      }
        }
    ).then(function (error){
      console.log(error)
    })
  }
}
getMenuData()
</script>

<style scoped>
.el-menu-demo{
  width: 100%;
}
.tac {
  width: 25%;
}
</style>