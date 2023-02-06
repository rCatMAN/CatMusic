<template>
    <div class="flex items-center justify-around w-full h-full" style="min-width: 500px;">
        <div @mouseenter="selectedIndex = index" @mouseleave="selectedIndex = 100" v-for="(item, index) in songList"
            :key="index" class=" relative  cursor-pointer" style="width:18%">
            <img class="rounded-2xl overflow-hidden select-none" :src="item.picUrl" alt="" style="width:100%;">
            <div class="mt-4" style="width:100%">
                <p class=""></p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { recommendListDailyApi } from "@/request/api/Recommended"
import { onMounted, ref,reactive} from "vue";
var i:number
const selectedIndex = ref()
let songList = reactive([] as any[])
onMounted(async () => {
    const { data: dailyListRes } = await recommendListDailyApi()
    for(i=0;i<5;i++){
        songList.push(dailyListRes.recommend[i]) 
    }
    console.log("daily",dailyListRes)
})
</script>

<style scoped>

</style>