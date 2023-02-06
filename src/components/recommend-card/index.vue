<template>
<div class="flex items-center justify-between w-full h-full select-none">
    <div class="relative daily-background rounded-2xl overflow-hidden background-Animation" 
    style="width: 48%;height: 200px;"
    >
        <div class=" absolute flex flex-wrap justify-between content-between font-semibold text-6xl text-white" 
        style="width: 138px;height: 138px;left: 40px;top: 50%;transform: translateY(-50%);"
        >  
            <span>每</span>
            <span>日</span>
            <span>推</span>
            <span>荐</span>
        </div>
    </div>
    <div class="relative daily-background rounded-2xl overflow-hidden" style="width: 48%;height: 200px;background-image:linear-gradient(0deg,#a18cd1 0%, #fbc2eb 100%)">
        <div class="absolute rounded-2xl overflow-hidden " style="width: 166px;height: 166px;left: 20px;top: 50%;transform: translateY(-50%);">
            <img style="width: 166px;height: 166px" src="" alt="">
        </div>
        <div class=" absolute text-white " style="left: 200px;top: 20px;">
            <p class="text-2xl font-bold">{{ fmList.values.name }}</p>
            <p class="text-lg font-bold mt-4">{{ }}</p>
            <div class="bg-green-400 w-4 h-4 mt-10">

            </div>
        </div>
        <div class="text-white font-bold absolute" style="right: 8%;bottom: 20px;opacity: 0.3;">
            <span>私人FM</span>
        </div>
    </div>
</div>
</template>

<script setup lang='ts'>
import {personalizedListApi,personalFmApi} from"@/request/api/Recommended"
import { onMounted,ref,reactive } from "vue"
const fmList:any = reactive([] as any[])
onMounted(async () => {
    const { data: songListRes } = await personalizedListApi()
    console.log("songlist",songListRes)
    const { data: fmListRes } = await personalFmApi()
    console.log("FMres",fmListRes.data)
    fmList.values = fmListRes.data[0]
    console.log("FM",fmList)
})
</script>

<style scoped>
.background-Animation{
    background:url('https://p2.music.126.net/QxJA2mr4hhb9DZyucIOIQw==/109951165422200291.jpg?param=1024y1024');
    background-position-y: 0%;
    animation: backMove 350s linear infinite;
}
@keyframes backMove{
    50% {
        background-position-y: 100%;
    }
}
</style>