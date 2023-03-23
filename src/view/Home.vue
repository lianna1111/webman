<script setup lang="ts">
    import router from '@/router'
    import {ref,reactive,onMounted} from 'vue'
    import skinsData from '@/api/Skin'
    import User from '@/api/User'
    import Menu from '@/api/Menu'
    import { UserObj,ItemList } from '@/util/interface'
    import { setLogout } from '@/util/main'

    const skinIndex = ref(0)
    const skin = ref()
    const width = ref()
    const bg_aside = ref()
    const bg_header = ref()
    const pid = ref(1)
    const isCollapse = ref(false)
    const menuData = ref([] as ItemList[])
    const user = ref<UserObj>()

    onMounted(async () => {
        await init()
    })

    // 初始化数据
    const init = async () => {
        setSkin()
        getUser()
        getMenu()
    }

    // 设置皮肤
    const setSkin = () => {
        skinIndex.value = localStorage.getItem('skin') ? parseInt(localStorage.getItem('skin')!) : 0
        setSkinData()
    }

    const changeSkin = (id:number) => {
        const dskin = skin.value
        skinIndex.value = dskin.findIndex((item:any)=>{
            return item.id == id
        })
        localStorage.setItem('skin',skinIndex.value as unknown as string)
        setSkinData()
    }

    const setSkinData = () => {
        skinsData.get().then((res)=>{
            // console.log(res.data)
            if(res.data.code === 0){
                skin.value = res.data.data

                const sdata = skin.value.find((item:any,index:number)=>{
                    return index == skinIndex.value
                })
                // console.log(sdata)
                width.value = sdata.w_aside
                bg_aside.value = sdata.bg_aside
                bg_header.value = sdata.bg_header
            }
        })
    }

    // 获取用户
    const getUser = () => {
        const uid = localStorage.getItem('uid')!
        User.get(uid).then((res)=>{
            // console.log(res.data.data)
            if(res.data.code === 0){
                user.value = res.data.data as unknown as UserObj
            }
        })
    }

    const getMenu = () => {
        Menu.tree().then((res)=>{
            // console.log(res)
            menuData.value = JSON.parse(JSON.stringify(res.data.data))
            console.log( menuData.value);
            
        }).catch((res)=>{
            console.log(res)
        })
    }

    const handleOpen = (key: string, keyPath: string[]) => {
        console.log('menu',key, keyPath)
    }

    const handleClose = (key: string, keyPath: string[]) => {
        console.log('menu',key, keyPath)
    }

    const changeMenu = (e:any) => {
        console.log('menu index: '+e.split('_').shift());
        if(e.split('_').shift() == 'suffix'){

        }else{
            pid.value = e
        }
    }

    const logout = () => {
        if(confirm('确定要退出登录么?')){
            setLogout()
            setTimeout(()=>{
                router.push('/login')
            },500)
        }
    }
</script>

<template>
    <el-container class="h-screen">
        <el-aside :width="width" :style="'background-color:'+bg_aside+';'">
            <div class="text-center mt-10">
                <el-avatar :size="50" :src="user?.face ? user?.face : '/unkown.png'" />
                <h5>{{user?.nickname}}</h5>
            </div>
            <el-scrollbar height="calc(100vh - 200px)">
                <element-menu :pid="pid" :isCollapse="isCollapse" :items="menuData" class="menu-demo" @open="handleOpen" @close="handleClose"></element-menu>
            </el-scrollbar>
        </el-aside>
        <el-container>
            <el-header :style="'background-color:'+bg_header+';'">
                <element-menu :pid="0" :isTop="true" :isCollapse="false" mode="horizontal" :ellipsis="false" :items="menuData" @open="handleOpen" @close="handleClose" @select="changeMenu">
                    <template #prefix>
                        <el-menu-item index="0" style="border:unset">
                            <el-icon :size="22" :class="['h-[60px]','outline-none','cursor-pointer','duration-1000',isCollapse?'shrink':'']" @click="isCollapse=!isCollapse"><Fold /></el-icon>
                        </el-menu-item>
                    </template>
                    
                    <template #suffix>
                        <el-sub-menu index="suffix_1002">
                            <template #title>
                                <el-icon class="mx-0 px-0"><Reading /></el-icon>
                            </template>
                            <el-menu-item :index="`suffix_${item.id}`" v-for="item in skin" :key="item.id" @click="changeSkin(item.id)">{{item.title}}</el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="suffix_1003">
                            <template #title>
                                <el-avatar :size="25" :src="user?.face ? user?.face : '/unkown.png'" class="mr-1" />
                                <span>{{user?.nickname}}</span>
                            </template>
                            <el-menu-item index="suffix_1003-1">用户中心</el-menu-item>
                            <el-menu-item index="suffix_1003-2">修改密码</el-menu-item>
                            <el-menu-item index="suffix_1003-3">安全设置</el-menu-item>
                            <el-menu-item index="suffix_1003-4">安全设置</el-menu-item>
                            <el-divider class="m-0 p-0" />
                            <el-menu-item index="suffix_1003-5" @click="logout">退出登录</el-menu-item>
                        </el-sub-menu>
                    </template>
                </element-menu>
            </el-header>
            <el-main style="background-color:#F8F8F8;">
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
    .menu-demo{
        background: unset !important;
    }

    .el-menu-item.is-active, .el-sub-menu .el-menu-item.is-active{
        border: unset;
        background-color: unset !important;
    }
    .el-menu-item.is-active:hover, .el-sub-menu .el-menu-item:hover{
        border: unset;
        background-color: unset !important;
    }

    .el-menu{
        background-color: unset !important;
        border: unset !important;
    }

    .el-menu-item:hover{
        background-color: unset !important;
        border: unset !important;
    }
</style>