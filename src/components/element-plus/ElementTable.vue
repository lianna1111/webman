<script setup lang="ts">
    import { ref,onMounted } from 'vue'
    import router from '@/router'
    import { DataList,MapData } from '@/util/interface'

    const space = ref('&nbsp;&nbsp;&nbsp;&nbsp;')

    const props = withDefaults(defineProps<{
       data: DataList
    }>(),{
        
    })

    const emit = defineEmits(['select','add','del','mod'])

    const handleSelectionChange = () => { emit('select') }

    const add = (table:string,id:number) => { emit('add',table,id) }

    const mod = (table:string,id:number) => { emit('mod',table,id) }

    const del = (table:string,id:number) => { emit('del',table,id) }
</script>

<template>
    <!-- {{data?.data}} -->
    <el-table ref="multipleTableRef" stripe size="large" :data="data?.data" class-name="table-demo" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <template v-for="item in data?.thead" :key="item.id">
            <el-table-column :property="item.map" :label="item.title" :width="item.width>0?item.width:''" v-if="item.map != 'title'" />
            <el-table-column :label="item.title" :width="item.width>0?item.width:''" v-else>
                <template #default="scope">
                    <span v-html="space.repeat(scope.row.level-1) + scope.row.title + '[+]'" v-if='scope.row.level < 3'  class="cursor-pointer" @click="add(data.table,scope.row.id)" />
                    <span v-html="space.repeat(scope.row.level) + scope.row.title" v-else class="cursor-pointer" />
                </template>
            </el-table-column>
        </template>
        <el-table-column label="修改">
            <template #default="scope">
                <el-icon :size="16" @click="mod(data.table,scope.row.id)"><Edit /></el-icon>
            </template>
        </el-table-column>
        <el-table-column label="删除">
            <template #default="scope">
                <el-icon :size="16" @click="del(data.table,scope.row.id)"><Delete /></el-icon>
            </template>
        </el-table-column>
    </el-table>
</template>

<style lang="scss" scoped>

</style>