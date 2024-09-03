<template>
  <el-row>
    <el-col :span="24"><div class="grid-content ep-bg-purple-dark">{{ data.staffName }}</div>></el-col>
  </el-row>
</template>

<script setup>
import {reactive} from "vue";

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


</script>

<style scoped>

</style>