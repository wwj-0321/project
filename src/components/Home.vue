<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="../assets/img/heima.png" alt="" />
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="loginout">退出</el-button>
    </el-header>
    <!-- 侧边 -->
    <el-container>
      <el-aside :width="iscollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="togglebutton">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          :default-active="activePath"
          :unique-opened="true"
          :collapse="iscollapse"
          :collapse-transition="false"
          :router="true"
        >
          <!-- :router="true"是否将index当path进行跳转 -->
          <!-- :collapse-transition='false'折叠动画是否开启 -->
          <!--  :collapse='iscollapse'是否水平折叠菜单 -->
          <!-- :unique-opened="true"     子菜单只能保持一个打开 -->
          <!-- unique-opened 二级菜单同时打开与否  unique-opened 或:unique-opened='true'都可以必须加：不然认为true是字符串不是属性值-->
          <!-- 一级菜单 :index="item.id+''是动态绑定一个index不会一点就所有菜单打开 +''是转换字符串 index只接受字符串 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <!--  :index="'/'+subItem.path" 原来是ID跳转  这里设置获取的后台数据path -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavStatus('/' + subItem.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体 -->
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      menulist: [],
      iconsObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao',
      },
      iscollapse: false,
      activePath: '',
    }
  },
  // 在页面加载出来就要生成菜单 所以在这里调用生命周期函数
  created() {
    this.getMenuList()

    this.activePath = window.sessionStorage.getItem('activePath')
    // 刷新的时候取的 赋值给activePath
  },
  methods: {
    saveNavStatus(activePath) {
      // 保存链接激活状态 刷新的时候（之后）保持高亮
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
      // 单击的时候取的 赋值给activePath
    },

    loginout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    togglebutton() {
      this.iscollapse = !this.iscollapse
    },
    // 获取菜单
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
      //console.log(res)
    },
  },
}
</script>
<style land='less' scoped>
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: white;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.iconfont {
  margin-right: 10px;
}
.home-container {
  height: 100%;
}
.el-menu {
  border-right: 0px;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  /* justify-content: space-between;两端对齐项目间隔距离相同 */
  padding-left: 0px;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
.el-header div {
  display: flex;
  align-items: center;
  /* align-items交叉轴对齐方式 */
}
.el-header div span {
  margin-left: 15px;
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
</style>