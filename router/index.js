import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../src/components/login.vue'
import Home from '../src/components/Home.vue'
import Welcome from '../src/components/welcome.vue'
import Users from '../src/components/user/User.vue'
import Rights from '../src/components/power/Rights.vue'
import Rloes from '../src/components/power/Rloes.vue'
import Cate from '../src/components/goods/Cate.vue'
import Params from '../src/components/goods/Params.vue'
Vue.use(VueRouter)
const routes=[
    {
        path:'/',redirect:'/login'
    },
    {
        path:'/login',component:Login
    },
    {
        path:'/home',component:Home,redirect:'/welcome',
        children:[
            {
            path:'/welcome',component:Welcome
            },
            {
            path:'/users',component:Users
             },
             {
                path:'/rights',component:Rights
             },
             {
                path:'/roles',component:Rloes
             },
             {
                path:'/categories',component:Cate
             },
             {
                path:'/params',component:Params
             }
    ]

    }
]
const router=new VueRouter({
    routes
})
// 挂载路由守卫
router.beforeEach((to,from,next)=>{
    if(to.path==='/login')return next()
    const tokenstr=window.sessionStorage.getItem('token')
    if(!tokenstr) return next('/login')
    next()
})
export default router