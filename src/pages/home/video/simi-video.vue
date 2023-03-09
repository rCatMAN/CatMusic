<template>
    <div v-if="simiVideo.values" class="w-full">
        <span class="text-2xl font-bold">相关视频</span>
    </div>
    <div v-if="simiVideo.values" class="mt-8 w-full flex items-start justify-between flex-wrap">
        <div v-for="(item, index) in simiVideo.values" :key="index" class="mb-8" style="width: 17.5%;">
            <div @click="toVideoPage(item.vid, item.type); reload()" @mouseenter="selectedIndex = index"
                @mouseleave="selectedIndex = 100" class=" relative cursor-pointer">
                <el-image :src="item.coverUrl + '?param=800y450'" fit="cover" class="w-full rounded-xl  relative z-10"
                    style="aspect-ratio:16/9;" lazy />
                <div class="absolute rounded-full overflow-hidden duration-200 ease-out z-30"
                    style="aspect-ratio:1/1;height: 30%; left: 50%;top: 50%;transform: translate(-50%,-50%);background: hsla(0,0%,100%,.1);backdrop-filter: blur(7px);border: 1px solid hsla(0,0%,100%,.08);"
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
            </div>
            <div class="text-xs text-gray-500 mt-1">
                <span>{{ item.creator[0].userName }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, reactive, computed, ref, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { simiVideoApi } from '@/request/api/detail'
const route = useRoute()
const router = useRouter()
const selectedIndex = ref(100)
const reload = inject<Function>('reload', () => { })
const vid = computed(() => {
    return route.query.vid
})
type simiVideoType = {
    values?: Array<{
        title: string
        coverUrl: string
        vid: string
        type: number
        creator: Array<{
            userName: string
            userId: number
        }>
    }>
}
const simiVideo = reactive<simiVideoType>({
    values: undefined
})
onMounted(async () => {
    const { data: simiVideoRes } = await simiVideoApi(vid.value)
    console.log('simiVideoRes: ', simiVideoRes);
    simiVideo.values = simiVideoRes.data
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
    transform: scale(.9) translateY(2px);
    background-size: cover;
    border-radius: 12px;
    aspect-ratio: 1/1;
    z-index: 0;
}
</style>