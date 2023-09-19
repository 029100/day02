<template>
  <el-container>
      <el-header>
        <div>公司logo</div>
        <div>企业后台管理系统</div>
        <div>
          <el-button type="info" @click="logout">登出</el-button>
        </div>
      </el-header>
      <el-container>
        <!-- <el-aside width="200px"> -->
          
          <el-menu :collapse="isCollapse" router active-text-color="#ffd04b" background-color="#363c44" text-color="#fff">
            <h1 @click="isCollapse=!isCollapse" style="color:#fff">|||</h1>
            <el-sub-menu index="item.id" v-for="item,index in data.list" :key="item.id">
              <template #title>
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item :index="ele.path" v-for="ele in item.children" :key="ele.id">
                {{ ele.authName }}
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        <!-- </el-aside> -->
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
</template>
<script setup lang='ts'>
import {menuApi} from '../api'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const isCollapse =ref(false)
const router =useRouter()
const data =reactive<any>({
  list:[],
})
menuApi().then((res:any)=>{
  console.log(res);
  data.list=res.data
})
// 退出
const logout =()=>{
  // 清除token
  localStorage.removeItem('token')
  // 跳转到登录
  router.push('/login')
}





</script>
<style lang='scss' scoped>
.el-container{
  .el-header{
    background-color: #373d41;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .el-menu{
    height: calc(100vh - 60px);
    h1{
      text-align: center;
    }
  }
}
</style>