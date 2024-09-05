<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/HomeAll/user/staffdetail' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a>成员管理</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div style="border: #f397a9 solid 1px;">
    <div>
      请选择部门:<el-tree-select
        class="selectData"
        v-model="value1"
        :data="data1"
        :render-after-expand="false"
        style="width: 240px"
    />
      请选择日期:
      <el-date-picker
          class="selectData"
          v-model="value"
          type="date"
          placeholder="Pick a day"
          :size="size"
      />
      有无打卡:<el-tree-select
        class="selectData"
        v-model="value3"
        :data="data3"
        :render-after-expand="false"
        style="width: 240px"
    />
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="时间" width="180" />
        <el-table-column prop="name" label="员工名称" width="180" />
        <el-table-column prop="address" label="归属部门" width="180"/>
        <el-table-column prop="Signin" label="打卡情况" width="180"/>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
//获取时间信息
const value = ref()

//获取部门信息
const value1 = ref()
const value3 = ref()
const tableData = [
  {
    date: '2016-05-03',
    name: '张三',
    address: '销售部',
    Signin: '已打卡'
  },
  {
    date: '2016-05-02',
    name: '王五',
    address: '人事部',
    Signin: '已打卡'
  },
  {
    date: '2016-05-04',
    name: '李四',
    address: '财政部',
    Signin: '已打卡'
  },
  {
    date: '2016-05-01',
    name: '赵六',
    address: '综合部',
    Signin: '已打卡'
  },
]
const data1 = [
  {
    value: '1',
    label: '销售部',
  },
  {
    value: '2',
    label: '人事部',
  },
  {
    value: '3',
    label: '技术部',
  },
  {
    value: '4',
    label: '综合部',
  },{
    value: '5',
    label: '财务部',
  },
]
const data3 = [
  {
    value: '1',
    label: '已打卡',
  },
  {
    value: '2',
    label: '未打卡',
  },
]
</script>

<style scoped>
.selectData{
  margin: 5px 20px;
}
</style>