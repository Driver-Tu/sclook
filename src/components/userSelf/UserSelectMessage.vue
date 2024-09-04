<template>
    <div class="common-layout" style="background-color: #f3ef97">
      <el-container>
        <el-aside width="300px" height="1000px">
          <div class="container" >
          <div style="border: black 2px solid; background-color: azure;margin-left: 60px">
            <h3 style="background-color: #f3ef97;text-align: center">员工头像</h3>
            <img :src="data.avatarUrl" alt="" style="width:200px;margin-left: 20px">
            <el-button round style="margin-top:10px;background-color:blanchedalmond;float: right"><el-icon><EditPen /></el-icon></el-button>
          </div>
        </div>
        </el-aside>
        <el-main>
          <div style="background-color: azure;border: #333333 2px solid; width: 666px;margin-left: 100px">
            <div>
              <h3 style="background-color: #f3ef97;text-align: center">{{ title }}</h3>
            </div>
            <div class="messageAll" style="margin-left: 40px">
              <div>姓名:<el-input class="message" style="width: 240px" disabled :placeholder="data.staffName"/><br></div>
              <div>性别:<el-input class="message" style="width: 240px" disabled :placeholder="data.sex"/><br></div>
              <div>年龄:<el-input class="message" style="width: 240px" disabled :placeholder='data.age'/><br></div>
              <div>电话:<el-input class="message" style="width: 240px" disabled :placeholder="data.phone"/><br></div>
              <div>地址:<el-input class="message" style="width: 240px" disabled :placeholder="data.address"/><br></div>
              <div>邮箱:<el-input class="message" style="width: 240px" disabled :placeholder="data.mail"/><br></div>
              <div v-if="TurnOff!=='更多信息'">生日:<el-input  class="message" style="width: 240px" disabled :placeholder="data.birth"/><br></div>
              <div v-if="TurnOff!=='更多信息'">到岗时间:<el-input  class="message" style="width: 240px" disabled :placeholder="data.injobtime"/><br></div>
              <div v-if="TurnOff!=='更多信息'">入职时间:<el-input  class="message" style="width: 240px" disabled :placeholder="data.currenttime"/><br></div>
              <div v-if="TurnOff!=='更多信息'">个人介绍:<el-input  class="message" style="width: 240px" disabled :placeholder="data.desc"/><br></div>
              <div v-if="TurnOff!=='更多信息'">个人爱好:<el-input  class="message" style="width: 240px" disabled :placeholder="data.hobby"/><br></div>
              <div v-if="TurnOff!=='更多信息'">员工职位:<el-input  class="message" style="width: 240px" disabled :placeholder="data.jobtitleName"/><br></div>
              </div>
            <div style="margin-top: 20px;float: right">
              <el-button round style="margin-top:-20px;background-color:blanchedalmond " @click="drawer=true">编辑信息<el-icon><Edit /></el-icon></el-button>
              <el-button round style="margin-top:-20px;background-color:#ecb668 " @click="TurnOn">{{ TurnOff }}<el-icon><More/></el-icon></el-button>
            </div>
            </div></el-main>
      </el-container>
    </div>
  <el-drawer v-model="drawer" title="修改个人信息" :beforeClose="handleClose">
    <div class="messageAll" style="margin-left: 40px">
      <div>姓名:<el-input v-model="UpdateData.staffName" class="message" style="width: 240px"  placeholder="修改姓名"/><br></div>
      <div>地址:<el-input v-model="UpdateData.address" class="message" style="width: 240px"  placeholder="修改地址"/><br></div>
      <div>邮箱:<el-input v-model="UpdateData.mail" class="message" style="width: 240px"  placeholder="修改邮箱"/><br></div>
      <div>个人介绍:<el-input  v-model="UpdateData.desc" class="message" style="width: 240px"  placeholder="修改个人介绍"/><br></div>
      <div>个人爱好:<el-input  v-model="UpdateData.hobby" class="message" style="width: 240px"  placeholder="修改个人爱好"/><br></div>
    </div>
    <div>
      <el-button round style="margin-top:20px;background-color:blanchedalmond " @click="UpdateSelfData()">提交修改</el-button>
      <el-button round style="margin-top:20px;background-color:blanchedalmond ">修改手机号<el-icon><Edit /></el-icon></el-button>

    </div>
  </el-drawer>
