<template>
  <div class="login_containner">
    <!-- 头像 -->
    <div class="login_box">
      <div class="login_heard">
        <img src="../assets/img/logo.png" alt="" />
      </div>
      <!-- ref是实例引用LoginFromref就是实例对象名称  -->
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
      // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
    },
    login() {
      // validate（）对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，
      // 并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
      this.$refs.LoginFromref.validate(async (validata) => {
        if (!validata) return
        //  console.log(validata)
        // const data = await this.$http.post('login', this.LoginFrom)
        // console.log (data)
        const { data: res } = await this.$http.post('login', this.LoginFrom)
        // console.log (res)
        if (res.meta.status !== 200) {
          return this.$message.error('登录失败')
        }
        // 调用组件message挂载在vue的$message
        // console.log('登录失败')
        this.$message.success('登录成功')
        // console.log ('登录成功')
        //   将令牌储存到sessionStorage
        window.sessionStorage.setItem('token', res.data.token)
        // 编程式跳转
        this.$router.push('/home')
      })
    },
  },
}
</script>
<style land="less" scoped>
/* 单文件组件尽量加上scoped防止组件之间的样式冲突 */
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
  /* box-sizing: border-box;怪异盒模型  padding和border被包含在定义的width和height之内。
  对象的实际宽度就等于设置的width值，即使定义border和padding也不会改变对象的实际宽度 */
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
  /* transform: translate(-50%, -50%)移动左和上50% 以自己左上角为原点 */
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