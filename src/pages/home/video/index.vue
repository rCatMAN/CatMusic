<template>
    <div class="max-w-6xl">
        <VideoPlayer :type="0" />
        <div v-if="videoDetail.values" class="mt-8 flex items-center">
            <div class="truncate" style="max-width:800px ;">
                <span class="font-bold text-2xl">{{ videoDetail.values?.title }}</span>
            </div>
            <div class="flex items-center ml-4">
                <div class="icon-box rounded-xl" style="">
                    <SvgIcon iconClass="unlike" style="width: 25px;;" />
                </div>
            </div>
        </div>
        <div class="mt-4 flex items-center">
            <el-image :src="videoDetail.values?.creator.avatarUrl" class="w-6 rounded-full cursor-pointer" />
            <span class="title ml-3 text-xs text-gray-500 cursor-pointer">{{ videoDetail.values?.creator.nickname }}</span>
        </div>
        <div class="mv-detail-box relative  mt-4 text-sm text-gray-500">
            <div class="flex items-center">
                <span>{{ playTime }}</span>
                <span class="text-xs ml-1" style="transform: translateY(0.5px);">Views · </span>
                <span class="ml-1 text-xs" style="transform: translateY(0.5px);">{{ publishTime?.toLocaleDateString()
                }}</span>
            </div>
            <div class="mt-4 w-2/3 truncate ">
                <span>{{ videoDetail.values?.description }}</span>
            </div>
        </div>
        <div class="mb-64 mt-24">
            <SimiMv />
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useRoute } from 'vue-router';
import { computed, onMounted, reactive, ref } from 'vue';
import { videoDeatilApi } from '@/request/api/detail'
import VideoPlayer from '@/components/video-player/index.vue'
import SimiMv from './simi-video.vue'
const route = useRoute()
const vid = computed<any>(() => {
    return route.query.vid
})
const publishTime = ref<Date>()
type videoDetailType = {
    values?: {
        title: string
        playTime: number
        publishTime: number
        description: string
        creator: {
            nickname: string
            avatarUrl: string
        }
    }
}
const videoDetail = reactive<videoDetailType>({
    values: undefined
})
onMounted(async () => {
    const { data: videoDetailRes } = await videoDeatilApi(vid.value)
    console.log('videoDetailRes: ', videoDetailRes);
    videoDetail.values = videoDetailRes.data
    if (videoDetail.values) {
        publishTime.value = new Date(videoDetail.values?.publishTime)
    }
    videoDetail.values = videoDetailRes.data
})
const playTime = computed(() => {
    if (videoDetail.values)
        return (videoDetail.values.playTime / 10000).toFixed(1) + '万'

})
</script>

<style scoped>
.icon-box {
    width: 35px;
    height: 35px;
}

.mv-detail-box::after {
    position: absolute;
    bottom: -30px;
    content: '';
    width: 100%;
    height: 1px;
    background-color: rgba(171, 171, 171, 0.55);
}
</style>