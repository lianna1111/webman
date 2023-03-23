<script setup lang="ts">
    import { ref,reactive,onMounted } from 'vue'
    import { DataList } from '@/util/interface';
    import Cate from '@/api/Cate'
    import { ElMessage, ElMessageBox } from 'element-plus'

    const dialogFormVisible = ref(false)
    const tableData = ref<DataList>()
    const formLabelWidth = ref(180)
    const form = reactive({id:0,title:'',sign:'',pic:'',level:1,pid:0,sort:1})

    onMounted(async () => {
        // await Cate.show().then((res)=>{
        //     tableData.value = JSON.parse(JSON.stringify(res.data.data))
        // })
    })

    const handleSelectionChange = () => {

    }
    const add = (table:string,id:number = 0)=>{
        dialogFormVisible.value = true
    }

    const mod = (table:string,id:number)=>{
         Cate.get(id).then((res)=>{
            console.log(res.data.data)
            form.id = JSON.parse(JSON.stringify(res.data.data)).id
            form.title = JSON.parse(JSON.stringify(res.data.data)).title
            form.sign = JSON.parse(JSON.stringify(res.data.data)).sign
            form.pic = JSON.parse(JSON.stringify(res.data.data)).pic
            form.level = JSON.parse(JSON.stringify(res.data.data)).level
            form.pic = JSON.parse(JSON.stringify(res.data.data)).pic
            form.sort = JSON.parse(JSON.stringify(res.data.data)).sort
        })
        dialogFormVisible.value = true
    }

    const del = (table:string,id:number) => {
        if(confirm('确定要删除么？')){
            Cate.del(id).then((res)=>{
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

    const submit = () => {
        Cate.save(form).then((res)=>{
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
                <el-link>{{tableData?.title}}管理</el-link>
            </div>
            <div>
                <el-button type="primary" plain @click="add('cate')">新增</el-button>
            </div>
        </el-header>
        <div class="flex justify-between items-center bg-white p-3">
            <element-search />
        </div>
        <div>
            <el-table ref="multipleTableRef" size="large" :data="tableData?.data" style="width: 100%" @selection-change="handleSelectionChange" row-class-name="tab-column">
                <el-table-column type="selection" width="55" />
                <el-table-column :property="item.map" :label="item.title" v-for="item in tableData?.thead" align="center" />
                <el-table-column label="修改">
                    <template #default="scope">
                        <el-icon :size="16" @click="mod('cate',scope.row.id)" class="cursor-pointer"><Edit /></el-icon>
                    </template>
                </el-table-column>
                <el-table-column label="删除">
                    <template #default="scope">
                        <el-icon :size="16" @click="del('cate',scope.row.id)" class="cursor-pointer"><Delete /></el-icon>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="flex justify-between items-center bg-white p-3">
            <element-button-group :items="[]" />
            <el-pagination background layout="prev, pager, next" :total="tableData?.rows" />
        </div>
    </el-container>

    <!-- action form -->
    <el-dialog v-model="dialogFormVisible" title="新增商品类别" max-width="700">
        <el-form ref="ruleFormRef" :model="form" size="large" :label-width="formLabelWidth">
            <el-form-item label="商品类别：">
                <el-input v-model="form.title" autocomplete="off" />
            </el-form-item>
            <el-form-item label="标识符：">
                <el-input v-model="form.sign" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" class="bg-blue-500 text-white" @click="submit">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style lang="scss" scoped>
    .tab-column{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>