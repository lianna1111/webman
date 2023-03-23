<script setup lang="ts">
    import { ref,reactive,onMounted } from 'vue'
    import { DataList } from '@/util/interface';
    // import Vote from '@/api/Vote'
    import Activity from '@/api/Activity'
    import Goods from '@/api/Goods'
    import { ElMessage } from 'element-plus'

    import { genFileId } from 'element-plus'
    import type { UploadProps, UploadUserFile,UploadRawFile } from 'element-plus'
    
    const table = ref('vote')
    const dialogFormVisible = ref(false)
    const tableData = ref<DataList>()
    const activityData = ref()
    const goodsData = ref()
    const formLabelWidth = ref(180)
    const form = reactive({id:0,activity_id:'',goods_id:'',base_number:0}) 
    const formSearch = reactive({keyword:'',page:1,pagesize:10})
    const fileList = ref<UploadUserFile[]>([])
    const uploadAction = ref(import.meta.env.VITE_API_BASEURL+'upload')

    onMounted(async () => {
        // await Vote.show().then((res:any)=>{
        //     tableData.value = JSON.parse(JSON.stringify(res.data.data))
        // })
        await Activity.cate(2).then((res)=>{
            activityData.value = JSON.parse(JSON.stringify(res.data.data))
        })
        await Goods.cate(6).then((res)=>{
            goodsData.value = JSON.parse(JSON.stringify(res.data.data))
        })
    })

    const handleSelectionChange = () => {

    }
    const add = (table:string,id:number = 0)=>{
        form.id = 0
        dialogFormVisible.value = true
    }

    const mod = (table:string,id:number)=>{
        // Vote.get(id).then((res)=>{
        //     console.log(res.data.data)
        //     form.id = JSON.parse(JSON.stringify(res.data.data)).id
        //     form.activity_id = JSON.parse(JSON.stringify(res.data.data)).activity_id
        //     form.goods_id = JSON.parse(JSON.stringify(res.data.data)).goods_id
        //     form.base_number = JSON.parse(JSON.stringify(res.data.data)).base_number
        // })
        dialogFormVisible.value = true
    }

    const del = (table:string,id:number) => {
        if(confirm('确定要删除么？')){
            // Vote.del(id).then((res)=>{
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

    const changePage = (e:any) => {
        console.log('page: '+e)
        formSearch.page = e

        // Vote.show(formSearch).then((res)=>{
        //     console.log(res)
        //     tableData.value = JSON.parse(JSON.stringify(res.data.data))
        // }).catch((res)=>{
        //     console.log(res)
        // })
    }

    const search = () => {
        // Vote.show(formSearch).then((res)=>{
        //     console.log(res)
        //     tableData.value = JSON.parse(JSON.stringify(res.data.data))
        // })
    }

    const submit = () => {
        // Vote.save(form).then((res)=>{
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
                <el-link>投票活动列表</el-link>
            </div>
            <div>
                <el-button type="primary" plain @click="add(table)">新增</el-button>
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
                        <el-switch v-else-if="item.type == 'switch'" />
                        <!-- <span v-html="scope.row[item.map]" v-else-if="item.type == 'switch'"></span> -->
                        <span v-html="scope.row[item.map]" v-else></span>
                    </template>
                </el-table-column>
                <el-table-column label="修改">
                    <template #default="scope">
                        <el-icon :size="16" class="cursor-pointer" @click="mod(table,scope.row.id)"><Edit /></el-icon>
                    </template>
                </el-table-column>
                <el-table-column label="删除">
                    <template #default="scope">
                        <el-icon :size="16" @click="del(table,scope.row.id)" class="cursor-pointer"><Delete /></el-icon>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="flex justify-between items-center bg-white p-3">
            <element-button-group :items="[]" />
            <el-pagination v-model:currentPage="formSearch.page" v-model:page-size="formSearch.pagesize" background layout="prev, pager, next" :total="tableData?.rows" @current-change="changePage" />
        </div>
    </el-container>

    <el-dialog v-model="dialogFormVisible" :title="form.id? '修改投票' : '新增投票'">
        <el-form size="large" :model="form" :label-width="formLabelWidth">
            <el-form-item label="活动">
                <el-col :span="12">
                    <el-select v-model="form.activity_id" placeholder="选择投票活动">
                        <el-option :label="item.title" :value="item.id" v-for="item in activityData" />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="藏品">
                <el-col :span="12">
                    <el-select v-model="form.goods_id" placeholder="选择藏品">
                        <el-option :label="item.title" :value="item.id" v-for="item in goodsData" />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="基数" v-if="form.id">
                <el-col :span="12">
                    <el-input v-model="form.base_number" autocomplete="off" />
                </el-col>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submit" class="bg-blue-400">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style lang="scss" scoped>

</style>