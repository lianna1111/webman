<script setup lang="ts">
    import { ref,reactive,onMounted,watch } from 'vue'
    import {ElMessage}from 'element-plus'
    import type { UploadProps, UploadUserFile } from 'element-plus'
    import Exam from '@/api/Exam'
    import Examination from '@/api/Examination'
    import Art from '@/api/Art'
    import Agent from '@/api/Agent'

    const table = ref('exam')
    const id = ref(0)
    const pid = ref(0)
    const level = ref(1)
    const dialogFormVisible = ref(false)
    const tableData = ref()
    const ArtData =ref()
    const examination_data:any=ref()
    const agented_data:any=ref()
    const search_data = reactive({keyword:''})
    const rules = ref()
    let form = reactive({examination_id:'',cate_id:'',exam_title:'',idcode:'',pic: '',group_type: '1',score_type: '0',minval: '1',maxval: '5',grade_number: '1',is_public:0,is_agent: 0,agented_id: '0',is_checked: 0,agent_time:'',checked_time:''})
    const formLabelWidth = ref(180)
    const fileList = ref<UploadUserFile[]>([])
    const display=ref(true)
    const btnDisable =ref(false)
    const btnText=ref('点击上传')
    const src =import.meta.env.VITE_API_BASEURL+'upload?path=agentCate'
    const options = [{value: '1',label: '1级'},{value: '2',label: '2级'},{value: '3',label: '3级'},{value: '4',label: '4级'},{value: '5',label: '5级'},{value: '6',label: '6级'},{value: '7',label: '7级'},{value: '8',label: '8级'},{value: '9',label: '9级'},{value: '10',label: '10级'},{value: '11',label: '11级'},{value: '12',label: '12级'},{value: '13',label: '13级'},{value: '14',label: '14级'},{value: '15',label: '15级'}]
    const scoreType=[{value: '0',label: '分数'},{value: '1',label: '等级'}]
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
        await setExamData()
        await setAgentData()
        
    }

    const setShowData = async () => {
        Exam.show(search_data).then((res:any)=>{
            if(res.data.code === 0){
                tableData.value = res.data.data
                console.log(res.data.data);
                
            }else{
                ElMessage(res.data.msg)
                return false
            }
        }).catch((res:any)=>{
            console.log(res)
        })
    }

    const setArtData = async () => {
        Art.child().then((res:any)=>{
            ArtData.value = res.data.data
            console.log(res.data.data,'artchild');

        })
    }

    const setExamData = () => {
        Examination.all().then((res:any)=>{
            if(res.data.data.length){
            examination_data.value = res.data.data
            console.log(res.data.data,'机构');
            }
        })
    }
    const setAgentData = () => {
        Agent.all().then((res:any)=>{
            if(res.data.data.length){
                agented_data.value = res.data.data
                 console.log(res.data.data,'代理机构');
            }
       
        })
    }
    
    //评分方式选择：true分数，false等级
    const selectChange=(e:any)=>{
        console.log(e);
        if(e==0){
            display.value=true
        }else if(e==1){
            display.value=false
        }
        
    }
 
    const handleRemove: UploadProps['onRemove'] = (uploadFile:any, uploadFiles) => {
    console.log(uploadFile, uploadFiles,'34')
    if(uploadFile.length>=1){
            btnDisable.value=true
            btnText.value='上传成功'
        }else{
            btnDisable.value=false
            btnText.value='点击上传'

        }
    }

    const handlePreview: UploadProps['onPreview'] = (file) => {
    console.log(file,'12')
    }
    const handleChange = (e:any) => {
        if(fileList.value.length>=1){
            btnDisable.value=true
            btnText.value='上传成功'
        }else{
            btnDisable.value=false
            btnText.value='点击上传'

        }
    }

  
    //  const TypeChange = (e:any) => {
    //     console.log(e)
    // }
    // const handleSelectionChange = () => {

    // }

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
            Exam.get(id).then((res:any)=>{
                if(res.data.code === 0){
                    pid.value = JSON.parse(JSON.stringify(res.data.data)).pid
                    level.value = JSON.parse(JSON.stringify(res.data.data)).level
                    // form.id = JSON.parse(JSON.stringify(res.data.data)).id
                    // form.title = JSON.parse(JSON.stringify(res.data.data)).title
                }else{
                    ElMessage(res.data.msg)
                    return false
                }
            })
        }else{
            pid.value = 0
            level.value = 1
            // form.id = 0
            // form.title = ''
        }        
    }

    const onSearch = () => {
        Exam.show(search_data).then((res:any)=>{
            if(res.data.code === 0){
                tableData.value = res.data.data
            }else{
                ElMessage(res.data.msg)
                return false
            }
        }).catch((res:any)=>{
            console.log(res)
        })
    }
    const cascaderChange=(e:any)=>{
    console.log(e);
    form.cate_id=e[1]
    
 }
    const submit = () => {
        Exam.save(form).then((res:any)=>{
            if(res.data.code === 0){
                // ElMessage(form.id?'修改成功':'新增成功')
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
    <el-dialog v-model="dialogFormVisible" title="项目发布" width="700px">
        <el-form ref="ruleFormRef" :rules="rules" :model="form" size="large" :label-width="formLabelWidth">
            <el-form-item label="项目标题：">
                <el-col :span="14">
                    <el-input v-model="form.exam_title" autocomplete="off" />
                </el-col>
            </el-form-item>
             <el-form-item label="考级机构：">
                <el-col :span="14">
                    <!-- <el-input v-model="form.examination_id" autocomplete="off" /> -->
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
              <el-form-item label="类别：">
                <el-col :span="14">
                    <el-cascader v-model="form.cate_id" :options="ArtData" placeholder="请选择" @change="cascaderChange" />
                </el-col>
            </el-form-item>
             
             <el-form-item label="图片：">
                <el-col :span="14">
                    <!-- <el-input v-model="form.pic" autocomplete="off" /> -->
                    <el-upload
                        v-model:file-list="fileList"
                        class="upload-demo"
                        :action='src'
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-change="handleChange"
                        list-type="picture"
                    >
                        <el-button type="primary" class="bg-blue-400" :disabled="btnDisable">{{btnText}}</el-button>
                        <template #tip>
                        <div class="el-upload__tip">
                            限单张，格式jpg/png，大小不超过500kb
                        </div>
                        </template>
                    </el-upload>
                </el-col>
            </el-form-item>
             <el-form-item label="组员类型：">
                <el-col :span="14">
                    <el-input v-model="form.group_type" autocomplete="off" />
                </el-col>
            </el-form-item>
             <el-form-item label="评分方式：">
                <el-col :span="14">
                    <!-- <el-input v-model="form.score_type" autocomplete="off" /> -->
                    <el-select v-model="form.score_type" class="m-2" placeholder="Select" size="large" @change="selectChange">
                        <el-option
                        v-for="item in scoreType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        />
                    </el-select>
                </el-col>
            </el-form-item>
            <div  :class="[display?'block':'hidden']">
                <el-form-item label="分值：" >
                    <el-col :span="6">
                        <el-input v-model="form.minval" autocomplete="off" type="number" placeholder="最小分值" /> 
                    </el-col>
                    <el-col :span="2" class="text-center">-</el-col>
                    <el-col :span="6">
                        <el-input v-model="form.maxval" autocomplete="off" type="number"  placeholder="最大分值"/>
                    </el-col>
                </el-form-item>
          </div>
              <!-- <el-form-item label="最大分值：">
                <el-col :span="14">
                    <el-input v-model="form.maxval" autocomplete="off" />
                </el-col>
            </el-form-item> -->
            <div   :class="[display?'hidden':'block']">
                <el-form-item label="最大等级：">
                    <el-col :span="14">
                        <!-- <el-input v-model="form.grade_number" autocomplete="off" /> -->
                        <el-select v-model="form.grade_number" class="m-2" placeholder="Select" size="large">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            />
                        </el-select>
                    </el-col>
                </el-form-item>
            </div>
             <el-form-item label="对外开放：">
                <el-col :span="14">
                    <el-switch v-model="form.is_public" active-value="1" inactive-value="0" />
                    <!-- <el-input v-model="form.is_public" autocomplete="off" /> -->
                </el-col>
            </el-form-item> 
            <el-form-item label="代理项目：">
                <el-col :span="14">
                    <el-switch v-model="form.is_agent" active-value="1" inactive-value="0" />
                    <!-- <el-input v-model="form.is_agent" autocomplete="off" /> -->
                </el-col>
            </el-form-item>
             <el-form-item label="父代理：">
                <el-col :span="14">
                    <el-select v-model="form.agented_id"  placeholder="请选择" size="large">
                        <el-option
                        v-for="item in agented_data"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id"
                        />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="代理审核：">
                <el-col :span="14">
                    <!-- <el-input v-model="form.is_checked" autocomplete="off" /> -->
                    <el-switch v-model="form.is_checked"  active-value="1" inactive-value="0" />
                </el-col>
            </el-form-item>
            <!-- agent_time:'',checked_time:'' -->
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