<template>
    <el-button type="primary" style="margin-bottom: 20px;" @click="dialogVisible = true">登录QQ号</el-button>
    <el-table :data="QQBots" border style="width: 100%" >

        <el-table-column prop="qq" label="QQ账号" />
        <el-table-column prop="online" label="状态" >
            <template #default="scope">
                <el-tag
                    :key="scope.row.online"
                    effect="dark"
                    :type="scope.row.online ? 'success' : 'warning'"
                >
                    {{scope.row.online ? '在线' : '登陆中'}}
                </el-tag>

            </template>
        </el-table-column>

        <el-table-column prop="group" label="群数量" />
        <el-table-column prop="friend" label="好友数量"/>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button type="danger" v-if="scope.row.online" @click="exitQQBotImpl(scope.row.qq)">注销</el-button>
                <el-button type="info" @click="goLog(scope.row.qq)" v-if="scope.row.online">日志</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog
        v-model="dialogVisible"
        destroy-on-close
        title="Tips"
        width="30%"
        :close-on-click-modal="false"
        @close="exitLogin"
    >
        <div v-loading="loading">
            <el-row >
                <el-col :span="19">
                    <el-input :disabled="QQDisable" v-model="QQ" placeholder="QQ账号" />
                </el-col>
                <el-col :span="4">
                    <el-button :disabled="QQDisable" style="margin-left: 10px" type="success" @click="loginQQ(QQ)">扫码登录</el-button>
                </el-col>
            </el-row>
            <div  v-loading="loadingCode" style="text-align: center">
                <img style="text-align: center" :src="url"  alt=""/>
            </div>
        </div>




        <template #title>
            登录
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import app from "@/App.vue";
import axios from "axios";
import {getCurrentInstance, inject, Ref, ref, UnwrapRef} from "vue";
import Api from "@/api/Api";
import {Base64} from "js-base64";
import {ElMessage} from "element-plus";
import App from "@/App.vue";
import {Vue} from "vue-class-component";
import {RouteLocationRaw, useRouter} from "vue-router";

const router = useRouter()
const dialogVisible = ref(false)
let QQBots:any = ref([]);
let QQ = ref("");
let socket;
let url = ref('')
let loading = ref(false)
let loadingCode= ref(false)
let QQDisable = ref(false)
const $botLog = inject("botLog")

function goLog(qq){
  const data: RouteLocationRaw = {
    path: "/log/"+qq,
  }
  router.push(data)
}

function getBotsImpl(){
    Api.getQQBots().then(e=>{
        QQBots.value = e.data.data
    }).catch(e=>{
        console.log(e)
    })
}
function getQRCodeImpl(){
    Api.getQRCode(QQ.value).then(e=>{
        url.value = window.URL.createObjectURL(e.data)
        ElMessage({
            type: 'success',
            message: '二维码获取成功'
        })
    })
}

function exitQQBotImpl(qq:string){
    Api.exitQQBot(qq).then(e=>{
        getBotsImpl()
        closeLog(qq)
        console.log(e)
        ElMessage({
            type: 'success',
            message: "退出成功"
        })
    }).catch(e=>{
        ElMessage({
            type: 'error',
            message: e.message
        })
    })
}

function closeLog(qq){
    $botLog[qq].socket.close()
}



function loginQQ(qq:string){
    if (QQ.value == ''){
        ElMessage({
            type: 'error',
            message: "QQ账号不能为空"
        })
        return;
    }
    socket = new WebSocket("ws://localhost:8081/loginSocket/"+qq);
    loading.value = true
    socket.onmessage = msg =>{
        switch (msg.data) {

            case "开始验证":
                loading.value = false
                loadingCode.value = false
                QQDisable.value = true
                getBotsImpl()
                getQRCodeImpl()
                break;
            case "登录成功":
                ElMessage({
                    type: "success",
                    message: "登录成功"
                })
                getBotsImpl()

                exitLogin(true)
                break;
            case "扫码成功":
                loadingCode.value = false
                loading.value = true
                break;
            case "确认中":
                loadingCode.value = true
                break;
            case "取消扫码":
                loadingCode.value = false
                loading.value = false
                getQRCodeImpl()
                break;
            case "扫码过期":
                loadingCode.value = false
                loading.value = false
                break;
            case "重复登录":
                socket.close()
                ElMessage({
                    type: "error",
                    message: "此账号已经登录"
                })
                exitLogin()
                break;
        }
    }
    socket.onopen = () => {
        QQDisable.value = true
    }
}
function exitLogin(flag = false){

    QQDisable.value = false
    loading.value = false
    dialogVisible.value = false
    if (socket instanceof WebSocket){
        if (!flag){
            socket.close()
        }

    }
    QQ.value = ''
    url.value = ''
    getBotsImpl()
}
getBotsImpl()



</script>

<style >

</style>
