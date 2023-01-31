<template>
    <div class=" fixed top-0 w-full h-16 bg-white z-10 header">
        <div class="relative w-full h-full flex items-center">
            <SvgIcon @click="router.back()" iconClass="back" class="icon-Box absolute cursor-pointer rounded-lg"
                style="left: 10%;" />
            <SvgIcon @click="router.forward()" iconClass="front" class="icon-Box absolute cursor-pointer rounded-lg"
                style="left: 15%;" />
            <div @click="router.push({ path: '/login' })"
                class="absolute rounded-full overflow-hidden w-8 cursor-pointer select-none" style="right: 18%;">
                <img src="http://p1.music.126.net/axewGX7u9P9Iuqjep-3mmQ==/109951165601796681.jpg" alt="">
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style scoped>
.header {
    border-bottom: 2px solid var(--primary-color);
}

.icon-Box {
    transition: all 125ms ease-out;
    color: var(--primary-color);
}

.icon-Box:hover {
    color: white;
    background-color: var(--primary-color);
}
</style>