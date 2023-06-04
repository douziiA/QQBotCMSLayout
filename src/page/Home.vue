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
    </el-table>
    <el-dialog
        v-model="dialogVisible"
        title="Tips"
        width="30%"
       @close="exitLogin"
    >
        <div v-loading="loading">
            <el-row >
                <el-col :span="19">
                    <el-input :disabled="QQDisable" v-model="QQ" placeholder="QQ账号" />
                </el-col>
                <el-col :span="4">
                    <el-button :disabled="QQDisable" style="margin-left: 20px" type="success" @click="loginQQ(QQ)">登录</el-button>
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
import {Ref, ref, UnwrapRef} from "vue";
import Api from "@/api/Api";
import {Base64} from "js-base64";

const dialogVisible = ref(false)
let QQBots:any = ref([]);
let QQ = ref("");
let socket;
let url = ref('')
let loading = ref(false)
let loadingCode= ref(false)
let QQDisable = ref(false)
function getBotsImpl(){
    Api.getQQBots().then(e=>{
        QQBots.value = e.data.data
    }).catch(()=>{
        console.log("服务器未连接")
    }).finally(()=>{
        setTimeout(function (){
            getBotsImpl()
        },2000)
    })
}
function getQRCodeImpl(){
    Api.getQRCode(QQ.value).then(e=>{
        url.value = window.URL.createObjectURL(e.data)
    })
}

function loginQQ(qq:string){
    socket = new WebSocket("ws://localhost:8081/loginSocket/"+qq);
    loading.value = true
    socket.onmessage = msg =>{
        switch (msg.data) {
            case "开始验证":
                loading.value = false
                loadingCode.value = false
                QQDisable.value = true
                getQRCodeImpl()
                break;
            case "登录成功":
                exitLogin()
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
                getQRCodeImpl()
                break;
        }
    }
    socket.onopen = () => {
        QQDisable.value = true
    }
}
function exitLogin(){
    QQDisable.value = false
    loading.value = false
    dialogVisible.value = false

    QQ.value = ''
    url.value = ''
}
getBotsImpl()



</script>

<style >

</style>