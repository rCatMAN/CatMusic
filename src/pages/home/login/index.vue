<template>
<div class="bg-white w-full h-full select-none relative">
    <SvgIcon @click="backPage" iconClass="back" class="iconColor text-black absolute cursor-pointer" style="left: 5%;top:5%;"/>
    <div class="flex items-center justify-between" style="height: 100%;margin-right: 17%;margin-left: 17%;" >
        <div class="title relative ">
            <div class="background" style="width: 430px;height: 200px;">
            </div>
            <div class="titleText absolute font-black text-5xl w-full ml-8">
                <h1>Sign In to</h1>
                <h1 class="mt-7">Open the World</h1>      
            </div>
            <div class="absolute font-extralight text-sm text-gray-500 ml-8">
                <h1>If you don't have an account</h1>
                <span>you can </span>
                <span class=" cursor-pointer" style="color: var(--primary-color);">Register here</span>
            </div>
        </div>
        <div class="form flex flex-col items-center relative top-7 rounded-3xl" style="width: 400px;height: 480px;">
            <div class=" mt-12 relative">
                <input v-model="phoneNum" class="select-text" type="text" id="phone">
                <label for="phone" class="absolute text-gray-500 font-bold text-sm cursor-text duration-150" style="left: 10%;transform: translateY(-50%);" :style="{top:phoneNum === ''? '50%' : '-30%' }">Phone</label>
                <div @click="clic" class="SendCodeButton absolute flex items-center justify-center cursor-pointer">
                    <span class="font-semibold text-xs">Send Code</span>
                </div>
            </div>
            <div class=" mt-8 relative">
                <input v-model="passWord" class="select-text" type="password" id="password">
                <label for="password" class="absolute text-gray-500 font-bold text-sm cursor-text duration-150" style="left: 10%;transform: translateY(-50%);" :style="{top:passWord === ''? '50%' : '-30%' }">PassWord</label>
            </div>
            <div  class="loginButton flex items-center justify-center cursor-pointer mt-16" style="">
                <span class="font-semibold">Sign In</span>
            </div>
            <div class="options mt-12" style="width: 300px;">
                <div class="separator relative w-full flex items-center justify-center text-sm font-extralight text-gray-500">
                    <span>or continue with</span>
                </div>
                <div class="mt-8 flex items-center justify-around" style="width: 300px;">
                    <div class="iconBox">
                        <SvgIcon iconClass="vx"/>
                    </div>
                    <div  class="iconBox">
                        <SvgIcon iconClass="qq"/>
                    </div>
                    <div  class="iconBox">
                        <SvgIcon iconClass="sina"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { LoginStatusApi } from '@/request/api';
const router = useRouter()
let phoneNum = ref<string>("")
let passWord = ref<string>("")
const clic = ()=>{
    let res = LoginStatusApi()
    console.log("api",res)
}
const backPage = ()=>{
    router.back()
}
</script>

<style scoped>
.background{
    z-index: -1;
    background-image:linear-gradient(0deg,#a18cd1 0%, #fbc2eb 100%);
    filter: blur(70px);
}
.iconColor:hover{
    color: var(--primary-color);
}
.titleText{
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.form input{
    width: 300px;
    height: 50px;
    border-radius: 14px;
    padding-left: 15px;
    padding-top: 15px;
    padding-bottom: 15px;
    outline-color: var(--primary-color);
    background-color: rgba(250, 235, 215, 0.185);
}
.SendCodeButton{
    width: 100px;
    height: 33px;
    top:15%;
    right: 10%;
    transition: all .2s;
    background-color: var(--primary-color);
    box-shadow: 0 20px 30px -10px var(--primary-color);
    border-radius: 14px;
}
.SendCodeButton:hover{
    box-shadow: 0 3px 30px 0 var(--primary-color);
}
.SendCodeButton:active{
    transform: scale(0.9);
}
.loginButton{
    width: 300px;
    height: 40px;
    transform: translateY(-50%);
    transition: all .2s;
    background-color: var(--primary-color);
    box-shadow: 0 20px 30px -10px var(--primary-color);
    border-radius: 14px;
}
.loginButton:hover{
    box-shadow: 0 3px 30px 0 var(--primary-color);
}
.loginButton:active{
    transform: scale(0.9);
}
.separator::before{
    content: "";
    position: absolute;
    top: 50%;
    height: 1px;
    width: 100%;
    background-color: hsla(220,9%,46%,.5);
    z-index: 1;
}
.separator span{
    background-color: white;
    padding-left: 10px;
    padding-right: 10px;
    z-index: 1;
}
.iconBox{
    transition-property: all;
    transition-timing-function: ease-out;
    transition-duration: .15s;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 11px;
    box-shadow: 0 10px 20px -10px #6b7280;
}
.iconBox:hover{
    transition-property: all;
    transition-timing-function: ease-in-out;
    transition-duration: .25s;
    box-shadow: none;
    color: white;
    background-color: var(--primary-color);
}
.iconBox:active{
    transform: scale(0.7);
}
</style>
