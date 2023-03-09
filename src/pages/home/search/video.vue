<template>
    <div v-if="searchVideoList.values" class="w-full">
        <div class="flex items-center justify-between mb-8">
            <span class="text-2xl font-bold">视频</span>
            <span class="title text-sm font-bold text-gray-500 duration-200 ease-out cursor-pointer">查看全部</span>
        </div>
        <div class="flex items-start ">
            <div v-for="(item, index) in searchVideoList.values" :key="index" class="mr-7" style="width: 25%;">
                <div @click="toVideoPage(item.vid, item.type)" @mouseenter="selectedIndex = index"
                    @mouseleave="selectedIndex = 100" class=" relative cursor-pointer">
                    <el-image :src="item.coverUrl" fit="cover" style="aspect-ratio:16/9;"
                        class="w-full rounded-xl  relative z-10" lazy />
                    <div class="absolute rounded-full overflow-hidden duration-200 ease-out z-30"
                        style="height: 30%;aspect-ratio:1/1; left: 50%;top: 50%;transform: translate(-50%,-50%);background: hsla(0,0%,100%,.14);backdrop-filter: blur(8px);border: 1px solid hsla(0,0%,100%,.08);"
                        :style="{
                            opacity: selectedIndex === index ? '1' : '0',
                        }">
                        <SvgIcon iconClass="play" class="text-white absolute"
                            style="width: 40%;left: 50%;top: 50%;transform: translate(-40%,-50%);" />
                    </div>
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
import { useRouter } from 'vue-router';
const router = useRouter()
const selectedIndex = ref(100)
const props = defineProps(['keywords'])
type searchVideoListType = {
    values?: Array<{
        vid: string
        type: number
        coverUrl: string
        title: string
        creator: Array<{
            userName: string
        }>
    }>
}
const searchVideoList = reactive<searchVideoListType>({
    values: [],
})
onMounted(async () => {
    const { data: searchVideoRes } = await searchVideoApi(props.keywords)
    console.log('searchVideoRes: ', searchVideoRes);
    for (var i = 0; i < 5; i++) {
        if (searchVideoRes.result.videos[i]) {
            searchVideoList.values?.push(searchVideoRes.result.videos[i])
        }
    }
})
const toVideoPage = (vid: string, type: number) => {
    if (type) {
        router.push({
            path: '/video',
            query: { vid: vid }
        })
    } else {
        router.push({
            path: '/mv',
            query: { id: vid }
        })
    }
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