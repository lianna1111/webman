<script setup lang="ts">
    import { useRoute } from 'vue-router';

    const route = useRoute()
    // console.log(route.params.id)
    console.log(route.query)

</script>

<template>
    view controller news detail show
</template>

<style lang="scss" scoped>

</style>