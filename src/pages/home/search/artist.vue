<template>
    <div class="w-full">
        <div class="w-full flex items-center justify-between mb-8">
            <span class="text-2xl font-bold">艺人</span>
            <span class="title text-sm font-bold text-gray-500 duration-200 ease-out cursor-pointer">查看全部</span>
        </div>
        <div class="w-full flex items-center  flex-wrap ">
            <div v-for="(item, index) in searchArtistList.values" :key="index" class="mr-8 mb-8 " style="width: 27%;">
                <div @mouseenter="selectedIndex = index" @mouseleave="selectedIndex = 100"
                    class=" relative cursor-pointer w-full">
                    <el-image @click="toArtistPage(item.id)" :src="item.img1v1Url + '?param=500y500'" fit="cover"
                        class=" relative rounded-full z-10 cursor-pointer" lazy />
                    <div class="shadow duration-300 ease-out"
                        :style="{ 'background-image': `url(${item.img1v1Url + '?param=500y500'})`, opacity: selectedIndex === index ? '1' : '0' }">
                    </div>
                </div>
                <div class="mt-4 flex items-center justify-center">
                    <span @click="toArtistPage(item.id)"
                        class="title text-sm font-bold duration-200 ease-out cursor-pointer">{{ item.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { searchArtistApi } from '@/request/api/search'
import router from '@/router';
import { onMounted, reactive, ref } from 'vue';
const props = defineProps(['keywords'])
const selectedIndex = ref<number>(100)
type searchArtistListType = {
    values: Array<{
        img1v1Url: string
        name: string
        id: number
    }>
}
const searchArtistList = reactive<searchArtistListType>({
    values: [],
})
onMounted(async () => {
    const { data: searchRes } = await searchArtistApi(props.keywords)
    for (var i = 0; i < 3; i++) {
        if (searchRes.result.artists[i]) {
            searchArtistList.values.push(searchRes.result.artists[i])
        }
    }
})
const toArtistPage = (id: number) => {
    router.push({
        path: '/artist',
        query: {
            id: id
        }
    })
}
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