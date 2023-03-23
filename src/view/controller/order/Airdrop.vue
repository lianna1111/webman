<script setup lang="ts">
    import { ref,reactive,onMounted } from 'vue'
    import { DataList } from '@/util/interface';
    import Order from '@/api/Order'
    import Goods from '@/api/Goods'
    import { ElMessage } from 'element-plus'

    import { genFileId } from 'element-plus'
    import type { UploadProps, UploadUserFile,UploadRawFile } from 'element-plus'
    
    const table = ref('order')
    const dialogFormVisible = ref(false)
    const dialogConfirm = ref(false)
    const confirmData = reactive({type:0,title:'',order:0})
    const tableData = ref<DataList>()
    const goodsData = ref()
    const formLabelWidth = ref(180)
    const form = reactive({id:0,uid:'',type:4,user_type:'1',user_list:'',goods_id:'',remark:'系统空投'}) 
    const formSearch = reactive({keyword:'',page:1,pagesize:10,type:4})
    const fileList = ref<UploadUserFile[]>([])
    const uploadAction = ref(import.meta.env.VITE_API_BASEURL+'upload')

    onMounted(async () => {
        await Order.show(formSearch).then((res)=>{
            tableData.value = JSON.parse(JSON.stringify(res.data.data))
        })
        await Goods.airpop().then((res)=>{
            // console.log('airpop goods')
            // console.log(res)
            goodsData.value = JSON.parse(JSON.stringify(res.data.data))
        })

        form.uid = localStorage.getItem('uid') as string
    })

    const handleSelectionChange = () => {

    }

    const setConfirm = (type:number = 1,order:any) => {
        confirmData.type = type
        confirmData.order = order

        switch(type){
            case 1:
                confirmData.title = '订单上链'
                break;
            case 2:
                confirmData.title = '订单回调'
                break;
            case 3:
                confirmData.title = '锁单'
                break;
            case 4:
                confirmData.title = '恢复锁单'
                break;
            case 5:
                confirmData.title = '删除'
                break;
            default:
                confirmData.title = ''
        }

        dialogConfirm.value = true
    }

    // 手动上链
    const setChain = () => {
        Order.mchain(confirmData.order).then((res)=>{
            console.log(res)
            if(res.data.code === 0){
                ElMessage('订单上链成功')
                setTimeout(()=>{
                    window.location.reload()
                },1000)
            }else{
                ElMessage(res.data.msg)
                setTimeout(()=>{
                    dialogConfirm.value = false
                },1000)
                return false
            }
        }).catch((res)=>{
            console.log(res)
        })
    }

    // 手动回调
    const setNotify = () => {
        Order.mnotify(confirmData.order).then((res)=>{
            console.log(res)
            if(res.data.code === 0){
                ElMessage('订单回调成功')
                setTimeout(()=>{
                    window.location.reload()
                },1000)
            }else{
                ElMessage(res.data.msg)
                setTimeout(()=>{
                    dialogConfirm.value = false
                },1000)
                return false
            }
        }).catch((res)=>{
            console.log(res)
        })
    }

    // 锁单
    const setLock = () => {
        Order.mlock(confirmData.order).then((res)=>{
            console.log(res)
            if(res.data.code === 0){
                ElMessage('订单回收成功')
                setTimeout(()=>{
                    window.location.reload()
                },1000)
            }else{
                ElMessage(res.data.msg)
                setTimeout(()=>{
                    dialogConfirm.value = false
                },1000)
                return false
            }
        }).catch((res)=>{
            console.log(res)
        })
    }

