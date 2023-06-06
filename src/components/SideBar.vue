<template>
    <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            text-color="#fff"
            :default-active="currentPath"
            :key="currentPath"
            :router="true"
    >
        <el-menu-item :key="k" v-for="(v,k) in routes"   :route="v" :index="v.path">
            <el-icon><component :is="v.meta.icon"></component></el-icon>
            <span>{{v.meta.title}}</span>
        </el-menu-item>
    </el-menu>

</template>

<script setup lang="ts">
import {RouteRecord, useRoute, useRouter} from "vue-router";
import App from "@/App.vue";

const routes:RouteRecord[]= useRouter().getRoutes().filter(value => {
    return !value.meta.hidden
});
const currentPath: any = useRouter().currentRoute.value.path;

</script>

<style scoped>

  .el-menu{
      height: 100vh;
  }

</style>
