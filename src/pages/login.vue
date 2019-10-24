<template>
  <div class="login">
    <div class="container">
        <img src="../assets/timg.jpg" alt class="avatar" />
      <el-form :model="loginForm"
        :rules="rules"
        ref="loginForm"
        class="demo-ruleForm"
        >
        <el-form-item label prop="username">
          <el-input prefix-icon="icon-user-check" v-model="loginForm.username" placeholder='请输出用户名'></el-input>
        </el-form-item>
        <el-form-item label prop="password">
          <el-input prefix-icon="icon-key" v-model="loginForm.password" placeholder='请输出密码' type='password'></el-input>
        </el-form-item>
        <el-form-item>
      <el-button type="primary" class="login-btn" @click="login">登录</el-button>
       </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/users.js'
export default {
  data () {
    return {
      loginForm: {
        username: '10086',
        password: '123'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /\w{1}/, message: '用户名不符合，不能包含特殊符号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, mix: 12, message: '请输入长度3~12位的密码', trigger: 'blur' }
        ]

      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          let res = await login(this.loginForm)
          console.log(res)

          if (res.status === 200 && res.data.message === '登录成功') {
            localStorage.setItem('heima_backstage_37_token', res.data.data.token)
            this.$router.push({ name: 'Index' })
          } else if (res.status === 200 && res.data.statusCode === 401) {
            this.$message.error('登陆失败')
          } else {
            this.$message.warning('数据输入不合法')
            return false
          }
        }
      })
    }

  }
}
</script>

<style lang='less' scoped>
.login{
    position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
.container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
