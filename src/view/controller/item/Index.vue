<script setup lang="ts">
    import { ref,onMounted } from 'vue'
    import { DataList } from '@/util/interface';
    import Item from '@/api/Item'

    const tableData = ref<DataList>()

    onMounted(async () => {
        // await Item.show().then((res)=>{
        //     tableData.value = JSON.parse(JSON.stringify(res.data.data))
        // })
    })
</script>

<template>
    <template-test :data="tableData"></template-test>
</template>

<style lang="scss" scoped>

</style>