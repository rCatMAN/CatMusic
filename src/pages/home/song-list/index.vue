<template>
    <div>
        <div class="top-menu  relative flex items-start " style="width: 100%;height: 330px;">
            <div style="width: 24%;min-width: 200px;margin-right: 5%;">
                <img :src="songListDetail.picUrl" alt="" class="rounded-2xl z-10 relative" style="">
                <div class="shadow" :style="{ 'background-image': `url(${songListDetail.picUrl})` }">
                </div>
            </div>
            <div class=" h-full">
                <p class="mt-4 text-3xl font-bold">{{ songListDetail.name }}</p>
                <div class="mt-6 flex items-center">
                    <div class=" rounded-full overflow-hidden mr-2" style="width: 30px;height: 30px;">
                        <img :src="songListDetail.avatarUrl" alt="" class="w-full h-full">
                    </div>
                    <p class="text-sm font-bold text-gray-500">{{ songListDetail.creator }}</p>
                </div>
                <div class="mt-6">
                    <span class="text-sm text-gray-500">最后更新于{{ songListDetail.updateTime }}</span>
                </div>
                <div v-if="songListDetail.description" class="mt-9 truncate" style="max-width: 700px;">
                    <span class="text-sm text-gray-500">{{ songListDetail.description }}</span>
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

<script setup lang='ts'>
import { onMounted, computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { songListDetailApi } from '@/request/api/detail'
import SongList from "./list.vue"
const route = useRoute()
const id = computed<any>(() => {
    return route.query.id
})
const songListDetail: any = reactive({
    name: "歌单名字",
    picUrl: "",
    creator: "歌单创建者",
    avatarUrl: "",
    description: "歌单介绍",
    updateTime: null,
})
onMounted(async () => {
    const { data: songListDetailRes } = await songListDetailApi(id.value)
    console.log('songListDetailRes', songListDetailRes)
    songListDetail.name = songListDetailRes.playlist.name
    songListDetail.picUrl = songListDetailRes.playlist.coverImgUrl
    songListDetail.creator = songListDetailRes.playlist.creator.nickname
    songListDetail.avatarUrl = songListDetailRes.playlist.creator.avatarUrl
    songListDetail.description = songListDetailRes.playlist.description
    songListDetail.updateTime = songListDetailRes.playlist.updateTime
})
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