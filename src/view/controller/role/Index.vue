<script setup lang="ts">
    import { ref,reactive,onMounted } from 'vue'
    import { DataList } from '@/util/interface';
    import Role from '@/api/Role'
    import { ElMessage, ElMessageBox } from 'element-plus'

    const dialogFormVisible = ref(false)
    const formLabelWidth = ref(180)
    const form = reactive({id:0,title:'',sign:'',pic:'',level:1,pid:0,is_default:0,is_allow_login:0,sort:1})
    const tableData = ref<DataList>()
    const space = ref('&nbsp;&nbsp;&nbsp;&nbsp;')

    onMounted(async () => {
        await Role.show().then((res)=>{
            tableData.value = JSON.parse(JSON.stringify(res.data.data))
        })
    })

    const handleChange = () => {

    }

    const handleSelectionChange = () => {

    }

    const add = (table:string,id:number = 0,pid:number = 0,level:number = 1)=>{
        form.pid = id
        form.level = level + 1
        dialogFormVisible.value = true
    }

    const mod = (table:string,id:number,pid:number,level:number)=>{
         Role.get(id).then((res)=>{
            form.id = JSON.parse(JSON.stringify(res.data.data)).id
            form.title = JSON.parse(JSON.stringify(res.data.data)).title
            form.sign = JSON.parse(JSON.stringify(res.data.data)).sign
            form.pic = JSON.parse(JSON.stringify(res.data.data)).pic
            form.level = JSON.parse(JSON.stringify(res.data.data)).level
            form.pid = JSON.parse(JSON.stringify(res.data.data)).pid
            form.is_default = JSON.parse(JSON.stringify(res.data.data)).is_default
            form.is_allow_login = JSON.parse(JSON.stringify(res.data.data)).is_allow_login
            form.sort = JSON.parse(JSON.stringify(res.data.data)).sort
        })
        dialogFormVisible.value = true
    }

    const del = (table:string,id:number) => {
        if(confirm('确定要删除么？')){
            Role.del(id).then((res)=>{
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

    const close = () => {
        form.pid = 0
        form.level = 1
        dialogFormVisible.value = false
    }

    const submit = () => {
        Role.save(form).then((res)=>{
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
                <el-link>{{tableData?.title}}</el-link>
            </div>
            <div>
                <el-button type="primary" plain @click="dialogFormVisible = true">新增</el-button>
            </div>
        </el-header>
        <div class="flex justify-between items-center bg-white p-3">
            <element-search />
        </div>
        <div>
            <el-table ref="multipleTableRef" stripe size="large" :data="tableData?.data" class-name="table-demo" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                <template v-for="item in tableData?.thead" :key="item.id">
                    <el-table-column :property="item.map" :label="item.title" :width="item.width>0?item.width:''" v-if="item.map != 'title'" />
                    <el-table-column :property="item.map" :label="item.title" :width="item.width>0?item.width:''" v-else>

                        <!-- <template #default="scope">
                            <span v-html="scope.row.title + '[+]'" v-if="scope.row.level == 1" class="cursor-pointer"  @click="add('role',scope.row.id,scope.row.pid,scope.row.level)"  />
                            <span v-html="space.repeat(scope.row.level) + scope.row.title" v-else class="cursor-pointer" />
                        </template> -->
                    </el-table-column>
                </template>
                
                <el-table-column label="修改">
                    <template #default="scope">
                        <el-icon :size="16" @click="mod('role',scope.row.id,scope.row.pid,scope.row.level)"><Edit /></el-icon>
                    </template>
                </el-table-column>
                <el-table-column label="删除">
                    <template #default="scope">
                        <el-icon :size="16" @click="del('role',scope.row.id)"><Delete /></el-icon>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="flex justify-between items-center bg-white p-3">
            <element-button-group :items="[]" />
            <!-- <el-pagination background layout="prev, pager, next" :total="tableData?.rows" /> -->
        </div>
    </el-container>

    <!-- action form -->
    <el-dialog v-model="dialogFormVisible" title="新增角色" width="700px">
        <el-form :model="form" size="large" :label-width="formLabelWidth">
            <el-form-item label="角色名称：">
                <el-input v-model="form.title" autocomplete="off" />
            </el-form-item>
            <el-form-item label="图片：">
                <el-input v-model="form.pic" autocomplete="off" />
            </el-form-item>
            <el-form-item label="排序：">
                <el-input v-model="form.sort" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" class="bg-blue-500 text-white" @click="submit">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style lang="scss" scoped>
    .el-form-item .el-input{
        width: 400px;
    }
</style>