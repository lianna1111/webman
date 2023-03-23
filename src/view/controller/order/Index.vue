<script setup lang="ts">
    import { ref,reactive,onMounted } from 'vue'
    import { DataList } from '@/util/interface';
    import Order from '@/api/Order'
    import Collection from '@/api/Collection'
    import { ElMessage,ElLoading } from 'element-plus'

    import { genFileId } from 'element-plus'
    import type { UploadProps, UploadUserFile,UploadRawFile } from 'element-plus'
    
    const table = ref('order')
    const dialogFormVisible = ref(false)
    const dialogConfirm = ref(false)
    const dialogExport = ref(false)
    const confirmData = reactive({type:0,title:'',order:0})
    const tableData = ref<DataList>()
    const collectionData = ref()
    const currentCollectionIndex = ref(0)
    const formLabelWidth = ref(180)
    const form = reactive({id:0,type:'',uid:'',collection_id:'',goods_id:'',count:1,amount:0,remark:'test'}) 
    const formSearch = reactive({keyword:'',page:1,pagesize:10})
    const formExport = reactive({field:['OrderCode','GoodsID','StockCode','IssuerID','CreatorID','UserID','SourceOrder','TotalFee','Status'],type:0,is_blind:0,start_time:'',end_time:'',orderby:1})
    const exportField = ref([{title:'订单编号',value:'OrderCode',checked:true},{title:'藏品ID',value:'GoodsID',checked:true},{title:'库存编号',value:'StockCode',checked:true},{title:'发行方',value:'IssuerID',checked:true},{title:'创作者',value:'Creator',checked:true},{title:'购买者',value:'UserID',checked:true},{title:'来源订单',value:'SourceOrder',checked:true},{title:'订单金额',value:'TotalFee',checked:true},{title:'状态',value:'Status',checked:true}])
    const fields = ref([])
    const fileList = ref<UploadUserFile[]>([])
    const uploadAction = ref(import.meta.env.VITE_API_BASEURL+'upload')

    onMounted(async () => {
        await Order.show(formSearch).then((res)=>{
            tableData.value = JSON.parse(JSON.stringify(res.data.data))
        })
        await Collection.get().then((res)=>{
            collectionData.value = JSON.parse(JSON.stringify(res.data.data))
            console.log(collectionData.value)
        })
    })

    const changeCollectionIndex = (id:number) => {
        collectionData.value.forEach((item:any,index:any)=>{
            if(item.id == id){
                currentCollectionIndex.value = index
            }
        })
    }

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

    const getChain = (operation_id:string) => {
        Order.schain(operation_id).then((res)=>{
            console.log(res)
            if(res.data.code === 0){
                ElMessage('链地址获取成功')
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
        })
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

    const changeExportField = (e:any) => {
        console.log(e)
        formExport.field = []
        exportField.value.forEach((item,index) => {
            exportField.value[index].checked = !exportField.value[index].checked
            if(e.indexOf(item.title) != -1){
                console.log(item.title)
                formExport.field.push(String(item.value))
            }
        })
        fields.value = JSON.parse(JSON.stringify(formExport.field))
        // formExport.field = field
    }

    const submitExport = () => {
        ElLoading.service()
        Order.exports(formExport).then((res)=>{
            console.log(res)
            if(res.data.code === 0){
                ElLoading.service().close()
                ElMessage('订单信息导出成功')
                setTimeout(()=>{
                    dialogExport.value = false
                    let url = JSON.parse(JSON.stringify(res.data.data)).file
                    window.location.href = url
                },1000)
            }else{
                ElMessage(res.data.msg)
                return false
            }
        }).catch((res)=>{
            console.log(res)
        })
    }

    const submit = () => {
        Order.save(form).then((res)=>{
            if(res.data.code === 0){
                ElMessage(form.id?'修改成功':'创建成功')
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
                <el-link>全部订单管理</el-link>
            </div>
            <div>
                <el-button type="primary" plain @click="add(table)">测试下单</el-button>
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
                        <span v-html="scope.row[item.map]" v-else-if="item.type == 'hash'" @click="getChain(scope.row.operation_id)"></span>
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
            <element-button-group :items="[]" @exports="dialogExport = true" />
            <el-pagination v-model:currentPage="formSearch.page" v-model:page-size="formSearch.pagesize" background layout="total,sizes,prev, pager, next" :total="tableData?.rows" @size-change="changePagesize" @current-change="changePage" />
        </div>
    </el-container>

    <el-dialog v-model="dialogFormVisible" :title="form.id? '修改订单' : '新增订单'">
        <el-form size="large" :model="form" :label-width="formLabelWidth">
            <el-form-item label="订单类型">
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
            </el-form-item>
            <el-form-item label="用户ID">
                <el-col :span="12">
                    <el-input v-model="form.uid" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="藏品集">
                <el-col :span="12">
                    <el-select v-model="form.collection_id" placeholder="选择藏品集" @change="changeCollectionIndex">
                        <el-option :label="item.title" :value="item.id" v-for="item in collectionData" :key="item.id" />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="藏品">
                <el-col :span="12">
                    <el-select v-model="form.goods_id" placeholder="选择藏品">
                        <el-option :label="item.title" :value="item.id" v-for="item in collectionData[currentCollectionIndex].detail" :key="item.id" />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="备注">
                <el-col :span="12">
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

    <!-- 导出 表单 -->
    <el-dialog v-model="dialogExport" title="导出订单列表">
        <el-form size="large" :model="form" :label-width="formLabelWidth">
            <el-form-item label="导出字段">
                <el-col :span="22">
                    <el-checkbox-group @change="changeExportField">
                        <el-checkbox :label="item.title" v-for="(item,index) in exportField" :key="index" :checked="item.checked" />
                    </el-checkbox-group>
                </el-col>
            </el-form-item>
            <el-form-item label="订单类型">
                <el-col :span="13">
                    <el-radio-group v-model="formExport.type">
                        <el-radio :label="0">全部</el-radio>
                        <el-radio :label="1">一级市场</el-radio>
                        <el-radio :label="3">空投</el-radio>
                        <el-radio :label="4">转赠</el-radio>
                        <el-radio :label="5">二级市场</el-radio>
                    </el-radio-group>
                </el-col>
            </el-form-item>
            <el-form-item label="藏品/盲盒">
                <el-col :span="13">
                    <el-radio-group v-model="formExport.is_blind">
                        <el-radio :label="0">全部</el-radio>
                        <el-radio :label="1">藏品</el-radio>
                        <el-radio :label="2">盲盒</el-radio>
                    </el-radio-group>
                </el-col>
            </el-form-item>
            <el-form-item label="下单日期">
                <el-col :span="6">
                    <el-date-picker v-model="formExport.start_time" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="开始时间" style="width:100%" />
                </el-col>
                <el-col :span="1" class="text-center">-</el-col>
                <el-col :span="6">
                    <el-date-picker v-model="formExport.end_time" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="结束时间" style="width:100%" />
                </el-col>
            </el-form-item>
            <el-form-item label="排序方式">
                <el-col :span="13">
                    <el-radio-group v-model="formExport.orderby">
                        <el-radio :label="1">升序</el-radio>
                        <el-radio :label="2">降序</el-radio>
                    </el-radio-group>
                </el-col>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogExport = false">取消</el-button>
                <el-button type="primary" @click="submitExport" class="bg-blue-400">确认导出</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style lang="scss" scoped>

</style>