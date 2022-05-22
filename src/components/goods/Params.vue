<template>
  <div>
    <!-- 面包屑  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert
        :closable="false"
        show-icon
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
      ></el-alert>
      <!-- 选择商品区域 -->
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类：</span>
          <!-- 级联选择器 -->
          <el-cascader
            v-model="selectedCatekeys"
            :options="Catelist"
            :props="CateProps"
            @change="handleChange"
          ></el-cascader>
        </el-col>
      </el-row>
      <!-- 标签页 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" size="mini" :disabled="isBtnDisabled"
            >添加参数</el-button
          >
          <el-table border stripe :data="manyTableData">
            <el-table-column type="expand"></el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column
              prop="attr_name"
              label="参数名称"
            ></el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button size="mini" type="primary" icon="el-icon-edit"
                  >编辑</el-button
                >
                <el-button size="mini" type="danger" icon="el-icon-delete"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" size="mini" :disabled="isBtnDisabled"
            >添加属性</el-button
          >
          <el-table border stripe :data="onlyTableData">
            <el-table-column type="expand"></el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column
              prop="attr_name"
              label="属性名称"
            ></el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button size="mini" type="primary" icon="el-icon-edit"
                  >编辑</el-button
                >
                <el-button size="mini" type="danger" icon="el-icon-delete"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template> 
<script>
export default {
  data() {
    return {
      Catelist: [],
      // 级联选择器双向绑定数据
      selectedCatekeys: [],

      CateProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        children: 'children',
        label: 'cat_name',
      },
      // 页签被激活的页签
      activeName: 'many',
      manyTableData: [],
      onlyTableData: [],
    }
  },
  created() {
    this.getCatelist()
  },
  methods: {
    async getCatelist() {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类失败！')
      }
      this.Catelist = res.data
      //  console.log(res.data);
    },
    // 监听级联选择器选中项变化，会触发这个函数
    handleChange() {
      this.getParamsData()
    },
    //  Tab页签点击事件的处理函数
    handleTabClick() {
      // console.log('this.selectedCatekeys');
      this.getParamsData()
    },
    async getParamsData() {
      // console.log(this.selectedCatekeys);
      if (this.selectedCatekeys.length !== 3) {
        return (this.selectedCatekeys = [])
      } else {
        // console.log(this.selectedCatekeys);
        // 请求中的是反引号
        const { data: res } = await this.$http.get(
          `categories/${this.cateId}/attributes`,
          { params: { sel: this.activeName } }
        )
        //  console.log(this.cateId)
        if (res.meta.status !== 200) {
          return this.$message.error('获取分类列表失败')
        } else {
          console.log(res.data)
          if (this.activeName === 'many') {
            this.manyTableData = res.data
          } else {
            this.onlyTableData = res.data
          }
        }
      }
    },
  },
  computed: {
    // tab是否禁用
    isBtnDisabled() {
      if (this.selectedCatekeys.length !== 3) {
        return true
      } else {
        return false
      }
    },
    cateId() {
      if (this.selectedCatekeys.length === 3) {
        return this.selectedCatekeys[2]
      } else {
        return null
      }
    },
  },
}
</script>
<style lang="less" scoped>
.cat_opt {
  margin: 15px 0;
}
</style>
