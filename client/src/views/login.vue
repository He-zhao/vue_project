<template>
    <div class="form_container">
        <div class="manage_tip">
            <span class="title">后台管理系统</span>
            <el-form 
            :model="loginUser" 
            status-icon
            :rules="rules"
            ref="loginForm"
            class="loginform"
            lable-width="80px"
            >
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="loginUser.email" placeholder="邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">登录</el-button>
                </el-form-item>
                <div class="info">
                    <p><router-link to="/register">注册</router-link></p>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
export default {
    name:'register',
    data() {
        return {
            loginUser:{
                email:'',
                password:''
            },
            rules:{
                email:[
                    {type:'email',required:true,message:'邮箱格式不正确',trigger:'blur'}
                ],
                password:[
                    {required:true,message:'密码不能为空',trigger:'blur'},
                    {min:6,max:30,message:'长度在6到30之间',trigger:'blur'}
                ]
            }
        }
    },
    methods: {
        submitForm(formName){
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    this.$axios.post('/api/users/login',this.loginUser).then(res=>{
                        console.log(res)
                        const {token} = res.data
                        localStorage.setItem('eleToken',token)
                        const decode = jwt_decode(token)
                        this.$store.dispatch('setAuthenticated',!this.isEmpty(decode))
                        this.$store.dispatch('setUser',decode)
                        this.$router.push('/index')                     
                    })
                }
            })
        },
        isEmpty(value){
        return(
            value === undefined || value === null||
            (typeof value === 'object' && Object.keys(value).length === 0)||
            (typeof value === 'string' && value.trim().length === 0)
            )
        }
    },
}
</script>

<style scoped>
.form_container {
  position: relative;
  width: 100%;
  height: 100%;
  /* background: url(../../assets/bg.jpg) no-repeat center center; */
  background-size: 100% 100%;
}
.manage_tip {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 50%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  margin-left: -185px;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}

.loginForm {
  margin-top: 20px;
  background-color: white;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccccc;
}
.submit_btn {
  width: 100%;
}
.info{
	float: right;
	font-size: 14px;
	color: #606266;
}
a{
	text-decoration: none;
}
</style>