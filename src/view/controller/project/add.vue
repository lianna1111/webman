<script setup lang='ts'>
    import { ref,reactive,onMounted } from 'vue'
    import { ElMessage } from 'element-plus'
    import type { UploadProps, UploadUserFile,FormInstance, FormRules } from 'element-plus'
    import Project from '@/api/Project'
    import Art from '@/api/Art'
    import router from '@/router'
    import { useRoute } from 'vue-router'
    import {regionDataPlus} from 'element-china-area-data'
    const route = useRoute();
   
    const ruleFormRef = ref<FormInstance>()
    let ruleForm = reactive({
        id:0,
        title:'',
        cate_id:'',
        full_title:'',
        desc:'',
        logo:'',
        pic:'',
        picture:[],
        credit_code:'',
        business_license:'',
        legal_name:'',
        legal_card:'',
        legal_mobile:'',        
        legal_card_front:'',
        legal_card_back:'',
        website:'',
        telphone:'',
        hotline:'',
        contact:'',
        contact_card:'',
        contact_card_front:'',
        contact_card_back:'',
        contact_mobile:'',
        contact_email:'',
        province_id:'',
        city_id:'',
        district_id:'',
        address:'',
        content:'',
        uid:'',
        selectedOptions:''//
    })
    if(route.query.id){
    //    ruleForm.id = route.query.id
       Project.get(Number(route.query.id)).then((res)=>{
            if(res.data.code === 0){
                console.log(res.data.data);
                for (const key in res.data.data as any) {
                 ruleForm[key]=res.data.data[key]
                 } 
            }else{
                ElMessage(res.data.msg)
                return false
            }
        }).catch((res)=>{
            console.log(res)
        })
    }
    // title full_title  cate_id credit_code business_license
    const rules = reactive<FormRules>({
        title: [
    { required: true, message: '请输入企业简称', trigger: 'blur' },
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  full_title: [{required: true,message: '请输入企业全称（同营业执照）',trigger: 'blur',},],
  cate_id: [{required: true,message: '请选择艺术类别',trigger: 'blur',},],
  credit_code: [{required: true,message: '请输入信用代码',trigger: 'blur',},],
  business_license: [{ required: true, message: '请上传营业执照', trigger: 'blur' },],
  legal_name: [{ required: true, message: '请输入法人姓名', trigger: 'blur' },],
  legal_card: [{ required: true, message: '请输入法人身份证号', trigger: 'blur' },],
  legal_mobile: [{ required: true, message: '请输入法人电话', trigger: 'blur' },],
  legal_card_front: [{ required: true, message: '请上传法人身份证正面', trigger: 'blur' },],
  legal_card_back: [{ required: true, message: '请上传法人身份证反面', trigger: 'blur' },],
  selectedOptions: [{ required: true, message: '请选择省市区', trigger: 'blur' },],
  address: [{ required: true, message: '请输入具体地址', trigger: 'blur' },],

})

    const ArtData =ref()
    const formLabelWidth = ref(180)
    const imageUrl = ref('')
    const btnDisable =ref(false)
    const btnText=ref('点击上传')
    const src =import.meta.env.VITE_API_BASEURL+'upload?path=project'//图片上传地址
    const imageUrl1 = ref('')
    const btnDisable1 =ref(false)
    const btnText1=ref('点击上传')
    const options = regionDataPlus
    const selectedOptions = ref([])
    
    ruleForm .uid = localStorage.getItem('uid')as string

    onMounted(async ()=>{
        await init()
    })

    const init = async () => {
        await setArtData()
    }
    const setArtData = async () => {
        Art.child().then((res)=>{
            ArtData.value = res.data.data
            console.log(res.data.data,'artchild');
        })
    }
    const handleChange = (value:any) => {
        ruleForm .province_id=value[0],
        ruleForm .city_id=value[1],
        ruleForm .district_id=value[2],
        console.log( ruleForm .province_id,ruleForm .city_id,ruleForm .district_id);
        
    }
    const handleLogo: UploadProps['onSuccess'] = (response,uploadFile) => {
        ruleForm .logo = response.data.url
    }

    const handlePic: UploadProps['onSuccess'] = (response,uploadFile) => {
        ruleForm .pic = response.data.url
    }

    const handleLegalCardFront: UploadProps['onSuccess'] = (response,uploadFile) => {
        ruleForm .legal_card_front = response.data.url
    }
    const handleLegalCardBack: UploadProps['onSuccess'] = (response,uploadFile) => {
        ruleForm .legal_card_back = response.data.url
        console.log(ruleForm .legal_card_back)
    }
    const handleBusinessLicense: UploadProps['onSuccess'] = (response,uploadFile) => {
        ruleForm .business_license = response.data.url;
        console.log(ruleForm .legal_card_back)
    }
    const handleContactCardFront: UploadProps['onSuccess'] = (response,uploadFile) => {
        ruleForm .contact_card_front = response.data.url;
        console.log(ruleForm .legal_card_back)
    }
    const handleContactCardBack: UploadProps['onSuccess'] = (response,uploadFile) => {
        ruleForm .contact_card_back = response.data.url;
        console.log(ruleForm .legal_card_back)
    }
    const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
    // ruleForm .picture
    }
    const handlePreview: UploadProps['onPreview'] = (file) => {
    console.log(file)
    }


    const cascaderChange=(e:any)=>{
    console.log(e);
    ruleForm.cate_id=e[1]
 }

