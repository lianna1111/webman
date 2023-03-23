<script setup lang="ts">
    import { ref,reactive,onMounted } from 'vue'
    import { DataList } from '@/util/interface';
    import Poster from '@/api/Poster'
    import { ElMessage } from 'element-plus'

    import { genFileId } from 'element-plus'
    import type { UploadProps, UploadUserFile,UploadRawFile } from 'element-plus'
    
    const table = ref('poster')
    const dialogFormVisible = ref(false)
    const tableData = ref<DataList>()
    const formLabelWidth = ref(180)
    const form = reactive({id:0,title:'',pic:'',url:'',width:300,height:300,axisx:0,axisy:0}) 
    const formSearch = reactive({keyword:'',page:1,pagesize:10})

    const fileList = ref<UploadUserFile[]>([])
    const uploadAction = ref(import.meta.env.VITE_API_BASEURL+'upload')

    onMounted(async () => {
        await Poster.show().then((res)=>{
            tableData.value = JSON.parse(JSON.stringify(res.data.data))
        })
    })

    const uploadSuccess:UploadProps['onSuccess'] = (res) => {
        console.log(res)
        if(res.code === 0){
            form.pic = res.data.url
        }else{
            ElMessage(res.msg)
            return false
        }
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
         Poster.get(id).then((res)=>{
            console.log(res.data.data)
            form.id = JSON.parse(JSON.stringify(res.data.data)).id
            form.title = JSON.parse(JSON.stringify(res.data.data)).title
            form.pic = JSON.parse(JSON.stringify(res.data.data)).pic
            form.url = JSON.parse(JSON.stringify(res.data.data)).url
            form.width = JSON.parse(JSON.stringify(res.data.data)).width
            form.height = JSON.parse(JSON.stringify(res.data.data)).height
            form.axisx = JSON.parse(JSON.stringify(res.data.data)).axisx
            form.axisy = JSON.parse(JSON.stringify(res.data.data)).axisy
        })
        dialogFormVisible.value = true
    }

    const del = (table:string,id:number) => {
        if(confirm('确定要删除么？')){
            Poster.del(id).then((res)=>{
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
        Poster.show(formSearch).then((res)=>{
            console.log(res)
            tableData.value = JSON.parse(JSON.stringify(res.data.data))
        })
    }

    const submit = () => {
        Poster.save(form).then((res)=>{
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
                <el-link>海报管理</el-link>
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
            <el-pagination background layout="prev, pager, next" :total="tableData?.rows" />
        </div>
    </el-container>

    <el-dialog v-model="dialogFormVisible" :title="form.id? '修改海报' : '新增海报'">
            <el-form size="large" :model="form" :label-width="formLabelWidth" class="overflow-hidden">
                <el-col :span="16">
                    <el-form-item label="标题">
                        <!-- <el-col :span="10"> -->
                            <el-input v-model="form.title" autocomplete="off" />
                        <!-- </el-col> -->
                    </el-form-item>
                    <el-form-item label="背景图">
                        <!-- <el-col :span="10"> -->
                            <el-upload v-model:file-list="fileList" :action="uploadAction+'?path=poster'" :limit="1" :on-exceed="handleExceed" :on-success="uploadSuccess">
                                <el-button type="primary" class="bg-blue-400">点击上传</el-button>
                            </el-upload>
                        <!-- </el-col> -->
                    </el-form-item>
                    <el-form-item label="海报链接">
                        <!-- <el-col :span="10"> -->
                            <el-input v-model="form.url" autocomplete="off" />
                        <!-- </el-col> -->
                    </el-form-item>
                    <el-form-item label="二维码宽度">
                        <!-- <el-col :span="10"> -->
                            <el-input v-model="form.width" autocomplete="off" />
                        <!-- </el-col> -->
                    </el-form-item>
                    <el-form-item label="二维码高度">
                        <!-- <el-col :span="10"> -->
                            <el-input v-model="form.height" autocomplete="off" />
                        <!-- </el-col> -->
                    </el-form-item>
                    <el-form-item label="X轴偏移值">
                        <!-- <el-col :span="10"> -->
                            <el-input v-model="form.axisx" autocomplete="off" />
                        <!-- </el-col> -->
                    </el-form-item>
                    <el-form-item label="Y轴偏移值">
                        <!-- <el-col :span="10"> -->
                            <el-input v-model="form.axisy" autocomplete="off" />
                        <!-- </el-col> -->
                    </el-form-item>
                </el-col>
                <el-col :span="8" class="px-[50px] w-[400px] text-center overflow-hidden">
                    <div class="text-center">海报预览</div>
                    <div class="poster-img w-[250px] h-[300px] mt-5">
                        <el-image style="width: 100%;" :src="form.pic" fit="fill" />
                    </div>
                </el-col>
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