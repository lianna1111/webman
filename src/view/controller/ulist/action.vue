<script setup lang="ts">
    import { ref,reactive,shallowRef,onMounted } from 'vue'
    import { useRouter, useRoute } from 'vue-router';
    import { DataList,UploadList } from '@/util/interface';
    import Ulist from '@/api/Ulist'
    // import Collection from '@/api/Collection'
    import UlistCate from '@/api/UlistCate'

    import { ElMessage, ElMessageBox, tagEmits } from 'element-plus'
    import { Plus } from '@element-plus/icons-vue'
    import type { UploadFile,UploadProps, UploadUserFile } from 'element-plus'
    import '@wangeditor/editor/dist/css/style.css'
    // import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

    const id = ref(0)
    const router = useRouter(), route = useRoute();
    const dialogFormVisible = ref(false)
    const formLabelWidth = ref(180)
    const form = reactive({id:0,cid:1,cate_id:'',title:'',description:'',pic:'',picture:'',start_time:'',end_time:'',is_original:0,source_url:'',sort:1,content:''}) 
    const pictures = ref<UploadList[]>([])
    const CateData = ref()

    const dialogImageUrl = ref('')
    const disabled = ref(false)
    const dialogVisible = ref(false)
    const fileList = ref<UploadUserFile[]>([])
    const picList = ref<UploadUserFile[]>([])
    const uploadAction = ref(import.meta.env.VITE_API_BASEURL+'upload')
    type InsertFnType = (url: string, alt: string, href: string) => void

    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    const toolbarConfig = {}
    const editorConfig = { MENU_CONF: {
            uploadImage:{
                fieldName: 'file',
                maxFileSize: 5 * 1024 * 1024,
                server: uploadAction.value+'?path=images',
                customInsert(res: any, insertFn: InsertFnType) {
                    console.log(res)
                    console.log(uploadAction.value)
                    insertFn(res.data.url, res.data.alt, res.data.url)
                },
            },
            uploadVideo:{
                fieldName: 'file',
                maxFileSize: 100 * 1024 * 1024,
                server: uploadAction.value+'?path=media&type=media',
                customInsert(res: any, insertFn: InsertFnType) {
                    console.log(res)
                    insertFn(res.data.url, res.data.alt, res.data.url)
                }
            }
        } 
    }

    onMounted(async () => {
        await UlistCate.get().then((res)=>{
            CateData.value = res.data.data
        })

        let param_id = route.params.id ? route.params.id : route.query.id
        console.log('param_id: ' + param_id)
        if(param_id){
            await Ulist.get(param_id).then((res)=>{
                console.log(res.data)
                if(res.data.code === 0 && res.data.data){
                    form.id = JSON.parse(JSON.stringify(res.data.data)).id
                    form.cate_id = JSON.parse(JSON.stringify(res.data.data)).cate_id
                    form.title = JSON.parse(JSON.stringify(res.data.data)).title
                    form.description = JSON.parse(JSON.stringify(res.data.data)).description
                    form.pic = JSON.parse(JSON.stringify(res.data.data)).pic
                    form.picture = JSON.parse(JSON.stringify(res.data.data)).picture
                    form.start_time = JSON.parse(JSON.stringify(res.data.data)).start_time
                    form.end_time = JSON.parse(JSON.stringify(res.data.data)).end_time
                    form.is_original = JSON.parse(JSON.stringify(res.data.data)).is_original
                    form.source_url = JSON.parse(JSON.stringify(res.data.data)).source_url
                    form.sort = JSON.parse(JSON.stringify(res.data.data)).sort
                    form.content = JSON.parse(JSON.stringify(res.data.data)).content
                    form.picture.split(',').forEach((item,index)=>{
                        pictures.value.push({name:`${index}`,url:item})
                    })
                }
            })
        }
    })

    const handleCreated = (editor:any) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    const uploadSuccess: UploadProps['onSuccess'] = (res) => {
        console.log(res)
        if(res.code === 0){
            if(form.picture == ''){
                form.picture = res.data.url;
            }else{
                form.picture += ',' + res.data.url;
            }
            if(form.pic == ''){
                form.pic = res.data.url
            }
        }else{
            ElMessage.warning(res.msg)
            return false
        }
    }
    
    const handleRemove = (file: UploadFile) => {
        console.log(file)
        pictures.value.forEach((item,index)=>{
            if(item.name == file.name){
                pictures.value.splice(index,1)
            }
        })
        form.pic = ''
        form.picture = ''
        pictures.value.forEach((item,index)=>{
            if(index == 0){
                form.pic = item.url as string
            }
            form.picture += item.url + ','
        })
        form.picture = form.picture.substring(0,form.picture.length-1)
    }

    const handlePictureCardPreview = (file: UploadFile) => {
        dialogImageUrl.value = file.url!
        dialogVisible.value = true
    }

    const handleDownload = (file: UploadFile) => {
        console.log(file)
    }



    const add = (table:string,id:number = 0)=>{
        dialogFormVisible.value = true
    }

    const del = (table:string,id:number) => {
        if(confirm('确定要删除么？')){
            Ulist.del(id).then((res)=>{
                console.log(res.data)
                if(res.data.code === 0){
                    alert('删除成功')
                    setTimeout(()=>{
                        router.push('/ulist')
                    },500)
                }else{
                alert('删除失败')
                return false 
                }
            })
        }
    }

    const submit = () => {
        Ulist.save(form).then((res)=>{
            if(res.data.code === 0){
                ElMessage(form.id?'修改成功':'新增成功')
                setTimeout(()=>{
                    router.push('/ulist')
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
                <el-link>添加协会人员</el-link>
            </div>
        </el-header>
    </el-container>
    <el-container class="w-screen h-screen overflow-auto bg-white p-10">
        <el-form ref="ruleFormRef" :model="form" size="large" :label-width="formLabelWidth">
            <el-form-item label="协会人员类别：">
                <el-col :span="16">
                    <el-select v-model="form.cate_id" placeholder="选择类别">
                        <el-option :label="item.title" :value="item.id" v-for="item in CateData" />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="所属网站：">
                <el-col :span="16">
                    <el-input v-model="form.cid" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="姓名：">
                <el-col :span="16">
                    <el-input v-model="form.title" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="图片：">
                <el-col :span="16">
                    <el-alert title="协会人员照片，建议尺寸：1:1" type="success" :closable="false" class="py-0" />
                </el-col>
            </el-form-item>
            <el-form-item label="描述：">
                <el-input v-model="form.description" type="textarea" autocomplete="off" />
            </el-form-item>
            <el-form-item label="">
                <el-col :span="16">
                    <el-upload :action="uploadAction+'?path=person'" :file-list="pictures" list-type="picture-card" :on-success="uploadSuccess">
                        <el-icon><Plus /></el-icon>

                        <template #file="{ file }">
                            <div>
                                <!-- {{item}} -->
                                <!-- <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                                <span class="el-upload-list__item-actions">
                                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                        <el-icon><zoom-in /></el-icon>
                                    </span>
                                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                                        <el-icon><Download /></el-icon>
                                    </span>
                                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                        <el-icon><Delete /></el-icon>
                                    </span>
                                </span> -->
                            </div>
                        </template>
                    </el-upload>
                    <el-dialog v-model="dialogVisible">
                        <img w-full :src="dialogImageUrl" alt="Preview Image" />
                    </el-dialog>
                </el-col>
            </el-form-item>
          
          
            <el-form-item label="排序：">
                <el-col :span="16">
                    <el-input v-model="form.sort" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" class="bg-blue-500 text-white" @click="submit">确定</el-button>
                <el-button >取消</el-button>
            </el-form-item>
            
            <div style="height:100px;"></div>
        </el-form>
    </el-container>
</template>

<style lang="scss" scoped>

    .el-form-item .el-input,.el-form-item .el-select,.el-form-item .el-alert{
       width: 100%;
    }

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