</template>

<script setup>
import axios from "axios";
import {reactive, ref} from "vue";
import router from "@/routes";
import {ElNotification,ElMessageBox} from "element-plus";

const drawer = ref(false)
const title=ref("基本信息")
const TurnOff=ref("更多信息")
const TurnOn=()=>{
  if (TurnOff.value==='更多信息'){
    title.value="详细信息"
    TurnOff.value="收起"
  }else {
    title.value="基本信息"
    TurnOff.value="更多信息"
  }
}
const data=reactive({
      detailId: null,
      staffId: null,
      staffName: null,
      avatarUrl: null,
      desc: null,
      sex: null,
      currenttime: null,
      injobtime: null,
      retiretime: null,
      departName: null,
      jobtitleName: null,
      mail: null,
      phone: null,
      address: null,
      age: null,
      hobby: null,
      home: null,
      emergencycall: null,
      graduateschool: null,
      academy: null,
      birth: null
})
const UpdateData=reactive({
  staffName:"",
  address:"",
  mail:"",
  desc:"",
  hobby:"",
})
const getSelfData=()=>{
  //获取当前用户信息
  axios.get("http://localhost:10086/StaffPersonal/staffDetail",{headers:{"Authorization-Token":window.localStorage.getItem("Authorization-Token")}})
  .then(res=>{
    console.log(res)
    if (res.data.code==="200"){
      data.detailId=res.data.data.detailId
      data.staffId=res.data.data.staffId
      data.staffName=res.data.data.staffName
      data.avatarUrl=res.data.data.avatarUrl
      data.desc=res.data.data.desc
      if(res.data.data.sex===true){
        data.sex="男"
      }else {
        data.sex="女"
      }
      data.currenttime=res.data.data.currenttime
      data.injobtime=res.data.data.injobtime
      data.retiretime=res.data.data.retiretime
      data.departName=res.data.data.departName
      data.jobtitleName=res.data.data.jobtitleName
      data.mail=res.data.data.mail
      data.phone=res.data.data.phone
      data.address=res.data.data.address
      data.age=res.data.data.age
      data.hobby=res.data.data.hobby
      data.home=res.data.data.home
      data.emergencycall=res.data.data.emergencycall
      data.graduateschool=res.data.data.graduateschool
      data.academy=res.data.data.academy
      data.birth=res.data.data.birth
    }else {
      Warning("获取个人信息失败，请登录重新获取")
      router.push("/")
    }
}).catch(err=>{
  console.log(err)
  })
}

const UpdateSelfData=()=>{
  axios.post("http://localhost:10086/StaffPersonal/detailUpdate",UpdateData,{headers:{"Authorization-Token":window.localStorage.getItem("Authorization-Token")}}).then(function (response){
    if (response.data.code==="200"){
      Success("修改成功")
      getSelfData()
      localStorage.setItem("UserName",UpdateData.staffName)
      drawer.value=false
      location.reload();
    }else {
      Warning(response.data.message)
    }
  }).catch(
      function (error){
        console.log(error)
      }
  )
}
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
const handleClose = (done) => {
  ElMessageBox.confirm('您确定放弃这次修改?')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
}
//加载页面时调用初始调用
getSelfData()
</script>

<style scoped>
.message{
  margin: 10px 20px;
}
.grid-content ep-bg-purple{
  margin-bottom: 10px;
}
.container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
  height: 100%;            /* 设置容器高度为父容器高度 */
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;     /* 内部元素垂直居中 */
  justify-content: center; /* 内部元素水平居中 */
}

.content > div:first-child {
  margin-bottom: 10px; /* 添加一些间距 */
}
</style>