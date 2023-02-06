<template>
    <div class="flex items-start justify-around w-full h-full" style="min-width: 500px;">
        <div @mouseenter="selectedIndex = index" @mouseleave="selectedIndex = 100" v-for="(item, index) in songList"
            :key="index" class="relative" style="width:18%">
            <div class="bg-red-500 w-16 h-16 absolute rounded-full play-Background" style="left:50%;top: 40%;transform: translate(-50%,-50%);filter: blur(10);" >

            </div>
            <img class="mb-4 rounded-2xl overflow-hidden duration-500 ease-out select-none cursor-pointer" :class="selectedIndex=== index?'box-Shadow':''" :src="item.picUrl" alt="" style="width:100%;">
            <div class="mb-3 text-sm font-bold leading-5 ">
                <span class="duration-150 ease-out cursor-pointer title">{{ item.name }}</span>
            </div>
            <div>
                <span class="text-xs font-bold text-gray-500 cursor-default" > {{ item.creator.nickname }}</span>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { recommendListDailyApi } from "@/request/api/Recommended"
import { onMounted, ref,reactive} from "vue";
var i:number
const selectedIndex = ref()
const songList = reactive([] as any[])
onMounted(async () => {
    const { data: dailyListRes } = await recommendListDailyApi()
    for(i=0;i<5;i++){
        songList.push(dailyListRes.recommend[i]) 
    }
    console.log("dailyRES",dailyListRes)
    console.log("daily",songList)
})
</script>

<style scoped>
.box-Shadow{
    box-shadow: var(--primary-color) 0px 12px 15px -10px;
}
</style>