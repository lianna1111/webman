<script setup lang="ts">
    import { ref,reactive,onMounted } from 'vue'
    import WebConfig from '@/api/WebConfig';
    import { ElMessage, ElMessageBox, UploadInstance } from 'element-plus'
    import type { UploadProps, UploadUserFile } from 'element-plus'

    const configData = ref()
    const uploadAction = ref(import.meta.env.VITE_API_BASEURL+'upload')
    const form = ref({id:'',address: "",create_time: "",fax: "",icp: "",logo: "",pic: "",telphone: "",title: ""})
    const uploadRef = ref<UploadInstance>()
        
    onMounted(async () => {
        await WebConfig.get(1).then((res)=>{
            console.log(res.data.data)
            if(res.data.code === 0){
                configData.value = JSON.parse(JSON.stringify(res.data.data))
                form.value = JSON.parse(JSON.stringify(res.data.data))
        
                
            }
        })
    })

    // 上传logo
    const uploadlogo: UploadProps['onSuccess'] = (res) => {
        if(res.code === 0){
            form.value.logo = res.data.url
        }else{
            ElMessage.warning(res.msg)
            return false
        }
    }

    // 上传主图
    const uploadpic: UploadProps['onSuccess'] = (res) => {
        if(res.code === 0){
            form.value.pic = res.data.url
        }else{
            ElMessage.warning(res.msg)
            return false
        }
    }

   

  

    const submitUpload = () => {
        uploadRef.value!.submit()
    }

    const submit = () => {
        WebConfig.save(form.value).then((res)=>{
            if(res.data.code === 0){
                alert(form.value.id?'修改成功':'新增成功')
                setTimeout(()=>{
                        window.location.reload()
                    },500)
            }else{
                alert(res.data.msg);
                return false;
            }
        })
    }
</script>

<template>

    <el-container class="h-screen overflow-auto bg-white p-10">
        <el-header class="flex justify-between bg-white border-b py-4">
            <div class="flex justify-center items-center">
                <el-icon class="rotate-90 text-xl text-red-500"><SemiSelect /></el-icon>
                <el-link>{{configData?.title}}</el-link>
            </div>
            <div>
            </div>
        </el-header>

        <el-main class="mt-2 w-[60%] min-w-[700px] overflow-auto">
            <el-form size="large" label-width="180px">

                <el-form-item label="网站名称">
                    <el-input v-model="form.title" />
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="form.telphone" />
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address" />
                    <span class="text-gray-400">如：湖南长沙</span>
                </el-form-item>
                <el-form-item label="传真">
                    <el-input v-model="form.fax" />
                </el-form-item>
                <el-form-item label="备案号">
                    <el-input v-model="form.icp" />
                </el-form-item>
                <el-form-item label="网站logo">
                    <el-upload class="avatar-uploader" :action="uploadAction+'?path=webconfig'" :show-file-list="false" :on-success="uploadlogo">
                        <img v-if="form.logo" :src="form.logo" class="avatar w-[180px] h-[180px]" />
                        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                    </el-upload>
                </el-form-item>

                <el-form-item label="登录页主图">
                    <el-upload class="avatar-uploader" :action="uploadAction+'?path=webconfig'" :show-file-list="false" :on-success="uploadpic">
                        <img v-if="form.pic" :src="form.pic" class="avatar w-[180px] h-[180px]" />
                        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                    </el-upload>
                    <span class="text-gray-400">建议尺寸4：5</span>
                </el-form-item>

                <el-form-item label="">
                    <el-button type="primary" class="bg-blue-500 text-white" @click="submit">确认保存</el-button>
                </el-form-item>
            </el-form>

            <div style="height:100px;"></div>
        </el-main>
    </el-container>
</template>

<style lang="scss" scoped>

</style>