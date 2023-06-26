<template>
    <div class="max-w-6xl">
        <VideoPlayer :type="1" />
        <div v-if="mvDetail.values" class="mt-8 flex items-center">
            <div class="truncate" style="max-width:800px ;">
                <span class="font-bold text-2xl">{{ mvDetail.values?.name }}</span>
            </div>
            <div class="flex items-center ml-4">
                <div class="icon-box rounded-xl" style="">
                    <SvgIcon iconClass="unlike" style="width: 25px;;" />
                </div>
            </div>
        </div>
        <div class="mv-detail-box relative flex items-center mt-4 text-sm text-gray-500">
            <span>{{ playCount }}</span>
            <span class="text-xs ml-1" style="transform: translateY(0.5px);">Views · </span>
            <span class="ml-1 text-xs" style="transform: translateY(0.5px);">{{ mvDetail.values?.publishTime }}</span>
        </div>
        <div class="mb-64 mt-24">
            <SimiMv />
        </div>

    </div>
</template>

<script setup lang='ts'>
import { useRoute } from 'vue-router';
import { computed, onMounted, reactive } from 'vue';
import { mvDetailApi } from '@/request/api/detail'
import VideoPlayer from '@/components/video-player/index.vue'
import SimiMv from './simi-mv.vue'
const route = useRoute()
const id = computed<any>(() => {
    return route.query.id
})
type mvDetailType = {
    values?: {
        name: string
        playCount: number
        publishTime: string
    }
}
const mvDetail = reactive<mvDetailType>({
    values: undefined
})
onMounted(async () => {
    const { data: mvDetailRes } = await mvDetailApi(id.value)
    mvDetail.values = mvDetailRes.data
})
const playCount = computed(() => {
    if (mvDetail.values)
        return (mvDetail.values.playCount / 10000).toFixed(1) + '万'

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