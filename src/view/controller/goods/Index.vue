<script setup lang="ts">
    import { ref,reactive,onMounted } from 'vue'
    import { DataList } from '@/util/interface';
    // import Goods from '@/api/Goods'
    import { ElMessage, ElMessageBox } from 'element-plus'

    const table = 'goods'
    const uid = ref('')
    const dialogFormVisible = ref(false)
    const tableData = ref<DataList>()
    const formLabelWidth = ref(180)
    const form = reactive({id:0,title:'',is_default:0})
    const formSearch = reactive({keyword:'',page:1,pagesize:10})

    onMounted(async () => {
        // await Goods.show(formSearch).then((res)=>{
        //     tableData.value = JSON.parse(JSON.stringify(res.data.data))
        // })
        uid.value = localStorage.getItem('uid') as string
    })

    const handleSelectionChange = () => {

    }

    const setHash = (id:any,hash = '') => {
        if(hash == ''){
            console.log('hash')
            // Goods.hash(id).then((res)=>{
            //     if(res.data.code === 0){
            //         ElMessage('商品上链接成功')
            //         setTimeout(()=>{
            //             window.location.reload()
            //             // tableData.value?.data.forEach((item,index)=>{
            //             //     if(item.id == id){
            //             //         tableData.value?.data[index].goods_hash = res.data.data.hash
            //             //     }
            //             // })
            //         },1000)
            //     }else{
            //         ElMessage(res.data.msg)
            //         return false
            //     }
            // }).catch((res)=>{
            //     console.log(res)
            // })
        }else{
            console.log('nonono')
            return false
        }
    }

    // const changeStatus = (id:any) => {
    //     console.log('id: '+id)
    // }

    const add = (table:string,id:number = 0)=>{
        dialogFormVisible.value = true
    }

    const mod = (table:string,id:number)=>{
        //  Goods.get(id,uid.value).then((res)=>{
        //     console.log(res.data.data)
        //     form.id = JSON.parse(JSON.stringify(res.data.data)).id
        //     form.title = JSON.parse(JSON.stringify(res.data.data)).title
        //     form.is_default = JSON.parse(JSON.stringify(res.data.data)).is_default
        // })
        dialogFormVisible.value = true
    }

    const del = (table:string,id:number) => {
        if(confirm('确定要删除么？')){
            // Goods.del(id).then((res)=>{
            //     console.log(res.data)
            //     if(res.data.code === 0){
            //         alert('删除成功')
            //         setTimeout(()=>{
            //             window.location.reload()
            //         },500)
            //     }else{
            //     alert('删除失败')
            //     return false 
            //     }
            // })
        }
    }

    const search = () => {
        // Goods.show(formSearch).then((res)=>{
        //     console.log(res)
        //     tableData.value = JSON.parse(JSON.stringify(res.data.data))
        // })
    }

    const changePage = (e:any) => {
        console.log('page: '+e)
        formSearch.page = e

        // Goods.show(formSearch).then((res)=>{
        //     console.log(res)
        //     tableData.value = JSON.parse(JSON.stringify(res.data.data))
        // }).catch((res)=>{
        //     console.log(res)
        // })
    }

    const changePagesize = (e:any) => {
        console.log('pagesize: '+e)
        formSearch.pagesize = e

        // Goods.show(formSearch).then((res)=>{
        //     console.log(res)
        //     tableData.value = JSON.parse(JSON.stringify(res.data.data))
        // }).catch((res)=>{
        //     console.log(res)
        // })
    }

    const submit = () => {
        // Goods.save(form).then((res)=>{
        //     if(res.data.code === 0){
        //         ElMessage(form.id?'修改成功':'新增成功')
        //         setTimeout(()=>{
        //             window.location.reload()
        //         },500)
        //     }else{
        //         ElMessage(res.data.msg)
        //         return false
        //     }
        // })
    }
</script>

<template>
    <el-container>
        <el-header class="flex justify-between bg-white border-b py-4">
            <div class="flex justify-center items-center">
                <el-icon class="rotate-90 text-xl text-red-500"><SemiSelect /></el-icon>
                <el-link>藏品管理</el-link>
            </div>
            <div>
                <!-- <el-button type="primary" plain @click="add('goods')">新增</el-button> -->
                <router-link :to="{name:'goods/action'}">
                    <el-button type="primary" plain>新增</el-button>
                </router-link>
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
            <el-table ref="multipleTableRef" size="large" :data="tableData?.data" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                <el-table-column :property="item.map" :label="item.title" v-for="(item,index) in tableData?.thead" :key="index" :width="item.width ? item.width : ''" show-overflow-tooltip>
                    <template #default="scope">
                        <img :src="scope.row[item.map]" class="h-[30px]" v-if="item.type == 'pic'" />
                        <el-switch v-else-if="item.type == 'switch'" v-model="scope.row['status']" :active-value="1" :inactive-value="0" />
                        <span v-else-if="item.type == 'price'">{{(scope.row[item.map])/100}}</span>
                        <!-- <span v-else-if="item.map == 'goods_hash'" @click="setHash(scope.row.id,scope.row.goods_hash)" :class="scope.row[item.map] == '' ? 'text-blue-500 cursor-pointer' : ''">{{scope.row[item.map] == '' ? '上链' : scope.row[item.map]}}</span> -->
                        <!-- <span v-html="scope.row[item.map]" v-else-if="item.type == 'switch'"></span> -->
                        <span v-html="scope.row[item.map]" v-else></span>
                    </template>
                </el-table-column>
                <el-table-column label="修改">
                    <template #default="scope">
                        <router-link :to="{name:'goods/action',params:{id:scope.row.id}}">
                            <el-icon :size="16" class="cursor-pointer"><Edit /></el-icon>
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column label="删除">
                    <template #default="scope">
                        <el-icon :size="16" @click="del('goods',scope.row.id)" class="cursor-pointer"><Delete /></el-icon>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="flex justify-between items-center bg-white p-3">
            <element-button-group :items="[]" :action="table+'/action'" />
            <el-pagination v-model:currentPage="formSearch.page" v-model:page-size="formSearch.pagesize" background layout="prev, pager, next" :total="tableData?.rows" @size-change="changePagesize" @current-change="changePage" />
        </div>
    </el-container>
</template>

<style lang="scss" scoped>
.el-table .cell {
 	white-space: nowrap;
  	overflow: hidden;
  	text-overflow: ellipsis;
}
</style>