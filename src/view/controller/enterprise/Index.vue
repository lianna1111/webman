<script setup lang="ts">
    import { ref,reactive,onMounted,watch } from 'vue'
    import { ElMessage } from 'element-plus'
    import Enterprise from '@/api/Enterprise'
    import Art from '@/api/Art'

    const table = ref('enterprise')
    const id = ref(0)
    const pid = ref(0)
    const level = ref(1)
    const dialogFormVisible = ref(false)
    const tableData = ref()
    const search_data = reactive({keyword:''})
    const rules = ref()
    let form = reactive({id:0,uid:'',title:'',cate_id:'',logo:'',pic:''})
    const formLabelWidth = ref(180)
    const ArtData =ref()
    form .uid = localStorage.getItem('uid')as string
    onMounted(async ()=>{
        await init()
    })

    watch(dialogFormVisible,(val,value)=>{
        if(val){
            
        }else{
            setData(0)
        }
    })

    const init = async () => {
        await setShowData()
        await setArtData()
    }

    const setShowData = async () => {
        Enterprise.show(search_data).then((res)=>{
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
    const setArtData = async () => {
        Art.child().then((res)=>{
            ArtData.value = res.data.data
            console.log(res.data.data,'artchild');
        })
    }

    const handleChange = (e:any) => {
        console.log(e)
    }

    const handleSelectionChange = () => {

    }
    const cascaderChange=(e:any)=>{
    console.log(e);
    form.cate_id=e[1]
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
            Enterprise.get(id).then((res)=>{
                if(res.data.code === 0){
                    pid.value = JSON.parse(JSON.stringify(res.data.data)).pid
                    level.value = JSON.parse(JSON.stringify(res.data.data)).level
                    form.id = JSON.parse(JSON.stringify(res.data.data)).id
                    form.title = JSON.parse(JSON.stringify(res.data.data)).title
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
        }        
    }

    const onSearch = () => {
        Enterprise.show(search_data).then((res)=>{
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
        Enterprise.save(form).then((res)=>{
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
        <div class="flex justify-between items-center bg-white p-3">
            <element-button-group :items="[]" />
            <el-pagination background layout="prev, pager, next" :total="tableData?.rows" />
        </div>
    </el-container>

    <!-- action form -->
    <el-dialog v-model="dialogFormVisible" title="新增认证单位" width="700px">
        <el-form ref="ruleFormRef" :rules="rules" :model="form" size="large" :label-width="formLabelWidth">
            <el-form-item label="认证单位名称：">
                <el-col :span="14">
                    <el-input v-model="form.title" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="认证类别：">
                <el-col :span="14">
                    <el-cascader v-model="form .cate_id" :options="ArtData" placeholder="请选择" @change="cascaderChange" />
                </el-col>
            </el-form-item>
            <el-form-item label="logo：">
                <el-col :span="14">
                    <el-input v-model="form.logo" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="图片：">
                <el-col :span="14">
                    <el-input v-model="form.pic" autocomplete="off" />
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