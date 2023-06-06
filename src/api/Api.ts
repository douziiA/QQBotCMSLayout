import axios from "axios";

export default {
    ip:"http://localhost:8081",
    getQQBots() {
        return axios.get(this.ip+'/bot')
    },
    getQRCode(qq:any){
        return axios.get(this.ip+'/bot/code?qq='+qq.toString(),{
            responseType: 'blob'
        })

    },
    exitQQBot(qq:any){
        return axios.delete(this.ip+'/bot?qq='+qq.toString())
    },
    getLog(qq:any){
        return axios.get(this.ip+'/log/'+qq.toString())
    }
}
