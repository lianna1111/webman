<script setup lang="ts">
    import { ref,reactive,onMounted } from 'vue'
    import { DataList } from '@/util/interface';
    import User from '@/api/User'
    import { ElMessage } from 'element-plus'
    
    const table = ref('user')
    const aid = ref(0)
    const num = ref(30)
    const tableData = ref<DataList>()
    const formSearch = reactive({keyword:'',aid:0,num:30,page:1,pagesize:10})

    onMounted(async () => {
        // await User.inviter(formSearch).then((res:any)=>{
        //     tableData.value = JSON.parse(JSON.stringify(res.data.data))
        // })
    })

    const changePage = (e:any) => {
        console.log('page: '+e)
        formSearch.page = e

        // User.inviter(formSearch).then((res:any)=>{
        //     console.log(res)
        //     tableData.value = JSON.parse(JSON.stringify(res.data.data))
        // }).catch((res:any)=>{
        //     console.log(res)
        // })
    }

    const changePagesize = (e:any) => {
        console.log('pagesize: '+e)
        formSearch.pagesize = e

        // User.inviter(formSearch).then((res:any)=>{
        //     console.log(res)
        //     tableData.value = JSON.parse(JSON.stringify(res.data.data))
        // }).catch((res:any)=>{
        //     console.log(res)
        // })
    }

    const search = () => {

    }
</script>

<template>
     <el-container>
        <el-header class="flex justify-between bg-white border-b py-4">
            <div class="flex justify-center items-center">
                <el-icon class="rotate-90 text-xl text-red-500"><SemiSelect /></el-icon>
                <el-link>邀请排行榜</el-link>
            </div>
        </el-header>
        <div class="flex justify-between items-center bg-white p-3">
            <el-form :inline="true" :model="formSearch" size="large" class="demo-form-inline">
                <el-form-item label="关键词">
                    <el-input v-model="formSearch.keyword" placeholder="关键词" />
                </el-form-item>
                <el-form-item>
                    <el-button @click="search" class="text-gray-500 font-light">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-table ref="multipleTableRef" size="large" :data="tableData?.data">
                <el-table-column type="selection" width="55" />
                <el-table-column :property="item.map" :label="item.title" v-for="(item,index) in tableData?.thead" :key="index" :width="item.width ? item.width : ''" show-overflow-tooltip>
                    <template #default="scope">
                        <img :src="scope.row[item.map]" class="h-[30px]" v-if="item.type == 'pic'" />
                        <el-switch v-else-if="item.type == 'switch'" />
                        <!-- <span v-html="scope.row[item.map]" v-else-if="item.type == 'switch'"></span> -->
                        <span v-html="scope.row[item.map]" v-else></span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="flex justify-between items-center bg-white p-3">
            <element-button-group :items="[]" />
            <el-pagination v-model:currentPage="formSearch.page" v-model:page-size="formSearch.pagesize" background layout="total,sizes,prev, pager, next" :total="tableData?.rows" @size-change="changePagesize" @current-change="changePage" />
        </div>
    </el-container>
</template>

<style lang="scss" scoped>

</style>