const submitForm = async (formEl: FormInstance | undefined) => {  
    Project.save(ruleForm).then((res)=>{
                    if(res.data.code === 0){
                        ElMessage(ruleForm.id?'修改成功':'新增成功')
                        setTimeout(()=>{
                            router.push({path:'/project'})
                        },500)
                    }else{
                        ElMessage(res.data.msg)
                        return false
                    }
                })
            }

    const submitForm1 = async (formEl: FormInstance | undefined) => {    
        if (!formEl) return
        await formEl.validate((valid, fields) => {
            if (valid) {
            console.log('submit!')
             console.log(ruleForm);
                Project.save(ruleForm).then((res)=>{
                    if(res.data.code === 0){
                        ElMessage(ruleForm.id?'修改成功':'新增成功')
                        setTimeout(()=>{
                            router.push({path:'/project'})
                        },500)
                    }else{
                        ElMessage(res.data.msg)
                        return false
                    }
                })
            } else {
            console.log('error submit!', fields)
            ElMessage( {message: "请填写必填项",type: 'warning' })
            }
        })
    }
        
    const goback =()=>{
        router.go(-1)
    }
</script>

<template>
  <div>
    <div class="border-b text-md p-5 mb-5">新增机构  </div>
    <!-- <el-dialog v-model="dialogFormVisible" title="新增考级机构" width="700px"> -->
        <el-form ref="ruleFormRef" :rules="rules" :model="ruleForm" size="large" :label-width="formLabelWidth">
            <el-form-item label="机构简称：" prop='title'>
                <el-col :span="9">
                    <el-input v-model="ruleForm .title" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="机构全称：" prop='full_title'>
                <el-col :span="9">
                    <el-input v-model="ruleForm .full_title" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="类别：" prop='cate_id' >
                <el-col :span="9">
                    <el-cascader v-model="ruleForm .cate_id" :options="ArtData" placeholder="请选择" @change="cascaderChange" />
                </el-col>
            </el-form-item>
            <el-form-item label="描述：">
                <el-col :span="9">
                    <el-input v-model="ruleForm .desc" autocomplete="off" />
                </el-col>
            </el-form-item>
             <el-form-item label="logo：">
                <el-col :span="9">
                    <!-- <el-input v-model="ruleForm .logo" autocomplete="off" /> -->
                    <el-upload
                        class="avatar-uploader"
                        :action='src'
                        :show-file-list="false"
                        :on-success="handleLogo"
                    >
                        <img v-if="ruleForm .logo" :src="ruleForm .logo" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                    </el-upload>
                </el-col>
            </el-form-item>
             <el-form-item label="图片：">
                <el-col :span="9">
                    <!-- <el-input v-model="ruleForm .pic" autocomplete="off" /> -->
                    <el-upload
                        class="avatar-uploader"
                        :action='src'
                        :show-file-list="false"
                        :on-success="handlePic"
                    >
                        <img v-if="ruleForm .pic" :src="ruleForm .pic" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                    </el-upload>
                </el-col>
            </el-form-item>
            <el-form-item label="图片组：">
                <el-col :span="9">
                    <!-- <el-input v-model="ruleForm .picture" autocomplete="off" /> -->
                    <el-upload
                        v-model:file-list="ruleForm .picture"
                        class="upload-demo"
                        :action='src'
                        :on-preview="handlePreview"
                         :on-remove="handleRemove"
                        list-type="picture"
                    >
                        <el-button type="primary" class="bg-blue-400">点击上传</el-button>
                        <!-- <template #tip>
                        <div class="el-upload__tip">
                           格式jpg/png，大小不超过500kb
                        </div>
                        </template> -->
                    </el-upload>
                </el-col>
            </el-form-item> 
            <el-form-item label="信用代码：" prop="credit_code" >
                <el-col :span="9">
                    <el-input v-model="ruleForm .credit_code" autocomplete="off"/>
                </el-col>
            </el-form-item>
            <el-form-item label="营业执照：" prop="business_license">
                <el-col :span="9">
                    <!-- <el-input v-model="ruleForm .business_license" autocomplete="off" /> -->
                    <el-upload
                        class="avatar-uploader"
                        :action='src'
                        :show-file-list="false"
                        :on-success="handleBusinessLicense"
                        
                    >
                        <img v-if="ruleForm .business_license" :src="ruleForm .business_license" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                    </el-upload>
                </el-col>
            </el-form-item>
            <el-form-item label="省市区：" prop="selectedOptions">
                <el-col :span="9">
                    <el-cascader size="large" :options="options" v-model="ruleForm.selectedOptions" @change="handleChange"></el-cascader>
                </el-col>
            </el-form-item>
            <el-form-item label="具体地址：" prop="address">
                <el-col :span="9">
                    <el-input v-model="ruleForm.address" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-divider content-position="left">法人</el-divider>
            <el-form-item label="法人代表：" prop="legal_name">
                <el-col :span="9">
                    <el-input v-model="ruleForm .legal_name" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="法人身份证：" prop="legal_card">
                <el-col :span="9">
                    <el-input v-model="ruleForm .legal_card" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="法人手机号：" prop="legal_mobile">
                <el-col :span="9">
                    <el-input v-model="ruleForm .legal_mobile" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="身份证正面：" prop="legal_card_front">
                <el-col :span="9">
                    <el-upload
                        class="avatar-uploader"
                        :action='src'
                        :show-file-list="false"
                        :on-success="handleLegalCardFront"
                    >
                        <img v-if="ruleForm .legal_card_front" :src="ruleForm .legal_card_front" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                    </el-upload>
                </el-col>
            </el-form-item>
            <el-form-item label="身份证反面：" prop="legal_card_back">
                <el-col :span="9">
                    <el-upload
                        class="avatar-uploader"
                        :action='src'
                        :show-file-list="false"
                        :on-success="handleLegalCardBack"
                    >
                        <img v-if="ruleForm .legal_card_back" :src="ruleForm .legal_card_back" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                    </el-upload>
                </el-col>
            </el-form-item>
          
            <el-divider content-position="left">联系人</el-divider>
            <el-form-item label="联系人：">
                <el-col :span="9">
                    <el-input v-model="ruleForm .contact" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="联系人身份证：">
                <el-col :span="9">
                    <el-input v-model="ruleForm .contact_card" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="身份证正面：">
                <el-col :span="9">
                    <!-- <el-input v-model="ruleForm .contact_card_front" autocomplete="off" /> -->
                    <el-upload
                        class="avatar-uploader"
                        :action='src'
                        :show-file-list="false"
                        :on-success="handleContactCardFront"
                    >
                        <img v-if="ruleForm .contact_card_front" :src="ruleForm .contact_card_front" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                    </el-upload>
                </el-col>
            </el-form-item>
            <el-form-item label="身份证反面：">
                <el-col :span="9">
                    <el-upload
                        class="avatar-uploader"
                        :action='src'
                        :show-file-list="false"
                        :on-success="handleContactCardBack"
                    >
                        <img v-if="ruleForm .contact_card_back" :src="ruleForm .legal_card_front" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                    </el-upload>
                </el-col>
            </el-form-item>
            <el-form-item label="联系人电话：">
                <el-col :span="9">
                    <el-input v-model="ruleForm .contact_mobile" autocomplete="off" />
                </el-col>
            </el-form-item>
            <!-- contact_email:'',,address:'',content:'', -->
            <el-form-item label="联系人邮箱：">
                <el-col :span="9">
                    <el-input v-model="ruleForm .contact_email" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-divider content-position="left">其他</el-divider>
            <el-form-item label="网址：">
                <el-col :span="9">
                    <el-input v-model="ruleForm .website" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="电话：">
                <el-col :span="9">
                    <el-input v-model="ruleForm .telphone" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="热线：">
                <el-col :span="9">
                    <el-input v-model="ruleForm .hotline" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="具体内容：">
                <el-col :span="9">
                    <el-input v-model="ruleForm .content" autocomplete="off" />
                </el-col>
            </el-form-item>

        </el-form>
        <!-- <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" class="bg-blue-500 text-white" @click="submit">确定</el-button>
            </span>
        </template> -->
        <div class="mt-10 text-center">
            <span class="dialog-footer">
                <el-button @click="goback">取消</el-button>
                <el-button type="primary" class="bg-blue-500 text-white" @click="submitForm(ruleFormRef)">确定</el-button>
            </span>
        </div>
  </div>
</template>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>