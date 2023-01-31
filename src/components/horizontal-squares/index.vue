<template>
    <div class="flex items-center justify-around w-full h-full" style="min-width: 500px;">
        <div @mouseenter="selectedIndex = index" @mouseleave="selectedIndex = 100" v-for="(item, index) in songList"
            :key="index" class=" relative rounded-2xl overflow-hidden cursor-pointer" style="width:18%">
            <img class=" select-none" :src="item.picUrl" alt="" style="width:100%;">
            <div class=" absolute top-0 w-full h-full overflow-hidden bg-gray-600 duration-300" style="" :style="{
                transform: selectedIndex === index ? 'translateY(70%)' : 'translateY(100%)'
            }">
                <img :src="item.picUrl" class="w-full h-full" style="transform: translateY(-70%);filter: blur(15px);">
                <div class=" absolute top-0 w-full h-full pt-2 text-white text-sm"
                    style="padding-left: 5%;padding-right: 5%;">
                    <p>{{ item.name }}</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { personalizedListApi } from "@/request/api/Recommended"
import { onMounted, ref } from "vue";
const songList = ref()
const selectedIndex = ref()
onMounted(async () => {
    const { data: songListRes } = await personalizedListApi()
    console.log(songListRes)
    songList.value = songListRes.result
})
</script>

<style scoped>

</style>