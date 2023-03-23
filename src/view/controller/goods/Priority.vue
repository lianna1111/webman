<script setup lang="ts">
    import { ref,reactive,onMounted } from 'vue'
    import { DataList } from '@/util/interface';
    // import Priority from '@/api/Priority'
    import Goods from '@/api/Goods'
    import { ElMessage } from 'element-plus'

    import { genFileId } from 'element-plus'
    import type { UploadProps, UploadUserFile,UploadRawFile } from 'element-plus'
    
    const table = ref('priority')
    const dialogFormVisible = ref(false)
    const tableData = ref<DataList>()
    const goodsData = ref()
    const formLabelWidth = ref(180)
    const form = reactive({id:0,uid:'',type:0,user_list:'',goods_id:'',number:0,priotiry_time:0,remark:'系统优先购'}) 
    const formSearch = reactive({keyword:'',page:1,pagesize:10})
    const fileList = ref<UploadUserFile[]>([])
    const uploadAction = ref(import.meta.env.VITE_API_BASEURL+'upload')

    onMounted(async () => {
        // await Priority.show(formSearch).then((res)=>{
        //     tableData.value = JSON.parse(JSON.stringify(res.data.data))
        // })
        await Goods.cate(1).then((res)=>{
            goodsData.value = JSON.parse(JSON.stringify(res.data.data))
        })

        form.uid = localStorage.getItem('uid') as string
    })

    const handleRemovePic: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
        console.log(uploadFile, uploadFiles)
    }

    const handlePreviewPic: UploadProps['onPreview'] = (file) => {
        console.log(file)
    }

    const handleExceed: UploadProps['onExceed'] = (files) => {
        // fileList.value!.clearFiles()
        // const file = files[0] as UploadRawFile
        // file.uid = genFileId()
        // fileList.value!.handleStart(file)
    }

    const handleSelectionChange = () => {

    }
    const add = (table:string,id:number = 0)=>{
        form.id = 0
        dialogFormVisible.value = true
    }

    const mod = (table:string,id:number)=>{
        //  Priority.get(id).then((res)=>{
        //     console.log(res.data.data)
            
        // })
        dialogFormVisible.value = true
    }

    const del = (table:string,id:number) => {
        if(confirm('确定要删除么？')){
            // Priority.del(id).then((res)=>{
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
        // Priority.show(formSearch).then((res)=>{
        //     console.log(res)
        //     tableData.value = JSON.parse(JSON.stringify(res.data.data))
        // })
    }

    const changePage = (e:any) => {
        console.log('page: '+e)
        formSearch.page = e

        // Priority.show(formSearch).then((res)=>{
        //     console.log(res)
        //     tableData.value = JSON.parse(JSON.stringify(res.data.data))
        // }).catch((res)=>{
        //     console.log(res)
        // })
    }

    const changePagesize = (e:any) => {
        console.log('pagesize: '+e)
        formSearch.pagesize = e

        // Priority.show(formSearch).then((res)=>{
        //     console.log(res)
        //     tableData.value = JSON.parse(JSON.stringify(res.data.data))
        // }).catch((res)=>{
        //     console.log(res)
        // })
    }

    const submit = () => {
        // Priority.batch(form).then((res)=>{
        //     if(res.data.code === 0){
        //         ElMessage('操作成功')
        //         setTimeout(()=>{
        //             window.location.reload()
        //         },1000)
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
                <el-link>优先购管理</el-link>
            </div>
            <div>
                <el-button type="primary" plain @click="add('priority')">新增</el-button>
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
                        <el-icon :size="16" class="cursor-pointer" @click="mod('priority',scope.row.id)"><Edit /></el-icon>
                    </template>
                </el-table-column>
                <el-table-column label="删除">
                    <template #default="scope">
                        <el-icon :size="16" @click="del('priority',scope.row.id)" class="cursor-pointer"><Delete /></el-icon>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="flex justify-between items-center bg-white p-3">
            <element-button-group :items="[]" />
            <el-pagination v-model:currentPage="formSearch.page" v-model:page-size="formSearch.pagesize" background layout="prev, pager, next" :total="tableData?.rows" @size-change="changePagesize" @current-change="changePage" />
        </div>
    </el-container>

    

    <el-dialog v-model="dialogFormVisible" :title="form.id? '修改优先购' : '新增优先购'">
        <el-form size="large" :model="form" :label-width="formLabelWidth">
            <el-form-item label="选择藏品">
                <el-col :span="18">
                    <el-select v-model="form.goods_id" placeholder="选择藏品" style="width:100% !important;">
                        <el-option :label="item.title" :value="item.id" v-for="item in goodsData" :key="item.id" />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="用户列表">
                <el-col :span="18">
                    <el-input v-model="form.user_list" autocomplete="off" placeholder="会员ID/会员手机号码" :rows="10" type="textarea" />
                </el-col>
            </el-form-item>
            <el-form-item label="可用次数">
                <el-col :span="18">
                    <el-input v-model="form.number" autocomplete="off">
                        <template #suffix>次</template>
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="优先时长">
                <el-col :span="18">
                    <el-input v-model="form.priotiry_time" autocomplete="off">
                        <template #prefix>提前:&ensp;</template>
                        <template #suffix>小时</template>
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="备注">
                <el-col :span="18">
                    <el-input v-model="form.remark" autocomplete="off" />
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