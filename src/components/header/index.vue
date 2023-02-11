<template>
    <div class=" fixed top-0 w-full h-16 bg-white z-10 header">
        <div class="relative w-full h-full flex items-center">
            <SvgIcon @click="router.back()" iconClass="back" class="icon-Box absolute cursor-pointer rounded-lg"
                style="left: 10%;" />
            <SvgIcon @click="router.forward()" iconClass="front" class="icon-Box absolute cursor-pointer rounded-lg"
                style="left: 15%;" />
            <div @focusin="selectedIndex = 1" @focusout="selectedIndex = 0"
                class=" absolute w-52 h-8 rounded-lg duration-200"
                style="right:16%;background-color: rgba(209,209,214,0.28)">
                <div class="flex items-center">
                    <SvgIcon iconClass="search" class="ml-2 duration-200" style="width: 20px;" :style="{
                        color: selectedIndex === 1 ? 'var(--primary-text-color)' : '',
                    }" />
                    <input @keyup.enter="toSearchPage(keyWords)" v-model="keyWords" type="text" name="" id=""
                        class="search-input text-sm font-bold duration-200" :style="{
                            color: selectedIndex === 1 ? 'var(--primary-text-color)' : '',
                        }">
                </div>
            </div>
            <div @mouseenter="enterIndex = 1" @mouseleave="enterIndex = 0" v-if="isLogin"
                class="absolute z-10 flex items-center duration-300 ease-out" style="right: 11%;" :style="{
                    scale: enterIndex ? '2.5' : '1',
                    transform: enterIndex ? 'translate(-15%, 40%)' : ''
                }">
                <div class=" rounded-full overflow-hidden w-8 cursor-pointer select-none">
                    <img :src="userProfile.avatarUrl" alt="">
                </div>
            </div>
            <div v-if="isLogin" v-show="enterIndex" @mouseenter="enterIndex = 1" @mouseleave="enterIndex = 0"
                class="absolute duration-300 ease-out rounded-2xl bg-white"
                style="width: 300px;padding: 14px;right: 11%;top: 68px;transform: translateX(41%);box-shadow: 0 10px 20px -10px #6b7280;"
                :style="{
                
                }">
                <div class="flex flex-col items-center justify-center mt-8 cursor-default">
                    <span>{{ userProfile.nickname }}</span>
                    <div class="mt-4 bg-gray-300" style="width: 80%;height: 1px;">
                    </div>
                    <div @click="signOut" class="theme-button mt-4 cursor-pointer">
                        <span class="mx-8">退出登录</span>
                    </div>
                </div>
            </div>
            <div v-if="!isLogin" @click="router.push({ path: '/login' })" class=" absolute cursor-pointer"
                style="right: 11%;">
                <span>请登录</span>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router'
import { useUserStore } from "@/store/user-store/index"
const router = useRouter()
const store = useUserStore()
const keyWords = ref("")
const enterIndex = ref(0)
const selectedIndex = ref(0)
const isLogin = computed(() => {
    console.log("更新islogin", store.isLogin)
    return store.isLogin
})
const userProfile = computed<any>(() => {
    console.log("userProfile更新", store.userProfile)
    return store.userProfile
})
const toSearchPage = (k: string) => {
    if (!(k === "")) {
        router.push({
            path: '/search',
            query: {
                keywords: k
            }
        })
    }
}
onMounted(() => {
    store.setLoginStatus()
})
const signOut = async () => {
    await store.signOut()
    store.setLoginStatus()
}
</script>

<style scoped>
.header {
    z-index: 100;

    backdrop-filter: saturate(200%) blur(10px);
    background-color: hsla(0, 0%, 100%, 0.86);

}

.search-input {
    width: 100%;
    border-radius: 10px;
    padding-left: 8px;
    padding-top: 5px;
    padding-bottom: 5px;
    outline: none;
    background-color: rgba(250, 235, 215, 0.185);
}

.icon-Box {
    transition: all 125ms ease-out;
    color: var(--primary-back-color);
}

.icon-Box:hover {
    color: white;
    background-color: var(--primary-back-color);
}
</style>