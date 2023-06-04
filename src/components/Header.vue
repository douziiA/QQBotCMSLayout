<template>
    <el-page-header :icon="null">
        <template #title>
            <span>BotCMS</span>
        </template>
        <template #content>
            <span class="text-large font-600 mr-3"> {{title}} </span>
        </template>
        <span></span>
    </el-page-header>
</template>

<script lang="ts" setup>
    import {useRouter} from "vue-router";

    const path = useRouter().currentRoute.value.fullPath;
    const title = useRouter().getRoutes().findLast(value => {
        return value.path == path
    }).name
</script>



<style scoped>
  .el-page-header{

  }
</style>