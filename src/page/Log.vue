
<template>
  <el-scrollbar height="85vh">
      <el-main v-html="log" class="log"></el-main>
  </el-scrollbar>
</template>

<style scoped>
  .el-scrollbar{
      width: 100%;
      border: 1px solid #ccc;
  }
  .log{
      line-height: 30px;
      white-space: pre-wrap;
  }
</style>
<script lang="ts" setup>
import {ref, watch} from "vue";
  import Api from "@/api/Api";
import {onBeforeRouteLeave, onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import App from "@/App.vue";
  let timer;
  const flag = ref(true);
  const log = ref('')

  function getLogImpl(){
      Api.getLog(2507274689).then(e=>{
          log.value = e.data.data
      }).catch(()=>{

      }).finally(()=>{
          timer = setTimeout(()=>{
              if (flag.value){
                  getLogImpl()
              }else{
                  clearTimeout(timer)
              }
          },500)
      })
  }

  onBeforeRouteLeave(()=>{
      flag.value = false
  })
  getLogImpl()
</script>