<script setup lang="ts">
    import { ref,reactive,onMounted,watch } from 'vue'
    import { ElMessage, ElMessageBox } from 'element-plus'
    import type { UploadProps, UploadUserFile } from 'element-plus'
    import Examination from '@/api/Examination'
    import Art from '@/api/Art'
    import router from '@/router'

    const table = ref('examination')
    const id = ref(0)
    const pid = ref(0)
    const level = ref(1)
    const dialogFormVisible = ref(false)
    const tableData = ref()
    const artlist =ref()
    const search_data = reactive({keyword:''})

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
       await getArtData()
         await setShowData()
         
    }
   
    const setShowData = async () => {
        Examination.show(search_data).then((res)=>{
            if(res.data.code === 0){
                tableData.value = res.data.data 
                console.log(tableData.value);
                
              
            }else{
                ElMessage(res.data.msg)
                return false
            }
        }).catch((res)=>{
            console.log(res)
        })
    }
    const getArtData=()=>{
        Art.get().then((res)=>{
            artlist.value=res.data.data
        })
    }
 
    // const handleChange = (e:any) => {
    //     console.log(e)
    // }

    const handleSelectionChange = () => {

    }

    const add = (table:string,id:number) => {
        setData(0)
        console.log('table: '+table+ ' id: '+ id)
        
        router.push({path:'/examination/add'})
    }

    const mod = (table:string,id:number) => {
        setData(id)
        console.log('table: '+table+ ' id: '+ id)
        router.push({path:'/examination/add',query:{id: id}})
        // setTimeout(()=>{
        //     dialogFormVisible.value = true
        // },300)
    }
    
    const del = (table:string,id:number) => {
        console.log('table: '+table+ ' id: '+ id)
        ElMessageBox.confirm('确认删除?删除后将不可恢复！','删除',
        {confirmButtonText: '确认',cancelButtonText: '取消',type: 'warning',
    }).then(() => {
         Examination.del(id).then((res)=>{
            console.log(res.data);
                if(res.data.code === 0){
                    ElMessage({type: 'success',message: '删除成功'})
                    // window.location.reload()
                      }else{
                    ElMessage(res.data.msg)
                    return false
                }
            })
    })
    .catch(() => {})//取消删除提醒
    }

    const setData = (id:number) => {
        if(id > 0){
            Examination.get(id).then((res)=>{
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
        Examination.show(search_data).then((res)=>{
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
            <element-button-group :items="[]" @add="add" @del="del"/>
            <el-pagination background layout="prev, pager, next" :total="tableData?.rows" />
        </div>
    </el-container>

    <!-- action form -->
   
</template>

<style lang="scss" scoped>

</style>