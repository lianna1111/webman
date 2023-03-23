<script setup lang="ts">
    import { ref,reactive,onMounted } from 'vue'
    import { DataList } from '@/util/interface';
    import Activity from '@/api/Activity'
    import { ElMessage } from 'element-plus'

    import { genFileId } from 'element-plus'
    import type { UploadProps, UploadUserFile,UploadRawFile } from 'element-plus'
    
    const table = ref('activity')
    const dialogFormVisible = ref(false)
    const tableData = ref<DataList>()
    const formLabelWidth = ref(180)
    const form = reactive({id:0,cate_id:'',title:'',description:'',pic:'',start_time:'',end_time:'',is_original:0,source_url:'',content:''}) 
    const formSearch = reactive({keyword:'',page:1,pagesize:10})
    const fileList = ref<UploadUserFile[]>([])
    const uploadAction = ref(import.meta.env.VITE_API_BASEURL+'upload')

    onMounted(async () => {
        await Activity.show({role_id:8}).then((res)=>{
            tableData.value = JSON.parse(JSON.stringify(res.data.data))
        })
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

    const uploadSuccessPic:UploadProps['onSuccess'] = (res) => {
        if(res.code === 0){
            form.pic = res.data.url
        }else{
            ElMessage(res.msg)
            return false
        }
    }

    const handleSelectionChange = () => {

    }
    const add = (table:string,id:number = 0)=>{
        form.id = 0
        dialogFormVisible.value = true
    }

    const mod = (table:string,id:number)=>{
         Activity.get(id).then((res)=>{
            console.log(res.data.data)
            form.id = JSON.parse(JSON.stringify(res.data.data)).id
            form.cate_id = JSON.parse(JSON.stringify(res.data.data)).cate_id
            form.title = JSON.parse(JSON.stringify(res.data.data)).title
            form.description = JSON.parse(JSON.stringify(res.data.data)).description
            form.pic = JSON.parse(JSON.stringify(res.data.data)).pic
            form.start_time = JSON.parse(JSON.stringify(res.data.data)).start_time
            form.end_time = JSON.parse(JSON.stringify(res.data.data)).end_time
            form.is_original = JSON.parse(JSON.stringify(res.data.data)).is_original
            form.source_url = JSON.parse(JSON.stringify(res.data.data)).source_url
            form.content = JSON.parse(JSON.stringify(res.data.data)).content
            fileList.value.push({name:'',url:form.pic})
        })
        dialogFormVisible.value = true
    }

    const del = (table:string,id:number) => {
        if(confirm('确定要删除么？')){
            Activity.del(id).then((res)=>{
                console.log(res.data)
                if(res.data.code === 0){
                    alert('删除成功')
                    setTimeout(()=>{
                        window.location.reload()
                    },500)
                }else{
                alert('删除失败')
                return false 
                }
            })
        }
    }

    const search = () => {
        Activity.show(formSearch).then((res)=>{
            console.log(res)
            tableData.value = JSON.parse(JSON.stringify(res.data.data))
        })
    }

    const submit = () => {
        Activity.save(form).then((res)=>{
            if(res.data.code === 0){
                ElMessage(form.id?'修改成功':'新增成功')
                setTimeout(()=>{
                    window.location.reload()
                },500)
            }else{
                ElMessage(res.data.msg)
                return false
            }
        })
    }
</script>

<template>
     <el-container>
        <el-header class="flex justify-between bg-white border-b py-4">
            <div class="flex justify-center items-center">
                <el-icon class="rotate-90 text-xl text-red-500"><SemiSelect /></el-icon>
                <el-link>新闻管理</el-link>
            </div>
            <div>
                <!-- <el-button type="primary" plain @click="add(table)">新增</el-button> -->
                <router-link :to="{name:table+'/action'}">
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
                        <el-switch v-else-if="item.type == 'switch'" />
                        <!-- <span v-html="scope.row[item.map]" v-else-if="item.type == 'switch'"></span> -->
                        <span v-html="scope.row[item.map]" v-else></span>
                    </template>
                </el-table-column>
                <el-table-column label="修改">
                    <template #default="scope">
                        <router-link :to="{name:table+'/action',params:{id:scope.row.id}}">
                            <el-icon :size="16" class="cursor-pointer"><Edit /></el-icon>
                        </router-link>
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
            <el-pagination background layout="prev, pager, next" :total="tableData?.rows" />
        </div>
    </el-container>
</template>

<style lang="scss" scoped>

</style>