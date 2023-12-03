<template>
    <el-table :data="plugins" border style="width: 100%" >

        <el-table-column prop="name" label="插件名称" />
        <el-table-column prop="version" label="插件版本" >
            <template #default="scope">
                {{scope.row.version.major}}.{{scope.row.version.minor}}.{{scope.row.version.patch}}
            </template>
        </el-table-column>

        <el-table-column prop="author" label="插件作者" />
        <el-table-column prop="info" label="插件简介" />
    </el-table>
</template>
<script lang="ts" setup>
    import {ref} from "vue";
    import Api from "@/api/Api";

    const plugins = ref([])
    const getPlugins = () => {
        Api.getPlugins().then(e=>{
            console.log(e)
            plugins.value = e.data.data
        })
    }
    getPlugins()
</script>

<style scoped>

</style>