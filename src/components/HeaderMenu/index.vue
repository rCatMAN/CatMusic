<script setup lang='ts'>
import {useRouter} from 'vue-router'
const router = useRouter()
const toPage = ()=>{
    router.push({
        path:'/login'
    })
}
</script>

<template>
<div class=" fixed top-0 w-full h-16 bg-white z-10 Header">
    <div class="relative w-full h-full bg-red-300 flex items-center">
        <div @click="toPage" class="absolute rounded-full overflow-hidden w-8 cursor-pointer select-none" style="right: 18%;">
            <img src="http://p1.music.126.net/axewGX7u9P9Iuqjep-3mmQ==/109951165601796681.jpg" alt="">
        </div>
    </div>
</div>
</template>

<style scoped>
.Header{
    border-bottom: 2px solid var(--primary-color);
}
</style>