<template>
    <div>
        <div v-if="songListDetail.values" class="top-menu  relative flex items-start " style="width: 100%;height: 330px;">
            <div style="width: 24%;min-width: 200px;margin-right: 5%;">
                <el-image :src="songListDetail.values.coverImgUrl" alt="" class="rounded-2xl z-10 relative" style=""
                    fit="cover" loading="lazy" lazy />
                <div class="shadow" :style="{ 'background-image': `url(${songListDetail.values.coverImgUrl})` }">
                </div>
            </div>
            <div class=" h-full">
                <p class="mt-4 text-3xl font-bold">{{ songListDetail.values.name }}</p>
                <div class="mt-6 flex items-center">
                    <div class=" rounded-full overflow-hidden mr-2" style="width: 30px;height: 30px;">
                        <img :src="songListDetail.values.creator.avatarUrl" alt="" class="w-full h-full">
                    </div>
                    <p class="text-sm font-bold text-gray-500">{{ songListDetail.values.creator.nickname }}</p>
                </div>
                <div class="mt-6">
                    <span class="text-sm text-gray-500">最后更新于{{ songListDetail.values.updateTime }}</span>
                </div>
                <div v-if="songListDetail.values.description" class="mt-9 truncate" style="max-width: 700px;">
                    <span class="text-sm text-gray-500">{{ songListDetail.values.description }}</span>
                </div>
                <div class=" theme-button mt-10 w-max cursor-pointer"
                    style="padding-left: 20px;padding-right: 20px;padding-top: 5px;padding-bottom: 5px;">
                    播放全部
                </div>
            </div>
        </div>
        <div class="mt-8">
            <SongList :id="id" />
        </div>
    </div>
</template>

<script lang="ts">
export default defineComponent({
    name: 'songlist'
})
</script>

<script setup lang='ts'>
import { onMounted, computed, reactive, onActivated, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { songListDetailApi } from '@/request/api/detail'
import SongList from "./list.vue"
const route = useRoute()
const id = computed<any>(() => {
    return route.query.id
})
type songListDetailType = {
    values?: {
        coverImgUrl: string
        name: string
        avatarUrl: string
        creator: {
            avatarUrl: string
            nickname: string
        }
        updateTime: string
        description: string
    }
}
const songListDetail = reactive<songListDetailType>({
    values: undefined
})
onMounted(async () => {
    console.log('onMounted,songlist组件')
    const { data: songListDetailRes } = await songListDetailApi(id.value)
    songListDetail.values = songListDetailRes.playlist
})
// onActivated(() => {
//     console.log('activated,songlist组件')
// })
</script>

<style scoped>
.shadow {
    position: absolute;
    top: 13px;
    left: 0px;
    width: 24%;
    min-width: 200px;
    filter: blur(10px) opacity(.9);
    transform: scale(.92, .96);
    background-size: cover;
    border-radius: .75em;
    aspect-ratio: 1/1;
}
</style>