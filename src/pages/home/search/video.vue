<template>
    <div class="w-full">
        <div class="flex items-center justify-between mb-8">
            <span class="text-2xl font-bold">视频</span>
            <span class="title text-sm font-bold text-gray-500 duration-200 ease-out cursor-pointer">查看全部</span>
        </div>
        <div class="flex items-start ">
            <div v-for="(item, index) in searchVideoList.values" :key="index" class="mr-7" style="width: 25%;">
                <div @mouseenter="selectedIndex = index" @mouseleave="selectedIndex = 100" class=" relative cursor-pointer">
                    <img :src="item.coverUrl" alt="" class="w-full rounded-xl  relative z-10">
                    <div class="shadow duration-300 ease-out"
                        :style="{ 'background-image': `url(${item.coverUrl})`, opacity: selectedIndex === index ? '1' : '0' }">
                    </div>
                </div>
                <div class="w-full mt-2">
                    <span class="title cursor-pointer font-bold">{{ item.title }}</span>
                    <div>
                        <span v-for="(itemm, indexx) in item.creator" :key="indexx"
                            class="title cursor-pointer mt-1 text-xs text-gray-500">{{ itemm.userName }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { searchVideoApi } from '@/request/api/search'
import { onMounted, reactive, ref } from 'vue';
const selectedIndex = ref(100)
const props = defineProps(['keywords'])
type searchVideoListType = {
    values?: Array<{
        coverUrl: string
        title: string
        creator: Array<{
            userName: string
        }>
    }>
}
const searchVideoList = reactive<searchVideoListType>({
    values: undefined,
})
onMounted(async () => {
    const { data: searchVideoRes } = await searchVideoApi(props.keywords)
    for (var i = 0; i < 5; i++) {
        if (searchVideoRes.result.videos[i]) {
            searchVideoList.values?.push(searchVideoRes.result.videos[i])
        }
    }
})
</script>

<style scoped>
.shadow {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    filter: blur(10px) opacity(.9);
    transform: scale(.92, .96) translateY(10px);
    background-size: cover;
    border-radius: 1000px;
    aspect-ratio: 1/1;
    z-index: 0;
}
</style>