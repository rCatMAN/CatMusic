<template>
    <div class="flex items-center flex-col justify-around mt-8 menu-Box">
        <div v-for="(item, index) in routerMenuList" :key="index" @click="toPage(item.path)"
            class="router-button-box w-3/4 h-9 rounded-xl cursor-pointer flex items-center justify-center text-sm"
            :class="route.path === item.path ? 'router-button-box-down' : ''">
            <span class="font-bold">{{ item.name }}</span>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useRouter, useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()
const routerMenuList = [
    {
        path: "/musichall",
        name: "探索音乐",
    },
    {
        path: "/newsong",
        name: "新潮"
    },
    {
        path: "/radios",
        name: "电台",
    },
    {
        path: "/videos",
        name: "视频",
    }

]
const toPage = (path: string) => {
    router.push({
        path: path
    })
}
</script>

<style scoped>
.menu-Box {
    height: 230px
}

.router-button-box {
    user-select: none;
    transition-property: all;
    transition-timing-function: ease-out;
    transition-duration: 150ms;
    border-radius: 10px;

}

.router-button-box:hover {
    transition-property: all;
    transition-timing-function: ease-out;
    transition-duration: 150ms;
    color: white;
    box-shadow: none;
    background-color: var(--primary-back-color);
}

.router-button-box-down {
    transition-property: all;
    transition-timing-function: ease-out;
    transition-duration: 150ms;
    color: white;
    box-shadow: var(--primary-back-color) 0px 0px 15px 0px;
    background-color: var(--primary-back-color);
}

.router-button-box:active {
    transform: scale(0.86);
}
</style>