// 恢复锁单
const setUnLock = () => {
    Order.unlock(confirmData.order).then((res)=>{
        console.log(res)
        if(res.data.code === 0){
            ElMessage('订单恢复成功')
            setTimeout(()=>{
                window.location.reload()
            },1000)
        }else{
            ElMessage(res.data.msg)
                setTimeout(()=>{
                    dialogConfirm.value = false
                },1000)
            return false
        }
    }).catch((res)=>{
        console.log(res)
    })
}

    // 删除
    const setDel = () => {
        Order.del(confirmData.order).then((res)=>{
            console.log(res)
            if(res.data.code === 0){
                ElMessage('订单删除成功')
                setTimeout(()=>{
                    window.location.reload()
                },1000)
            }else{
                ElMessage(res.data.msg)
                setTimeout(()=>{
                    dialogConfirm.value = false
                },1000)
                return false
            }
        }).catch((res)=>{
            console.log(res)
        })
    }

    // 
    const add = (table:string,id:number = 0)=>{
        form.id = 0
        dialogFormVisible.value = true
    }

    const search = () => {
        Order.show(formSearch).then((res)=>{
            console.log(res)
            tableData.value = JSON.parse(JSON.stringify(res.data.data))
        })
    }

    const changePage = (e:any) => {
        console.log('page: '+e)
        formSearch.page = e

        Order.show(formSearch).then((res)=>{
            console.log(res)
            tableData.value = JSON.parse(JSON.stringify(res.data.data))
        }).catch((res)=>{
            console.log(res)
        })
    }

    const changePagesize = (e:any) => {
        console.log('pagesize: '+e)
        formSearch.pagesize = e

        Order.show(formSearch).then((res)=>{
            console.log(res)
            tableData.value = JSON.parse(JSON.stringify(res.data.data))
        }).catch((res)=>{
            console.log(res)
        })
    }

    const submit = () => {
        Order.airdrop(form).then((res)=>{
            // console.log(res)
            if(res.data.code === 0){
                // ElMessage('操作成功,共空投'+res.data.data.num+'个,失败'+res.data.data.fail+'个')
                ElMessage('空投成功')
                setTimeout(()=>{
                    window.location.reload()
                },1000)
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
                <el-link>空投订单管理</el-link>
            </div>
            <div>
                <el-button type="primary" plain @click="add(table)">创建空投</el-button>
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
                                <el-dropdown-item @click="setConfirm(1,scope.row.order)">上链</el-dropdown-item>
                                <el-dropdown-item @click="setConfirm(2,scope.row.order)">回调</el-dropdown-item>
                                <el-dropdown-item @click="setConfirm(3,scope.row.order)">锁单</el-dropdown-item>
                                <el-dropdown-item @click="setConfirm(4,scope.row.order)">恢复</el-dropdown-item>
                                <el-dropdown-item @click="setConfirm(5,scope.row.order)">删除</el-dropdown-item>
                            </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                        <!-- <el-icon :size="16" class="cursor-pointer" @click="mod('user',scope.row.id)"><MoreFilled /></el-icon> -->
                    </template>
                </el-table-column>
                <!-- <el-table-column label="修改">
                    <template #default="scope">
                        <el-icon :size="16" class="cursor-pointer" @click="mod(table,scope.row.id)"><Edit /></el-icon>
                    </template>
                </el-table-column>
                <el-table-column label="删除">
                    <template #default="scope">
                        <el-icon :size="16" @click="del(table,scope.row.id)" class="cursor-pointer"><Delete /></el-icon>
                    </template>
                </el-table-column> -->
            </el-table>
        </div>
        <div class="flex justify-between items-center bg-white p-3">
            <element-button-group :items="[]" />
            <el-pagination v-model:currentPage="formSearch.page" v-model:page-size="formSearch.pagesize" background layout="total,sizes,prev, pager, next" :total="tableData?.rows" @size-change="changePagesize" @current-change="changePage" />
        </div>
    </el-container>

    <el-dialog v-model="dialogFormVisible" :title="form.id? '修改订单' : '新增订单'">
        <el-form size="large" :model="form" :label-width="formLabelWidth">
            <!-- <el-form-item label="订单类型">
                <el-col :span="12">
                    <el-select v-model="form.type" placeholder="选择类型">
                        <el-option label="藏品" :value="1" />
                        <el-option label="盲盒" :value="2" />
                        <el-option label="空投" :value="3" />
                        <el-option label="转赠" :value="4" />
                        <el-option label="合成" :value="5" />
                        <el-option label="积分" :value="6" />
                        <el-option label="盲盒" :value="7" />
                    </el-select>
                </el-col>
            </el-form-item> -->
            <el-form-item label="选择藏品">
                <el-col :span="18">
                    <el-select v-model="form.goods_id" placeholder="选择藏品" style="width:100% !important;">
                        <el-option :label="item.title" :value="item.id" v-for="item in goodsData" :key="item.id" />
                    </el-select>
                </el-col>
            </el-form-item>
            <!-- <el-form-item label="用户类型">
                <el-radio-group v-model="form.user_type">
                    <el-radio label="1">按会员ID</el-radio>
                    <el-radio label="2">按手机号码</el-radio>
                    <el-radio label="3">全部会员</el-radio>
                </el-radio-group>
            </el-form-item> -->
            <el-form-item label="用户列表">
                <el-col :span="18">
                    <el-input v-model="form.user_list" autocomplete="off" placeholder="会员ID/会员手机号码" :rows="10" type="textarea" />
                </el-col>
            </el-form-item>
            <el-form-item label="备注">
                <el-col :span="18">
                    <el-input v-model="form.remark" autocomplete="off" />
                </el-col>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submit" class="bg-blue-400">确认</el-button>
            </span>
        </template>
    </el-dialog>

    <!-- 确认 表单 -->
    <el-dialog v-model="dialogConfirm" :title="confirmData.title" width="30%">
        <span>确定要{{confirmData.title}}么？</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogConfirm = false">取消</el-button>
                <el-button type="primary" @click="setChain" class="bg-blue-400" v-if="confirmData.type == 1">确认</el-button>
                <el-button type="primary" @click="setNotify" class="bg-blue-400" v-if="confirmData.type == 2">确认</el-button>
                <el-button type="primary" @click="setLock" class="bg-blue-400" v-if="confirmData.type == 3">确认</el-button>
                <el-button type="primary" @click="setUnLock" class="bg-blue-400" v-if="confirmData.type == 4">确认</el-button>
                <el-button type="primary" @click="setDel" class="bg-blue-400" v-if="confirmData.type == 5">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style lang="scss" scoped>

</style>