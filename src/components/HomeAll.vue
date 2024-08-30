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
        <el-menu-item index="1" style="font-size: 28px">富辰方舟欢迎您~</el-menu-item>
        <el-menu-item index="2" @click="getMenuData">
          获取本人功能
        </el-menu-item>
        <el-menu-item index="3" style="">本人</el-menu-item>
        <el-menu-item index="4" @click="dialogVisible = true">
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
import axios from "axios";

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
  ExitLogin()
}
const isExit=ref(false)
//退出登录
const ExitLogin=()=>{
  isExit.value=true;
  axios.get("http://192.168.0.132:9999/StaffOperations/staffExit?isExit="+isExit.value,{headers:{
      "Authorization-Token":window.localStorage.getItem("Authorization-Token")
    }})
      .then(function (response){
        console.log(response)
        router.push("/login")
      }).catch(function (error){
    console.log(error)
  })
}
//用户菜单栏
let data=ref()
const getMenuData=()=>{
  if (localStorage.getItem("Authorization-Token")!==null){
    console.log('token:'+window.localStorage.getItem("Authorization-Token"))
  axios.get("http://192.168.0.132:7777/cms/menu/",{headers:{
      "Authorization-Token":window.localStorage.getItem("Authorization-Token")
    }}).then(function (response){
    console.log(response)
        Success("获取成功")
  }
  ).catch(function (error){
    console.log(error)
  })
  }
}

data.value=getMenuData()

</script>

<style scoped>
.el-menu-demo{
  width: 100%;
}
.tac {
  width: 25%;
}
</style>