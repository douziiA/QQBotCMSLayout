
<template>
  <el-scrollbar height="85vh">
      <div v-html="log" :key="log" class="log el-main"></div>
  </el-scrollbar>
</template>

<style scoped>
  .el-scrollbar{
      width: 100%;
      border: 1px solid #ccc;
  }
  .log>>>.logDetail{
    width: 100%;
      line-height: 30px;
      white-space: pre-wrap;
    padding-top: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #e4e7ed;
  }
  .log>>>.logDetail *{
    vertical-align: middle;
  }
  .log>>>.logTime{
    font-size: 14px;
    color: dodgerblue;
    margin-right: 10px;
  }
  .log>>>.el-avatar{
    margin: 0 10px;
  }
  .el-avatar>img {
    display: block;
    height: 100%;
  }
</style>
<script lang="ts" setup>
import {reactive, ref, watch} from "vue";
  import Api from "@/api/Api";
import {onBeforeRouteLeave, onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import App from "@/App.vue";
  let timer;
  const flag = ref(true);
  const log = ref('')
  const obj = reactive({
    a: 1,
    b: 1
  })
  const qq = useRoute().params.qq
  const socket = new WebSocket("ws://localhost:8081/logSocket/"+qq);
  socket.onmessage = msg => {
      getLogImpl()
  }


function getLogImpl(){
      Api.getLog(qq).then(e=>{
          log.value = e.data.data
      }).catch(()=>{

      })
  }

  onBeforeRouteLeave(()=>{
      flag.value = false
      socket.close()
  })
  getLogImpl()
</script>
