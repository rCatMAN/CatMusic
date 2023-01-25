<template>
    <div class="bg-white w-full h-full select-none relative">
        <SvgIcon @click="backPage" iconClass="back" class="icon-color text-black absolute cursor-pointer"
            style="left: 5%;top:5%;" />
        <div class="flex items-center justify-between" style="height: 100%;margin-right: 17%;margin-left: 17%;">
            <div class="title relative ">
                <div class="background" style="width: 430px;height: 200px;">
                </div>
                <div class="title-text absolute font-black text-5xl w-full ml-8">
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
                <div class="switch-login-mode absolute flex items-center justify-center cursor-pointer">
                    <span class="font-semibold text-xs">Switch LoginMode</span>
                </div>
                <div class=" mt-12 relative">
                    <input v-model="phoneNum" class="select-text" type="text" id="phone">
                    <label for="phone" class="absolute text-gray-500 font-bold text-sm cursor-text duration-150"
                        style="left: 10%;transform: translateY(-50%);"
                        :style="{ top: phoneNum ? '-30%' : '50%' }">Phone</label>
                    <div v-show="loginMode === 0"
                        class="send-code-button absolute flex items-center justify-center cursor-pointer">
                        <span class="font-semibold text-xs">Send Code</span>
                    </div>
                </div>
                <div class=" mt-8 relative">
                    <input v-model="passWord" class="select-text" type="password" id="password">
                    <label for="password" class="absolute text-gray-500 font-bold text-sm cursor-text duration-150"
                        style="left: 10%;transform: translateY(-50%);"
                        :style="{ top: passWord ? '-30%' : '50%' }">PassWord</label>
                </div>
                <div @click="Login(passWord, phoneNum)"
                    class="login-button flex items-center justify-center cursor-pointer mt-16" style="">
                    <span class="font-semibold">Sign In</span>
                </div>
                <div class="options mt-12" style="width: 300px;">
                    <div
                        class="separator relative w-full flex items-center justify-center text-sm font-extralight text-gray-500">
                        <span>or continue with</span>
                    </div>
                    <div class="mt-8 flex items-center justify-around" style="width: 300px;">
                        <div class="icon-box">
                            <SvgIcon iconClass="vx" />
                        </div>
                        <div class="icon-box">
                            <SvgIcon iconClass="qq" />
                        </div>
                        <div class="icon-box">
                            <SvgIcon iconClass="sina" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import './style.css'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { PhoneLoginApi } from '@/request/api';
const router = useRouter()
let phoneNum = ref<string>()
let passWord = ref<number>()
let loginMode = ref<number>(0)
const Login = (password: number | undefined, phone: string | undefined) => {
    if (!password || !phone) {
        alert("密码不能空")
    } else {
        PhoneLoginApi(password, phone).then((res) => {
            console.log("api", res)
        })
    }
}
const backPage = () => {
    router.back()
}
</script>

<style scoped>

</style>
