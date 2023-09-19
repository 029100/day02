<template>
    <div class="box">
        <div class="login">
            <h3>电商后台管理</h3>
            <el-form :model="FormData" :rules="rules" ref="ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="FormData.username" :prefix-icon="User" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input show-password v-model="FormData.password" :prefix-icon="Lock" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="tologin">登录</el-button>
                    <el-button type="info">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { loginApi } from '../api'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const router =useRouter()
const ruleForm = ref()
const FormData = reactive({
    username: '',
    password: ''
})
const validatePass = (rule: any, value: any, callback: any) => {
    let reg = /^[a-zA-Z]{5,20}$/
    if (reg.test(value)) {
        callback()
    } else {
        callback(new Error('请输入5到20个字符'))
    }
}
const rules = reactive({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在5到20个字符', trigger: 'blur' },
    { validator: validatePass, trigger: 'blur' }
    ],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})
// 登录功能
const tologin = () => {
    ruleForm.value.validate(async(valid: boolean) => {
        if (valid) {
            //发送请求
            loginApi(FormData).then((res:any) => {
                console.log(res, 'loginApi');
                localStorage.setItem('token',res.data.token)
                router.push('/')
                ElMessage.success('登录成功')
            })
            // let res = await loginApi(FormData)
            // console.log(res);
            
        } else {
            ElMessage.error('请输入正确的用户名和密码')
        }
    })
}


</script>
<style lang='scss' scoped>
.box {
    width: 100vw;
    height: 100vh;
    background-color: #28496c;
    display: flex;
    align-items: center;
    justify-content: center;

    .login {
        width: 500px;
        height: 250px;
        border-radius: 5px;
        background-color: #fff;
        padding: 20px;

        h3 {
            margin-bottom: 30px;
        }
    }
}
</style>