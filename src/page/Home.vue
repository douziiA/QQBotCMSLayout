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
            <el-row>
                <el-col :span="19">
                    <el-input v-model="QQ" placeholder="QQ账号" />
                </el-col>
                <el-col :span="4">
                    <el-button style="margin-left: 20px" type="success" @click="loginQQ(QQ)">登录</el-button>
                </el-col>
            </el-row>
            <img style="text-align: center" :src="url"  alt=""/>



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
let url = ref('');
let timer1;
function getBotsImpl(){
    Api.getQQBots().then(e=>{
        QQBots.value = e.data.data
        setTimeout(function (){
            getBotsImpl()
        },2000)
    }).catch(()=>{
        setTimeout(function (){
            getBotsImpl()
        },2000)
    })
}
function getQRCodeImpl(){
    timer1 = setInterval(function (){
       Api.getQRCode(QQ.value).then(e=>{
           url.value = window.URL.createObjectURL(e.data)
       })
    },500)
}

function loginQQ(qq:string){
    socket = new WebSocket("ws://localhost:8081/loginSocket/"+qq);
    socket.onmessage = msg =>{
        switch (msg.data) {
            case "开始验证":
                getQRCodeImpl()
                break;
            case "登录成功":
                console.log(111)
                exitLogin()
                break;
        }
    }
}
function exitLogin(){
    if (socket instanceof WebSocket){
        socket.close()
    }
    QQ.value = ''
    url.value = ''
    dialogVisible.value = true
    clearInterval(timer1)
}
getBotsImpl()



</script>

<style >

</style>