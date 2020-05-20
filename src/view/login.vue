<template>
    <div class="lgbox">
        <div class="title"><img src="../assets/logo.png" alt="" style="width:100%"></div>
        <div class="title">账号密码登陆</div>
        <div class="tel"><el-input v-model="name" placeholder="请输入用户名" ></el-input></div>
        <div class="tel"><el-input v-model="phone" placeholder="请输入账号" :maxlength=11 :minlength=8></el-input></div>
        <div class="pwd"><el-input placeholder="请输入密码" v-model="password" show-password :maxlength=16 :minlength=8></el-input></div>
        <div class="btn">
            <el-button type="primary" size="mini" @click="goLogin">登陆</el-button>
            <el-button type="primary" size="mini" @click="goReg">注册</el-button>
        </div>
    </div>
</template>
<script>
import Server from "@/server/api.js"
export default {
    data(){
        return{
            password:"",
            phone:"",
            name:""
        }
    },
    methods:{
        goLogin(){
            if(this.name == ""){
                this.$message({
                    message: '请输入用户名',
                    type: 'error'
                });
                return ;
            }else if(this.phone == ""){
                this.$message({
                    message: '请输入账号',
                    type: 'error'
                });
                return ;
            }else if(this.password == ""){
                this.$message({
                    message: '请输入密码',
                    type: 'error'
                });
                return ;
            }
            let params = {
                name:this.name,
                phone:this.phone,
                password:this.password
            }
            Server.goLogin(params).then(res=>{
                localStorage.setItem("CHUSER",JSON.stringify(res))
                this.$store.commit("updateUserInfo",res)
                if(res.status == 1){
                    this.$router.push({path:"/index"})
                }else{
                    this.$message({
                        message: '请输入用户名、账号或密码有误，请重新输入',
                        type: 'error'
                    });
                }
            }).catch(err=>{
                this.$message({
                    message: '请输入用户名、账号或密码有误，请重新输入',
                    type: 'error'
                });
            })
        },
        goReg(){
            if(this.name == ""){
                this.$message({
                    message: '请输入用户名',
                    type: 'error'
                });
                return ;
            }else if(this.phone == ""){
                this.$message({
                    message: '请输入账号',
                    type: 'error'
                });
                return ;
            }else if(this.password == ""){
                this.$message({
                    message: '请输入密码',
                    type: 'error'
                });
                return ;
            }
            let params = {
                name:this.name,
                phone:this.phone,
                password:this.password
            }
            Server.goReg(params).then(res=>{
                if(res.status == 1){
                    this.$message({
                        message: '注册成功',
                        type: 'success'
                    });
                }else{
                    this.$message({
                        message: '注册失败',
                        type: 'error'
                    });
                }
            }).catch(err=>{
                this.$message({
                    message: '注册失败',
                    type: 'error'
                });
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .lgbox{
        width: 200px;
        margin: 0 auto;
        padding-top:100px;
        .title,.tel,.pwd{
            margin:10px auto ;
        }
        .title{
            margin:20px 0 10px 0;
        }
    }
</style>