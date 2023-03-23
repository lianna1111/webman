<script setup lang="ts">
    import { ref,reactive,onMounted } from 'vue'
    import { DataList } from '@/util/interface';
    import User from '@/api/User'
    import { ElMessage } from 'element-plus'

    import { genFileId } from 'element-plus'
    import type { UploadProps, UploadUserFile,UploadRawFile } from 'element-plus'
    
    const table = ref('user')
    const dialogFormVisible = ref(false)
    const dialogPassword = ref(false)
    const dialogUserInfo = ref(false)
    const dialogCharge = ref(false)
    const dialogLocked = ref(false)
    const dialogUnLocked = ref(false)
    const dialogDel = ref(false)
    const tableData = ref<DataList>()
    const formLabelWidth = ref(180)
    const form = reactive({id:0,username:'',realname:'',nickname:'',mobile:'',email:'',avatar:'',idcard:'',intro:'',chain_id:'',content:''}) 
    const formSearch = reactive({keyword:'',start_time:'',end_time:'',is_auth:'',parent_id:'',page:1,pagesize:10,role_id:27})
    const formMod = reactive({uid:0,username:'',realname:'',nickname:'',mobile:0,email:'',charge_type:1,charge_value:0,avatar:'',idcard:'',password:'',lock_type:0,lock_time:0,lock_date_type:1,lock_reason:''})
    const fileList = ref<UploadUserFile[]>([])
    const uploadAction = ref(import.meta.env.VITE_API_BASEURL+'upload')

    onMounted(async () => {
        await User.show(formSearch).then((res)=>{
            tableData.value = JSON.parse(JSON.stringify(res.data.data))
        })
    })

    // 改密
    const setPassword = (uid:number,mobile:number) => {
        formMod.uid = uid
        formMod.mobile = mobile
        dialogPassword.value = true
    }

    const submitPassword = () => {
        // User.modpwd(formMod).then((res)=>{
        //     if(res.data.code === 0){
        //         ElMessage('密码修改成功')
        //         setTimeout(()=>{
        //             formMod.uid = 0
        //             formMod.mobile = 0
        //             formMod.password = ''
        //             dialogPassword.value = false
        //         },1000)
        //     }else{
        //         ElMessage(res.data.msg)
        //         return false
        //     }
        // }).catch((res)=>{
        //     console.log(res)
        // })
    }

    // 用户信息
    const setUserInfo = (uid:number,mobile:number) => {
        formMod.uid = uid
        formMod.mobile = mobile
        dialogUserInfo.value = true
    }

    const submitUserInfo = () => {
        // User.modinfo(formMod).then((res)=>{
        //     if(res.data.code === 0){
        //         ElMessage('用户信息修改成功')
        //         setTimeout(()=>{
        //             formMod.uid = 0
        //             formMod.mobile = 0
        //             formMod.username = ''
        //             formMod.nickname = ''
        //             formMod.idcard = ''
        //             formMod.realname = ''
                    
        //             window.location.reload()
        //         },1000)
        //     }else{
        //         ElMessage(res.data.msg)
        //         return false
        //     }
        // }).catch((res)=>{
        //     console.log(res)
        // })
    }

    // 充值
    const setCharge = (uid:number,mobile:number) => {
        formMod.uid = uid
        formMod.mobile = mobile
        dialogCharge.value = true
    }

    const submitCharge = () => {
        // User.charge(formMod).then((res)=>{
        //     if(res.data.code === 0){
        //         ElMessage('充值成功')
        //         setTimeout(()=>{
        //             formMod.uid = 0
        //             formMod.mobile = 0
        //             formMod.charge_type = 1
        //             formMod.charge_value = 0
        //             window.location.reload()
        //         },1000)
        //     }else{
        //         ElMessage(res.data.msg)
        //         return false
        //     }
        // }).catch((res)=>{
        //     console.log(res)
        // })
    }

    // 锁定
    const setLocked = (uid:number,mobile:number) => {
        formMod.uid = uid
        formMod.mobile = mobile
        dialogLocked.value = true
    }

    const submitLocked = () => {
        // User.lock(formMod).then((res)=>{
        //     if(res.data.code === 0){
        //         ElMessage('用户锁定成功')
        //         setTimeout(()=>{
        //             formMod.uid = 0
        //             formMod.mobile = 0
        //             formMod.lock_type = 0
        //             formMod.lock_date_type = 0
        //             formMod.lock_time = 0
        //             formMod.lock_reason = ''
        //             window.location.reload()
        //         },1000)
        //     }else{
        //         ElMessage(res.data.msg)
        //         return false
        //     }
        // }).catch((res)=>{
        //     console.log(res)
        // })
    }

    // 解锁
    const setUnLocked = (uid:number) => {
        formMod.uid = uid
        dialogUnLocked.value = true
    }

    const submitUnLocked = () => {
        // User.unlock(formMod.uid).then((res)=>{
        //     if(res.data.code === 0){
        //         ElMessage('用户解锁成功')
        //         setTimeout(()=>{
        //             formMod.uid = 0
        //             window.location.reload()
        //         },1000)
        //     }else{
        //         ElMessage(res.data.msg)
        //         return false
        //     }
        // }).catch((res)=>{
        //     console.log(res)
        // })
    }

    // 删除
    const setDel = (uid:number,mobile:number) => {
        formMod.uid = uid
        formMod.mobile = mobile
        dialogDel.value = true
    }

    const submitDel = () => {
        // User.del(formMod.uid).then((res)=>{
        //     if(res.data.code === 0){
        //         ElMessage('用户删除成功')
        //         setTimeout(()=>{
        //             formMod.uid = 0
        //             formMod.mobile = 0
        //             window.location.reload()
        //         },1000)
        //     }else{
        //         ElMessage(res.data.msg)
        //         return false
        //     }
        // }).catch((res)=>{
        //     console.log(res)
        // })
    }

    const handleRemovePic: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
        console.log(uploadFile, uploadFiles)
    }

    const handlePreviewPic: UploadProps['onPreview'] = (file) => {
        console.log(file)
    }

    const handleExceed: UploadProps['onExceed'] = (files) => {
        // fileList.value!.clearFiles()
        // const file = files[0] as UploadRawFile
        // file.uid = genFileId()
        // fileList.value!.handleStart(file)
    }

    const uploadSuccessPic:UploadProps['onSuccess'] = (res) => {
        if(res.code === 0){
            form.avatar = res.data.url
        }else{
            ElMessage(res.msg)
            return false
        }
    }

    const handleSelectionChange = () => {

    }
    const add = (table:string,id:number = 0)=>{
        form.id = 0
        dialogFormVisible.value = true
    }

    const mod = (table:string,id:number)=>{
         User.get(id).then((res)=>{
            console.log(res.data.data)
            form.id = JSON.parse(JSON.stringify(res.data.data)).id
            form.username = JSON.parse(JSON.stringify(res.data.data)).username
            form.realname = JSON.parse(JSON.stringify(res.data.data)).realname
            form.nickname = JSON.parse(JSON.stringify(res.data.data)).nickname
            form.mobile = JSON.parse(JSON.stringify(res.data.data)).mobile
            form.email = JSON.parse(JSON.stringify(res.data.data)).email
            form.idcard = JSON.parse(JSON.stringify(res.data.data)).idcard
            form.avatar = JSON.parse(JSON.stringify(res.data.data)).avatar
            form.chain_id = JSON.parse(JSON.stringify(res.data.data)).chain_id
            form.intro = JSON.parse(JSON.stringify(res.data.data)).intro
            fileList.value.push({name:'',url:form.avatar})
        })
        dialogFormVisible.value = true
    }

    const search = () => {
         User.show(formSearch).then((res)=>{
            console.log(res)
            tableData.value = JSON.parse(JSON.stringify(res.data.data))
        }).catch((res)=>{
            console.log(res)
        })
    }

    const showParent = (id:any) => {
        console.log('id: '+ id)
        formSearch.parent_id = id
        formSearch.page = 1
        formSearch.keyword = ''
        formSearch.start_time = ''
        formSearch.end_time = ''
        formSearch.is_auth = ''
        User.show(formSearch).then((res)=>{
            console.log(res)
            tableData.value = JSON.parse(JSON.stringify(res.data.data))
        }).catch((res)=>{
            console.log(res)
        })
    }

    const changePage = (e:any) => {
        console.log('page: '+e)
        formSearch.page = e

        User.show(formSearch).then((res)=>{
            console.log(res)
            tableData.value = JSON.parse(JSON.stringify(res.data.data))
        }).catch((res)=>{
            console.log(res)
        })
    }

    const changePagesize = (e:any) => {
        console.log('pagesize: '+e)
        formSearch.pagesize = e
    }

    const submit = () => {
        User.save(form).then((res)=>{
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
                <el-link>用户管理</el-link>
            </div>
            <div>
                <el-button type="primary" plain @click="add('user')">新增</el-button>
            </div>
        </el-header>
        <div class="flex justify-between items-center bg-white p-3">
            <el-form :inline="true" :model="formSearch" size="large" class="demo-form-inline">
                <el-form-item label="关键词">
                    <el-input v-model="formSearch.keyword" placeholder="关键词" />
                </el-form-item>
                <el-form-item>
                    <el-button @click="search" class="text-gray-500 font-light">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-table ref="multipleTableRef" size="large" :data="tableData?.data" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                <el-table-column :property="item.map" :label="item.title" v-for="(item,index) in tableData?.thead" :key="index" :width="item.width ? item.width : ''" show-overflow-tooltip>
                    <template #default="scope">
                        <img :src="scope.row[item.map]" class="h-[30px]" v-if="item.type == 'pic'" />
                        <el-switch v-else-if="item.type == 'switch'" />
                        <!-- <span v-else-if="item.map == 'direct_share'" @click="showParent(scope.row.uid)" class="cursor-pointer" v-html="scope.row[item.map]"></span> -->
                        <!-- <span v-html="scope.row[item.map]" v-else-if="item.type == 'switch'"></span> -->
                        <span v-html="scope.row[item.map]" v-else></span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-dropdown>
                            <span class="el-dropdown-link">
                                <el-icon :size="16" class="cursor-pointer"><MoreFilled /></el-icon>
                            </span>
                            <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="setPassword(scope.row.uid,scope.row.mobile)">改密</el-dropdown-item>
                                <el-dropdown-item @click="setUserInfo(scope.row.uid,scope.row.mobile)">个人</el-dropdown-item>
                                <el-dropdown-item @click="setCharge(scope.row.uid,scope.row.mobile)">充值</el-dropdown-item>
                                <el-dropdown-item @click="setLocked(scope.row.uid,scope.row.mobile)">锁定</el-dropdown-item>
                                <el-dropdown-item @click="setUnLocked(scope.row.uid)">解锁</el-dropdown-item>
                                <el-dropdown-item @click="setDel(scope.row.uid,scope.row.mobile)">删除</el-dropdown-item>
                            </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                        <!-- <el-icon :size="16" class="cursor-pointer" @click="mod('user',scope.row.id)"><MoreFilled /></el-icon> -->
                    </template>
                </el-table-column>
                <!-- <el-table-column label="修改">
                    <template #default="scope">
                        <el-icon :size="16" class="cursor-pointer" @click="mod('user',scope.row.id)"><Edit /></el-icon>
                    </template>
                </el-table-column>
                <el-table-column label="删除">
                    <template #default="scope">
                        <el-icon :size="16" @click="del('user',scope.row.id)" class="cursor-pointer"><Delete /></el-icon>
                    </template>
                </el-table-column> -->
            </el-table>
        </div>
        <div class="flex justify-between items-center bg-white p-3">
            <element-button-group :items="[]" />
            <el-pagination v-model:currentPage="formSearch.page" v-model:page-size="formSearch.pagesize" background layout="total,sizes,prev, pager, next" :total="tableData?.rows" @size-change="changePagesize" @current-change="changePage" />
        </div>
    </el-container>

    <!-- 修改用户密码 表单 -->
    <el-dialog v-model="dialogPassword" title="修改用户密码">
        <el-form size="large" :model="form" :label-width="formLabelWidth">
            <el-form-item label="手机号码">
                <el-col :span="12">
                    <el-input v-model="formMod.mobile" :readonly="true" class="text-gray-500" />
                </el-col>
            </el-form-item>
            <el-form-item label="新密码">
                <el-col :span="12">
                    <el-input v-model="formMod.password" autocomplete="off" />
                </el-col>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogPassword = false">取消</el-button>
                <el-button type="primary" @click="submitPassword" class="bg-blue-400">确认</el-button>
            </span>
        </template>
    </el-dialog>

    <!-- 用户信息 表单 -->
    <el-dialog v-model="dialogUserInfo" title="修改用户信息">
        <el-form size="large" :model="formMod" :label-width="formLabelWidth">
            <el-form-item label="手机号码">
                <el-col :span="12">
                    <el-input v-model="formMod.mobile" :readonly="true" class="text-gray-500" />
                </el-col>
            </el-form-item>
            <el-form-item label="用户名">
                <el-col :span="12">
                    <el-input v-model="formMod.username" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="昵称">
                <el-col :span="12">
                    <el-input v-model="formMod.nickname" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="姓名">
                <el-col :span="12">
                    <el-input v-model="formMod.realname" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="身份证号">
                <el-col :span="12">
                    <el-input v-model="formMod.idcard" autocomplete="off" />
                </el-col>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogUserInfo = false">取消</el-button>
                <el-button type="primary" @click="submitUserInfo" class="bg-blue-400">确认</el-button>
            </span>
        </template>
    </el-dialog>

    <!-- 充值 表单 -->
    <el-dialog v-model="dialogCharge" title="给用户充值">
        <el-form size="large" :model="form" :label-width="formLabelWidth">
            <el-form-item label="手机号码">
                <el-col :span="12">
                    <el-input v-model="formMod.mobile" :readonly="true" class="text-gray-500" />
                </el-col>
            </el-form-item>
            <el-form-item label="类型">
                <el-col :span="12">
                    <el-radio-group v-model="formMod.charge_type">
                        <el-radio :label="1">余额</el-radio>
                        <el-radio :label="2">积分</el-radio>
                        <el-radio :label="3">金币</el-radio>
                    </el-radio-group>
                </el-col>
            </el-form-item>
            <el-form-item label="充值额度">
                <el-col :span="12">
                    <el-input v-model="formMod.charge_value" autocomplete="off">
                        <template #prefix>¥&ensp;</template>
                    </el-input>
                </el-col>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogCharge = false">取消</el-button>
                <el-button type="primary" @click="submitCharge" class="bg-blue-400">确认</el-button>
            </span>
        </template>
    </el-dialog>

    <!-- 锁定 表单 -->
    <el-dialog v-model="dialogLocked" title="锁定用户">
        <el-form size="large" :model="form" :label-width="formLabelWidth">
            <el-form-item label="手机号码">
                <el-col :span="12">
                    <el-input v-model="formMod.mobile" :readonly="true" class="text-gray-500" />
                </el-col>
            </el-form-item>
            <el-form-item label="锁定类型">
                <el-col :span="12">
                    <el-radio-group v-model="formMod.lock_type">
                        <el-radio :label="0">临时锁定</el-radio>
                        <el-radio :label="1">永久锁定</el-radio>
                    </el-radio-group>
                </el-col>
            </el-form-item>
            <el-form-item label="锁定时长" v-if="formMod.lock_type == 0">
                <el-col :span="12">
                    <el-input v-model="formMod.lock_time" autocomplete="off">
                        <template #append>
                            <el-select v-model="formMod.lock_date_type" placeholder="" style="width: 70px">
                                <el-option label="分" :value="1" />
                                <el-option label="时" :value="2" />
                                <el-option label="天" :value="3" />
                                <el-option label="月" :value="4" />
                                <el-option label="年" :value="5" />
                            </el-select>
                        </template>
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="锁定原因">
                <el-col :span="12">
                    <el-input v-model="formMod.lock_reason" autocomplete="off" />
                </el-col>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogLocked = false">取消</el-button>
                <el-button type="primary" @click="submitLocked" class="bg-blue-400">确认</el-button>
            </span>
        </template>
    </el-dialog>

    <!-- 解锁 表单 -->
    <el-dialog v-model="dialogDel" title="解锁用户" width="30%">
        <span>确定要解锁该用户么？</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogDel = false">取消</el-button>
                <el-button type="primary" @click="submitUnLocked" class="bg-blue-400">确认</el-button>
            </span>
        </template>
    </el-dialog>

    <!-- 删除 表单 -->
    <el-dialog v-model="dialogDel" title="删除用户" width="30%">
        <span>确定要删除该用户么？</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogDel = false">取消</el-button>
                <el-button type="primary" @click="submitDel" class="bg-blue-400">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style lang="scss" scoped>

</style>