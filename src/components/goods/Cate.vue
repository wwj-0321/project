<template>
    <div>
       <!-- 面包屑  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图 -->
    <el-card>
         <!--添加分类按钮区域  -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="showaddCateVisible">添加分类</el-button>
        </el-col>
      </el-row> 
        <!--表格 在tree-table中scope.row.cat_level === 0后面似乎不要双引号但是在el-table需要-->
     <tree-table class="treeTable" :data="CateList" :columns="columns"
     :selection-type="false" :expand-type="false"
     :show-index="true" index-text="#" border
     :show-row-hover="false">
     <template slot="isok" slot-scope="scope">
      <i class="el-icon-success" style="color:lightgreen;" v-if="scope.row.cat_deleted===false"></i>
      <i class="el-icon-error" style="color:lightgreen;" v-else></i>
     </template>
     <template slot="order" slot-scope="scope" >
    <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
    <el-tag size="mini" type="success" v-else-if="scope.row.cat_level ===1">二级</el-tag>
    <el-tag size="mini" type="warning" v-else>三级</el-tag>
    </template>
          <!-- 操作 -->
      <template slot="opt">
            <!-- 修改按钮  -->
         <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <!-- 删除按钮 -->
         <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
      </template>
     </tree-table>
        <!--分页  -->
        <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="querInfo.pagenum"
      :page-sizes="[3, 5, 10, 15]"
      :page-size="querInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
      </el-card>
      <el-dialog
  title="添加分类"
  :visible.sync="addCateVisible"
  width="50%"
  @close="addCateDialogClosed">
  <!-- 添加分类的表单 -->
  <!-- Form 组件提供了表单验证的功能，
  只需要通过 rules 属性传入约定的验证规则，
  并将 Form-Item 的 prop 属性设置为需校验的字段名即可
  。校验规则参见 async-validator -->
 <el-form :model="addCateFrom" :rules="addCateFromRules" 
 ref="addCateFromRef" label-width="100px" >
  <el-form-item label="分类名称：" prop="cat_name">
   <el-input v-model="addCateFrom.cat_name"></el-input>
  </el-form-item>
  <el-form-item label="父级分类：" >
    <!-- options 指定数据源 
      :props="{ expandTrigger: 'hover' }"
       v-model="selectedKeys"双向绑定
       选中的父级分类的ID数组  -->
     <el-cascader
    v-model="selectedKeys"
    :options="ParentCateList"
    :clearable="true"
    :props="cascaderProps"
    @change="parentCateChange"
   ></el-cascader>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addCateVisible = false">取 消</el-button>
    <el-button type="primary" @click="addCate">确 定</el-button>
  </span>
</el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
          // 涉及分页就要创建querInfo
          querInfo:{
            // 显示层级几层
            type:3,
            // 当前页码值
            pagenum:1,
            // 每页显示多少条数据
            pagesize:5
          },
          // 父级分类权限列表
          ParentCateList:[],
          // 商品分类列表
          CateList:[],
          // 总数据条数
          total:0,
          // 为table 定义列
          columns:[{
            label:'分类名称',
            prop:'cat_name'

          },{
            label:'是否有效',
            // 定义为模板列
            type:'template',
            // 表示当前这一列使用的模板名称
            template:'isok'

          },
          {
            label:'排序',
            //表示我们想 定义为模板列
            type:'template',
            // 表示当前这一列使用的模板名称
            template:'order'

          },
          {
            label:'操作',
            // 定义为模板列
            type:'template',
            // 表示当前这一列使用的模板名称
            template:'opt'

          }
          ],
          // 控制添加分类显示对话框
          addCateVisible:false,
          // 添加分类的当前数据
          addCateFrom:{
            // 将要添加的分类名字
            cat_name:'',
            // 将要添加的分类父级id
            cat_pid:'0',
            // 将要添加的分类的层级
            cat_level:'0'
          },
          // 添加分类的规则
          addCateFromRules:{
            cat_name:[
              {required: true, message: '请输入分类名称', trigger: 'blur'
              
            },
            
      
            ]
            },
            //指定级联选择器的配置对象
          cascaderProps:{
            value:'cat_id',
            label:'cat_name',
            expandTrigger: 'hover',
            children:'children',
            checkStrictly:'true'
          //   和change-on-select作用一样
            },
            // 选中的父级分类的ID数组
            selectedKeys:[],
          
          

        }
    },
    created(){
      this.getCateList()
    },
    methods:{
      // 获取商品分类列表
     async getCateList() {
      //  const data= await  this.$http.get('categories',{params:this.querInfo})
      //  console.log(data)
       // const data= await  this.$http.get('categories',{params:this.querInfo})
       const{data:res}= await  this.$http.get('categories',{params:this.querInfo})
            //  console.log(res)
         if(res.meta.status!==200){
           return this.$message.error('获取商品分类失败');
         }
           
            // console.log(res.data)
            // 商品分类列表赋值
          this.CateList=res.data.result
            // 总条数赋值
          this.total=res.data.total
          },
      // 监听 pagesize
      handleSizeChange(newSize){
          this.querInfo.pagesize=newSize
          this.getCateList()
      },
      //监听pagenum
      handleCurrentChange(newPage){
        this.querInfo.pagenum=newPage
        this.getCateList()
      },
      // 点击按钮，展示添加分类的对话框
      showaddCateVisible(){
        // 获取父级分类
        this.getParentCateList()
        // 显示对话框
        this.addCateVisible=true
      },
      // 获取父级分类列表
   async getParentCateList(){
       const{data:res}=await this.$http.get('categories',{params:{type:2}})
       if(res.meta.status!==200){
           return this.$message.error('获取父级分类失败');
         }
        //  console.log(res.data)
          this.ParentCateList=res.data
      },
      //级联选择器的选择项发生变化触发
    parentCateChange(){
      // console.log(this.selectedKeys)
      // 如果当级联选择器选择了父级分类，那么
      // selectedKeys的长度就不会为零
      if(this.selectedKeys.length>0){
        // 父级分类的ID
     this.addCateFrom.cat_pid=this.selectedKeys[this.selectedKeys.length-1]
      // 为当前分类的等级赋值,
      // 这时候的cat-level和length正好一直相等
      this.addCateFrom.cat_level=this.selectedKeys.length
      return
      }else{// 父级分类的ID
        this.addCateFrom.cat_pid=0
        // 为当前分类的等级赋值,
        this.addCateFrom.cat_level=0
      }
    },
    // 确定按钮，添加新的分类
    addCate(){
      // this.addCateVisible = false
      // console.log(this.addCateFrom)
      this.$refs.addCateFromRef.validate(async valid=>{
        if(!valid) {return}
     const{data:res}=  await this.$http.post('categories',this.addCateFrom)
      if(res.meta.status!==201){return this.$message.error('添加分类失败')}
      this.$message.success('添加分类成功')
      this.getCateList()
      this.addCateVisible = false
      })

    },
    // 清空表单
    addCateDialogClosed(){
      this.$refs.addCateFromRef.resetFields()
      this.selectedKeys=[]
      // 父级分类的ID
        this.addCateFrom.cat_pid=0
        // 为当前分类的等级赋值,
        this.addCateFrom.cat_level=0
    }
    }
}
</script>
<style lang="less" scope>
.treeTable{
  margin-top: 15px;
}
.el-cascader{
  width: 100%;
}

</style>