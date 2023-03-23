<script setup lang="ts">
    import { ref,reactive,onMounted,watch } from 'vue'
    import { ElMessage } from 'element-plus'
    import Module from '@/api/Module'

    const table = ref('module')
    const id = ref(0)
    const pid = ref(0)
    const level = ref(1)
    const dialogFormVisible = ref(false)
    const tableData = ref()
    const search_data = reactive({keyword:''})
    const rules = ref()
    let form = reactive({id:0,title:'',pic:'',level:1,pid:0,is_open:0,module_id:0,pvalue:0,cvalue:0,svalue:0,router:'',sort:1})
    const formLabelWidth = ref(180)

    onMounted(async ()=>{
        await init()
    })

    watch(dialogFormVisible,(val,value)=>{
        if(val){
            Module.sort(pid.value).then((res)=>{
                console.log(res.data)
                if(res.data.code === 0){
                    form.sort = JSON.parse(JSON.stringify(res.data.data)).sort
                }
            })
        }else{
            setData(0)
        }
    })

    const init = async () => {
        await setShowData()
    }

    const setShowData = async () => {
        Module.show(search_data).then((res)=>{
            if(res.data.code === 0){
                tableData.value = res.data.data
            }else{
                ElMessage(res.data.msg)
                return false
            }
        }).catch((res)=>{
            console.log(res)
        })
    }

    const handleChange = (e:any) => {
        console.log(e)
    }

    const handleSelectionChange = () => {

    }

    const add = (table:string,id:number) => {
        setData(0)
        console.log('table: '+table+ ' id: '+ id)
        setTimeout(()=>{
            dialogFormVisible.value = true
        },300)
    }

    const mod = (table:string,id:number) => {
        setData(id)
        console.log('table: '+table+ ' id: '+ id)
        setTimeout(()=>{
            dialogFormVisible.value = true
        },300)
    }
    
    const del = (table:string,id:number) => {
        console.log('table: '+table+ ' id: '+ id)
    }

    const setData = (id:number) => {
        if(id > 0){
            Module.get(id).then((res)=>{
                if(res.data.code === 0){
                    pid.value = JSON.parse(JSON.stringify(res.data.data)).pid
                    level.value = JSON.parse(JSON.stringify(res.data.data)).level
                    form.id = JSON.parse(JSON.stringify(res.data.data)).id
                    form.title = JSON.parse(JSON.stringify(res.data.data)).title
                    form.pic = JSON.parse(JSON.stringify(res.data.data)).pic
                    form.level = JSON.parse(JSON.stringify(res.data.data)).level
                    form.pid = JSON.parse(JSON.stringify(res.data.data)).pid
                    form.is_open = JSON.parse(JSON.stringify(res.data.data)).is_open
                    form.module_id = JSON.parse(JSON.stringify(res.data.data)).module_id
                    form.pvalue = JSON.parse(JSON.stringify(res.data.data)).pvalue
                    form.cvalue = JSON.parse(JSON.stringify(res.data.data)).cvalue
                    form.svalue = JSON.parse(JSON.stringify(res.data.data)).svalue
                    form.router = JSON.parse(JSON.stringify(res.data.data)).router
                    form.sort = JSON.parse(JSON.stringify(res.data.data)).sort
                }else{
                    ElMessage(res.data.msg)
                    return false
                }
            })
        }else{
            pid.value = 0
            level.value = 1
            form.id = 0
            form.title = ''
            form.pic = ''
            form.level = 1
            form.pid = 0
            form.is_open = 0
            form.module_id = 0
            form.pvalue = 0
            form.cvalue = 0
            form.svalue = 0
            form.router = ''
            form.sort = 1
        }        
    }

    const onSearch = () => {
        Module.show(search_data).then((res)=>{
            if(res.data.code === 0){
                tableData.value = res.data.data
            }else{
                ElMessage(res.data.msg)
                return false
            }
        }).catch((res)=>{
            console.log(res)
        })
    }

    const submit = () => {
        Module.save(form).then((res)=>{
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
                <el-button type="primary" plain @click="add(table,0)">新增</el-button>
            </div>
        </el-header>
        <div class="flex justify-between items-center bg-white p-3">
            <el-form :inline="true" :model="search_data" size="large" class="demo-form-inline">
                <el-form-item label="关键词">
                    <el-input v-model="search_data.keyword" placeholder="关键词" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch" class="text-gray-500 font-light">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <element-table :data="tableData" @add="add" @mod="mod" @del="del" />
        </div>
    </el-container>

    <!-- action form -->
    <el-dialog v-model="dialogFormVisible" title="新增菜单" width="700px">
        <el-form ref="ruleFormRef" :rules="rules" :model="form" size="large" :label-width="formLabelWidth">
            <el-form-item label="菜单名称：">
                <el-col :span="14">
                    <el-input v-model="form.title" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="图片：">
                <el-col :span="14">
                    <el-input v-model="form.pic" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="默认开启：">
                <el-col :span="14">
                    <el-switch v-model="form.is_open" :active-value="1" :inactive-value="0" />
                </el-col>
            </el-form-item>
            <el-form-item label="链接模块：" v-if="form.pid > 0">
                <el-col :span="14">
                    <el-cascader v-model="form.module_id" :options="moduleData" @change="handleChange" />
                </el-col>
            </el-form-item>
            <el-form-item label="路由：">
                <el-col :span="14">
                    <el-input v-model="form.router" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="参数选项：" v-if="form.pid > 0">
                <el-col :span="4">
                    <el-select v-model="form.pvalue" placeholder="父级">
                        <el-option :label="i" :value="i" v-for="i in 10" />
                    </el-select>
                </el-col>
                <el-col :span="1" class="text-center"><span class="text-gray-500">-</span></el-col>
                <el-col :span="4">
                    <el-select v-model="form.cvalue" placeholder="类别">
                        <el-option :label="i" :value="i" v-for="i in 10" />
                    </el-select>
                </el-col>
                <el-col :span="1" class="text-center"><span class="text-gray-500">-</span></el-col>
                <el-col :span="4">
                    <el-select v-model="form.svalue" placeholder="状态">
                        <el-option :label="i" :value="i" v-for="i in 10" />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="排序：">
                <el-col :span="14">
                    <el-input v-model="form.sort" autocomplete="off" />
                </el-col>
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

</style>