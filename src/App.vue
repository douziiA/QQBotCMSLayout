<template>
    <el-row>
        <el-col class="el-aside" :span="4">
            <side-bar :key="$route"></side-bar>
        </el-col>
        <el-col class="el-main" :span="20">

            <el-header>
                <page-header :key="$route"></page-header>
            </el-header>
            <el-main>
                <RouterView></RouterView>
            </el-main>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
// import HelloWorld from './components/HelloWorld.vue'
import SideBar from "@/components/SideBar.vue";
import PageHeader from "./components/Header.vue";

// console.log(this)
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>
