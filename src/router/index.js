import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home/Home'
import Comm from '../views/Comm'

Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        // 重定向
        redirect: '/'
    },

    {
        path: "/",
        component: Comm,
        children: [{
            path: '/',
            name: "home",
            component: Home,
            meta: {
                title: '首页'
            }
        }],
    },
    {
        path: "/published",
        component: Comm,
        children: [{
            path: '/',
            name: "published",
            component: () =>
                import ( /* webpackChunkName: "about" */ '../components/published/Published'),
            meta: {
                title: '已发布'
            }
        }],
    },
    {
        path: "/edit",
        component: Comm,
        children: [{
            path: '/',
            name: "edit",
            component: () =>
                import ( /* webpackChunkName: "about" */ '../components/published/Edit'),
            meta: {
                title: '编辑'
            }
        }],
    },
    {
        path: "/look",
        component: Comm,
        children: [{
            path: '/',
            name: "look",
            component: () =>
                import ( /* webpackChunkName: "about" */ '../components/published/Look'),
            meta: {
                title: '查看'
            }
        }],
    },
    {
        path: "/statistics",
        component: Comm,
        children: [{
            path: '/',
            name: "statistics",
            component: () =>
                import ( /* webpackChunkName: "about" */ '../components/statistics/Statistics'),
            meta: {
                title: '统计'
            }
        }],
    },
    {
        path: "/publish",
        component: Comm,
        children: [{
            path: '/',
            name: "publish",
            component: () =>
                import ( /* webpackChunkName: "about" */ '../components/publish/Publish'),
            meta: {
                title: '发表文章'
            }
        }],
    },
    {
        path: "/label",
        component: Comm,
        children: [{
            path: '/',
            name: "Label.vue",
            component: () =>
                import ( /* webpackChunkName: "about" */ '../components/label/Label'),
            meta: {
                title: '标签页'
            }
        }],
    },
    {
        path: "/export",
        component: Comm,
        children: [{
            path: '/',
            name: "export",
            component: () =>
                import ( /* webpackChunkName: "about" */ '../components/export/export'),
            meta: {
                title: '导出Excel'
            }
        }],
    },
    {
        path: "/upload",
        component: Comm,
        children: [{
            path: '/',
            name: "Upload.vue",
            component: () =>
                import ( /* webpackChunkName: "about" */ '../components/upload/Upload'),
            meta: {
                title: '图片上传'
            }
        }],
    },
    {
        path: "/quit",
        component: Comm,
        children: [{
            path: '/',
            name: "quit",
            component: () =>
                import ( /* webpackChunkName: "about" */ '../components/quit/Quit'),
            meta: {
                title: '退出系统'
            }
        }],
    },
    // {
    //     path: "/login",
    //     component: Comm,
    //     children: [{
    //         path: '/',
    //         name: "login",
    //         component: () =>
    //             import ( /* webpackChunkName: "about" */ '../components/login/Login'),
    //         meta: {
    //             title: '登录'
    //         }
    //     }],
    // },
    {
      path: '/login',
      name: 'login',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/login/Login'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '*',
        name: 'err',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Err'),
        meta: {
            title: '登录'
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to,from,next)=>{
    document.title=to.meta.title
    let loginMsg=localStorage.getItem('loginMsg')
    if (to.path==='/login')
        next()
    else
        loginMsg ? next():next('/login')
    if (to.path==='/edit'||to.path==='/look') {
        let a=to.query._id
        a ? next():next('/published')
    }

})

export default router
