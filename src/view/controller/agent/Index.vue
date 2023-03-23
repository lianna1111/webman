<script setup lang="ts">
    import { ref,reactive,onMounted,watch } from 'vue'
    import { ElMessage } from 'element-plus'
    import Agent from '@/api/Agent'
    import Examination from '@/api/Examination'
    import Exam from '@/api/Exam'
    import Art from '@/api/Art' 
    import Project from '@/api/Project' 


    const table = ref('agent')
    const id = ref(0)
    const pid = ref(0)
    const level = ref(1)
    const dialogFormVisible = ref(false)
    const tableData = ref()
    const ArtData =ref()
    const jigouData = ref()
    const project_data = ref()
    const examination_data:any=ref()
    const exam_data:any=ref()
    const search_data = reactive({keyword:''})
    const rules = ref()
    let form = reactive({institution_id:'',examination_id:'',item_id:'',cate_id:'',expire_time:'',create_time:''})
    const formLabelWidth = ref(180)


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
        await getExaminationData()
        await setArtData()
        await getProjectData()
        await getExamData()
    }

    const setArtData = async () => {
        Art.child().then((res)=>{
            ArtData.value = res.data.data
            console.log(res.data.data,'artchild');
        })
    }
    const getExaminationData = async () => {
        Examination.all().then((res)=>{
            if(res.data.data.length){
            examination_data.value = res.data.data
            console.log(res.data.data,'机构');
        }
        })
    }
    const getExamData = async () => {
        Exam.all().then((res)=>{
            if(res.data.data.length){
            exam_data.value = res.data.data
            console.log(res.data.data,'项目');
        }
        })
    }
    const getProjectData = async () => {
        Project.all().then((res)=>{
            if(res.data.data.length){
            project_data.value = res.data.data
            console.log(res.data.data,'培训机构');
        }
        })
    }

    const setShowData = async () => {
        Agent.show(search_data).then((res)=>{
            if(res.data.code === 0){
                tableData.value = res.data.data
                console.log(res.data.data,'daili');
                
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
        if(e){
            form.cate_id=e[1]
        }
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
            Agent.get(id).then((res)=>{
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
        Agent.show(search_data).then((res)=>{
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
        Agent.save(form).then((res)=>{
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
    <el-dialog v-model="dialogFormVisible" title="机构升级" width="700px">
        <el-form ref="ruleFormRef" :rules="rules" :model="form" size="large" :label-width="formLabelWidth">
            <el-form-item label="培训机构：">
                <el-col :span="14">
                    <el-select v-model="form.institution_id"  placeholder="请选择" size="large">
                        <el-option
                        v-for="item in project_data"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id"
                        />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="考级机构：">
                <el-col :span="14">
                    <el-select v-model="form.examination_id"  placeholder="请选择" size="large">
                        <el-option
                        v-for="item in examination_data"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id"
                        />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="考级项目：">
                <el-col :span="14">
                    <el-select v-model="form.item_id"  placeholder="请选择" size="large">
                        <el-option
                        v-for="item in exam_data"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id"
                        />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="代理类别：">
                <el-col :span="14">
                    <!-- <el-input v-model="form.cate_id" autocomplete="off" /> -->
                    <el-cascader v-model="form.cate_id" :options="ArtData" placeholder="请选择" @change="handleChange" />

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