<template>
  <div class="login-page">
    <div class="login-form" style="background-color: whitesmoke;">
      <el-button round @click="ChangeWeb" style="background-color: rgba(224,204,28,0.15)">返回首页</el-button>
      <h2 class="login-title" style="color: blue;">{{ title }}</h2>
      <el-input class="telephone" v-model="loginAll.telephone" placeholder="电话号码" prefix-icon="el-icon-mobile"
        clearable></el-input>
      <!--验证码判断，做确认操作-->
      <div v-if="CheckCatcha==='验证码'">
        <el-input class="telephone" v-if="title === '短信验证'" v-model="Captcha" placeholder="请输入验证码"
                  prefix-icon="el-icon-mobile" clearable style="width: 200px;"></el-input>
        <el-button v-if="title === '短信验证'" @click="CheckNum" type="success" :icon="Check" circle
                   style="margin-top: -20px;" />
        <div style="width: 200px; height: 20px;">
          <!-- 随机验证码 -->
          <span v-if="title === '短信验证' && RandomNum !== 0"
                style="margin-left: 10px;margin-right: 10px;background-color: white;">{{ RandomNum }}</span>
          <!-- 刷新验证码 -->
          <el-button v-if="title === '短信验证'" @click="refreshRandomNumber" :icon="Search" circle
                     style="margin-top: -20px;" />
          <span v-if="title === '短信验证'">获取验证码</span>
        </div>
      </div>
      <!--手机短信获取-->
      <div v-if="CheckCatcha==='手机验证码'">
        <el-input class="telephone" v-if="title === '短信验证'" v-model="telephoneCaptcha" placeholder="请输入手机短信验证码"
                  prefix-icon="el-icon-mobile" clearable style="width: 200px;"></el-input>
        <el-button v-if="title === '短信验证'" @click="CatpchaTelephoneForLogin" type="primary" style="width: 100px;margin:-20px 20px 0px 0px " >获取验证码</el-button>
      </div>
      <el-input class="pass" v-if="title !== '短信验证'" v-model="loginAll.userPassword" placeholder="密码"
        prefix-icon="el-icon-lock" show-password type="password"></el-input>
      <el-input v-if="title === '注册'" class="pass" v-model="OkPassword" placeholder="确认密码" prefix-icon="el-icon-lock"
        show-password type="password"></el-input>
      <div class="action-buttons">
        <el-button class="login-button" v-if="title === '登录'" round @click="handleLogin">登录</el-button>
        <el-button class="login-button" v-if="title === '短信验证'" round @click="TelephoneLogin">短信登录</el-button>
        <el-button class="register-button" v-if="title === '注册'" round @click="ChangeRegister">注册</el-button>
      </div>
      <div style="font-size: 20px">
        <ul>
          <li>
            <a class="return" v-if="title !== '短信验证'" style=""
               @click="ChangeLoginMessage">短信验证登录</a>
          </li>
          <li>
            <a class="return" v-if="title !== '注册'" style=""
               @click="ChangeRegister">注册新账户</a>
          </li>
          <li>
            <a class="return" v-if="title === '注册' || title === '短信验证'" style=""
               @click="ChangeLogin">点击返回登录</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { reactive, ref } from 'vue';
import router from '../routes';
import { Check, Search } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
let title = ref("登录");
const OkPassword = ref("")
const loginAll = reactive({
  telephone: "",
  userPassword: ""
});
const Captcha = ref()
const telephoneCaptcha=ref("")
const RandomNum = ref()
//生成随机数字
const refreshRandomNumber = () => {
  RandomNum.value = Math.floor(Math.random() * 9000) + 1000;
}
let CheckCatcha=ref("验证码")

