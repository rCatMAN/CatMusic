<template>
    <div>
        <div class="top-menu  relative flex items-start" style="width: 100%;height: 280px;">
            <img :src="songListDetail.picUrl" alt="" class=""
                style="height: 100%;width: 280px;margin-right: 5%; box-shadow: 0px 0px 30px -4px;">
            <div class=" h-full">
                <p class="mt-4 text-3xl font-bold">{{ songListDetail.name }}</p>
                <div class="mt-6 flex items-center">
                    <div class=" rounded-full overflow-hidden mr-2" style="width: 30px;height: 30px;">
                        <img :src="songListDetail.avatarUrl" alt="" class="w-full h-full">
                    </div>
                    <p class="text-sm font-bold text-gray-500">{{ songListDetail.creator }}</p>
                </div>
                <div class="mt-20 " style="">
                    <span class="text-sm">{{ songListDetail.description }}</span>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, computed, ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { songListDetailApi } from '@/request/api/detail'
const route = useRoute()
const id: any = ref(route.query)
const songListDetail: any = reactive({
    name: "歌单名字",
    picUrl: "",
    creator: "歌单创建者",
    avatarUrl: "",
    description: "歌单介绍"
})
console.log("id", id.value)
onMounted(async () => {
    const { data: songListDetailRes } = await songListDetailApi(id.value.id)
    songListDetail.name = songListDetailRes.playlist.name
    songListDetail.picUrl = songListDetailRes.playlist.coverImgUrl
    songListDetail.creator = songListDetailRes.playlist.creator.nickname
    songListDetail.avatarUrl = songListDetailRes.playlist.creator.avatarUrl
    songListDetail.description = songListDetailRes.playlist.description
    console.log("songListdetail", songListDetailRes.playlist)
})
</script>

<style scoped>

</style>