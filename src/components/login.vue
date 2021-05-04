<template>
  <div class="login_containner">
    <!-- 头像 -->
    <div class="login_box">
      <div class="login_heard">
        <img src="../assets/img/logo.png" alt="" />
      </div>
      <el-form
        ref="LoginFromref"
        :model="LoginFrom"
        :rules="rules"
        label-width="0px"
        class="login_from"
      >
        <el-form-item prop="username">
          <el-input
            prefix-icon="iconfont icon-user"
            v-model="LoginFrom.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-3702mima "
            v-model="LoginFrom.password"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginFrom">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 登入 -->
  </div>
</template>
<script>
import '../../network/request.js'
export default {
  data() {
    return {
      LoginFrom: {
        username: 'admin',
        password: '123456',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10个字符', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    resetLoginFrom() {
      this.$refs.LoginFromref.resetFields()
    },
    login() {
      this.$refs.LoginFromref.validate(async (validata) => {
        if (!validata) return
        //  console.log(validata)
        const { data: res } = await this.$http.post('login', this.LoginFrom)
        // console.log (res)
        if (res.meta.status !== 200) return this.$message.error('登录失败')
        // console.log('登录失败')
        this.$message.success('登录成功')
        // console.log ('登录成功')
        //   将令牌储存到sessionStorage
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    },
  },
}
</script>
<style land="less" scoped>
.login_containner {
  background: #2b4b6b;
  height: 100%;
}
.login_from {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login_heard {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  background: #fff;
  transform: translate(-50%, -50%);
}
img {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  background-color: #eee;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>