const CheckNum = () => {
  console.log(RandomNum.value);
  console.log(Captcha.value)
  if(RandomNum.value===Math.floor(Captcha.value)){
    Success("验证成功");
    CheckCatcha.value="手机验证码";
  }else{
    refreshRandomNumber();
    Error("验证失败");
  }

}
//获取手机短信验证码
const CatpchaTelephoneForLogin = () => {
  console.log(loginAll.telephone);
    if(codeVerification(loginAll.telephone)===true){
      axios.get("http://192.168.0.132:8888/authentication/getVerificationCode?staffPhone="+loginAll.telephone+"&isSend=true")
          .then(function (response){
            if(response.data.code==="200"){
              Success(response.data.message);
              console.log(response);
            }else{
              Error(response.data.message);
              console.log(response);
            }
          }).catch(function (error){
        Error("服务器错误");
        console.log(error);
      })
    }else {
      Warning("手机号格式错误");
    }
}

//账号登陆
const handleLogin = () => {
  console.log(loginAll);
  axios.post ("http://192.168.0.132:8888/authentication/signON?staffAccount="+loginAll.telephone+"&password="+loginAll.userPassword)
  .then(function (response) {
    console.log(response);
    if (response.data.code === "200") {
      localStorage.setItem("token", response.data.data);
      Success(response.data.message);
      router.push("/")
    } else {
      Error(response.data.message);
    }
  })
};

//手机号短信登录
function codeVerification(phone){
  let phoneCodeVerification = /^[1][3,4,5,7,8][0-9]{9}$/;
  return phoneCodeVerification.test(phone);
}
function codeCaptcha(code){
  let codeCaptcha = /^\d{6}$/;
  return codeCaptcha.test(code);
}
function Success(str){
  ElNotification({
    title: '成功',
    message: str,
    type: 'success'
  })
}
function Error(str){
  ElNotification({
    title: '失败',
    message: str,
    type: 'error'
  })
}
function Warning(str){
  ElNotification({
    title: '警告',
    message: str,
    type: 'warning'
  })
}
const TelephoneLogin = () => {
   if (telephoneCaptcha.value!==null&&telephoneCaptcha.value!==""){
     axios.post("http://192.168.0.132:8888/authentication/signOnWithSMS?staffPhone="+loginAll.telephone+"&smsCode="+telephoneCaptcha.value)
     .then(function (response){
       console.log(response);
       if(response.data.code==="200"){
         localStorage.setItem("token",response.data.data);
         Success(response.data.message);
         router.push("/")
       }else{
         Error(response.data.message);
      }
     })
   }else if(codeVerification(loginAll.telephone)){
     Warning("手机号码格不对")
   }
   else if(codeCaptcha(telephoneCaptcha.value)){
     Warning("验证码格式不对");
   }else {
     Warning("手机号码或者验证码不能为空");
   }
}
const ChangeWeb = () => {
  router.push("/")
}
const ChangeRegister = () => {
  //修改页面内容
  title.value = "注册";
}
const ChangeLogin = () => {
  //修改页面内容
  title.value = "登录";
}
const ChangeLoginMessage = () => {
  title.value = "短信验证"
}
</script>

<style scoped>
ul li {
  list-style-type: none;
}
ul li a{
  text-decoration: none;
  font-size: 13px;
  margin-top: 20px;
  margin-left: 280px;
}
.return:hover {
  color: red; /* 悬停时的颜色 */
}
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(138, 190, 210, 0.61);
  font-family: 'Arial', sans-serif;
}

.login-form {
  background: #c78ad2;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-title {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.telephone,
.pass {
  margin-bottom: 20px;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.login-button,
.register-button {
  flex: 1;
  margin: 0 5px;
  padding: 10px;
  font-size: 16px;
  border-color: #409eff;
  background-color: #409eff;
  color: white;
  transition: background-color 0.3s, transform 0.2s;
}

.login-button:hover,
.register-button:hover {
  background-color: #1c8de0;
  transform: scale(1.03);
}

@media (max-width: 768px) {
  .login-form {
    padding: 20px;
  }

  .login-title {
    margin-bottom: 15px;
  }

  .telephone,
  .pass {
    margin-bottom: 15px;
  }

  .action-buttons {
    flex-direction: column;
    align-items: center;
  }

  .login-button,
  .register-button {
    width: 90%;
    margin: 5px 0;
  }
}
</style>