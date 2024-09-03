<template>
    <div class="common-layout">
      <el-container>
        <el-aside width="200px"><div class="left_menu">
          <el-menu
              active-text-color="#ffd04b"
              background-color="#545c64"
              class="el-menu-vertical-demo"
              default-active="2"
              :default-openeds="['1','25','45','65']"
              text-color="#fff"
              @open="handleOpen"
              @close="handleClose"
          >
            <el-sub-menu v-for="item in data" :index="String(item.menuId)" :key="String(item.menuId)">
              <template #title>
                <el-icon><Location /></el-icon>{{item.menuName}}
              </template>
              <el-menu-item v-for="i in item.children" :key="i.menuId" :index="String(i.menuId)" @click="changeWebAll(i.menuRouter)">{{ i.menuName}}</el-menu-item>
            </el-sub-menu>
          </el-menu>

        </div></el-aside>
        <el-container>
          <el-header><div class="head_menu">
            <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                background-color="black"
                text-color="#fff"
                active-text-color="#ffd04b"
                @select="handleSelect"
            >
              <el-menu-item index="1" style="font-size: 28px">富辰方舟欢迎您~</el-menu-item>
              <el-menu-item index="2">~</el-menu-item>
              <el-menu-item index="3" style="">{{UserName}}</el-menu-item>
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
          </div></el-header>
          <el-main><div class="main_content">
            <router-view/>
          </div></el-main>
        </el-container>
      </el-container>
    </div>
</template>
<script setup>
import { ref} from 'vue'
import router from "@/routes";
import {ElNotification} from "element-plus";
import {
  Location
} from '@element-plus/icons-vue'
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
function Warning(str){
  ElNotification({
    title: '警告',
    message: str,
    type: 'warning'
  })
}
const UserName=localStorage.getItem("UserName")
const UserLogin=()=>{
  dialogVisible.value = false;
  ExitLogin()
}
const isExit=ref(false)
//退出登录
const ExitLogin=()=>{
  isExit.value=true;
  axios.get("http://localhost:10086/StaffOperations/staffExit?isExit="+isExit.value,{headers:{
      "Authorization-Token":window.localStorage.getItem("Authorization-Token")
    }})
      .then(function (response){
        if(response.data.code==="200"){
          localStorage.removeItem("Authorization-Token")
          Success("退出成功")
          router.push("/")
        }else {
          Warning(response.data.message)
        }
      }).catch(function (error){
        Error(error.message)
  })
}
//用户菜单栏
let data=ref([])
const getMenuData=()=>{
  if (localStorage.getItem("Authorization-Token")!==null){
    console.log('token:'+window.localStorage.getItem("Authorization-Token"))
  axios.get("http://localhost:10087/cms/menu/",{headers:{
      "Authorization-Token":window.localStorage.getItem("Authorization-Token")
    }}).then(function (response){
    if(response.data.code==='200'){
      data.value=response.data.data
      console.log(data.value)
    }else {
      Warning(response.data.message);
      router.push("/");
    }
  }
  ).catch(function (error){
    console.log(error)
  })
  }
}
//跳转main_页面
const changeWebAll=(str)=>{
  router.push("/HomeAll"+str)
}
getMenuData()

</script>
<style scoped>
.main_content{
  border-bottom: 1px solid #545c64;
  border-radius: 0;
}
</style>