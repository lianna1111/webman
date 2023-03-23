import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router";
import User from '@/api/User'
import { setLogout } from '@/util/main'
import Home from '@/view/Home.vue'
import Login from '@/view/Login.vue'
import Main from '@/view/Main.vue'
import Error from '@/view/Error.vue'

function getChildrenRoute(){
    const view = import.meta.glob('../view/controller/**/*.vue')
    const routes = [{path:'/',name:'main',component:Main}] as RouteRecordRaw[]

    Object.keys(view).forEach((key)=>{
        const name = key.split('controller/').pop()?.split('.').shift()?.toLocaleLowerCase().replace('/index','') as string

        const route = {
            path: `/${name}`,
            name,
            meta: {auth: true},
            component: view[key]
        } as RouteRecordRaw

        routes.push(route)
    })

    return routes
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            meta: {auth: true},
            component: Home,
            children:getChildrenRoute()
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path:'/:any(.*)',
            name:'error',
            component:Error
        }
    ] as RouteRecordRaw[]
})

router.beforeEach((to,from,next)=>{
    if(to.meta.auth){
        const uid = localStorage.getItem('uid')!
        const token = localStorage.getItem('token')!
        User.check(uid,token).then((res)=>{
            if(res.data.code === 0){
                next()
            }else{
                setLogout()
                next({name:'login'})
            }
        }).catch((res)=>{
            setLogout()
            next({name:'login'})
        })
    }else{
        next()
    }
})

router.beforeResolve((to,from)=>{
    // console.log('beforeResolve')
})

router.afterEach((to,from,fail)=>{
    // console.log('afterEach')
})

export default router