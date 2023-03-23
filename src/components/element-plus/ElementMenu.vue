<script setup lang="ts">
    import { ref } from 'vue'
    import { ItemList } from '@/util/interface'
    import {
        Document,
        Menu as IconMenu,
        Location,
        Setting,
    } from '@element-plus/icons-vue'

    const props = withDefaults(defineProps<{
        pid?: number | string,
        isTop?: boolean,
        isPic?: boolean,
        isCollapse: boolean,
        items: ItemList[]
    }>(),{
        pid: 0,
        isTop: false,
        isPic: true,
        isCollapse: false
    })

    const emit = defineEmits(['handleOpen','handleClose','changeMenu'])

    const handleOpen = (key: string, keyPath: string[]) => {
        emit('handleOpen')
    }

    const handleClose = (key: string, keyPath: string[]) => {
        emit('handleClose')
    }
</script>

<template>
    <el-menu default-active="2" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
        <slot name="prefix" />
        <template v-for="item in items" :key="item.id">
            <template v-if="item.pid == pid">
                <template v-if="isTop">
                    <el-menu-item :index="`${item.id}`">
                        <template #title>{{item.title}}</template>
                    </el-menu-item>
                </template>

                <template v-else>
                    <el-sub-menu :index="`${item.id}`" v-if="item.number">
                        <template #title>
                            <el-icon><location /></el-icon>
                            <span>{{item.title}}</span>
                        </template>

                        <template v-for="itm in items" :key="itm.id">
                            <template v-if="itm.pid == item.id">
                                <el-sub-menu :index="`${itm.id}`" v-if="itm.number">
                                    <template #title>
                                        <el-icon><location /></el-icon>
                                        <span>{{itm.title}}uuu</span>
                                    </template>
                                </el-sub-menu>

                                <el-menu-item :index="`${itm.id}`" v-else>
                                    <el-icon><icon-menu /></el-icon>
                                    <template #title>
                                        <router-link :to="{name:itm.router}">{{itm.title}}</router-link>
                                    </template>
                                </el-menu-item>
                            </template>
                        </template>
                    </el-sub-menu>

                    <el-menu-item :index="`${item.id}`" v-else>
                        <el-icon><icon-menu /></el-icon>
                        <template #title>{{item.title}}</template>
                    </el-menu-item>
                </template>
            </template>
        </template>
        
        <div class="flex-1" />
        <slot name="suffix" />
    </el-menu>
</template>

<style lang="scss" scoped>

</style>