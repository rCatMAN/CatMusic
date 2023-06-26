<template>
    <div class="max-w-6xl">
        <div v-if="albumDetail.values" class="top-menu relative flex items-start " style="width: 100%;height: 330px;">
            <div style="width: 24%;min-width: 200px;margin-right: 5%;">
                <el-image :src="albumDetail.values.picUrl" alt="" class="rounded-2xl z-10 relative"
                    style="max-width: 330px;" fit="cover" loading="lazy" />
                <div class="shadow" style="max-width: 330px;"
                    :style="{ 'background-image': `url(${albumDetail.values.picUrl})` }">
                </div>
            </div>
            <div class=" h-full">
                <p class="mt-4 text-4xl font-bold">{{ albumDetail.values.name }}</p>
                <div class="mt-6 flex items-center">
                    <span class="text-base font-bold">{{ albumDetail.values.type }} by</span>
                    <el-image class="rounded-full overflow-hidden ml-2 mr-2" style="width: 30px;height: 30px;"
                        :src="albumDetail.values.artist.img1v1Url" alt="" loading="lazy" />
                    <p class="text-sm font-bold text-gray-500">{{ albumDetail.values.artist.name }}</p>
                </div>
                <div class="mt-2">
                    <span class="text-xs ">{{ albumDetail.values.size }} 首歌</span>
                </div>
                <div v-if="albumDetail.values.description" class="mt-9 truncate" style="max-width: 700px;">
                    <span @click="isDescriptionShow = true" class="text-sm text-gray-500 cursor-pointer">{{
                        albumDetail.values.description }}</span>
                </div>
                <div class=" absolute bg-gray-200 rounded-2xl duration-300 ease-out"
                    style="top: 150px;width: 60%;padding: 20px;"
                    :style="{ opacity: isDescriptionShow ? '1' : '0', zIndex: isDescriptionShow ? 20 : -1, transform: isDescriptionShow ? 'translateY(0px)' : 'translateY(10px)' }">
                    <SvgIcon @click="isDescriptionShow = false" iconClass="close"
                        class=" absolute top-2 right-4 text-gray-500 z-30 cursor-pointer"
                        style="width: 15px;height: 15px;" />
                    <span>{{ albumDetail.values.description }}</span>
                </div>
                <div class=" theme-button mt-10 w-max cursor-pointer"
                    style="padding-left: 20px;padding-right: 20px;padding-top: 5px;padding-bottom: 5px;">
                    播放全部
                </div>
            </div>
        </div>
        <div v-if="albumDetail.songs && albumDetail.values" class="mt-16">
            <SongList :songs="albumDetail.songs" />
            <div v-if="date" class="song-list-footer mt-10 text-xs text-gray-500">
                <p>发行于 {{ date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate()
                    + '日' }}</p>
                <p class="mt-1">© {{ albumDetail.values.company }}</p>
            </div>
        </div>
        <div class="mt-10 mb-36">
            <MoreAblum v-if="albumDetail.values" :artistId="albumDetail.values?.artist.id" :albumId="albumDetail.values?.id"
                :artistName="albumDetail.values?.artist.name" />
        </div>
    </div>
</template>

<script lang="ts">
export default defineComponent({
    name: 'albumlist'
})
</script>

<script setup lang='ts'>
import { onMounted, computed, reactive, defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { albumDetailApi } from '@/request/api/detail'
import SongList from "./list.vue"
import MoreAblum from "./more-album.vue"
const isDescriptionShow = ref(false)
const date = ref<Date>()
const route = useRoute()
const id = computed<any>(() => {
    return route.query.id
})
type albumDetailType = {
    values?: {
        id: number
        picUrl: string
        name: string
        artist: {
            img1v1Url: string
            name: string
            id: number
        }
        description: string
        publishTime: number
        size: number
        company: string
        type: string
    }
    songs?: Array<{
        name: string
        alia: string[]
        id: number
        fee: number
        isLike: boolean
        dt: number
        al: {
            name: string
            picUrl: string
        }
        ar: Array<{
            name: string
        }>
    }>
}
const albumDetail = reactive<albumDetailType>({
    values: undefined,
    songs: undefined
})
onMounted(async () => {
    const { data: albumDetailRes } = await albumDetailApi(id.value)
    albumDetail.values = albumDetailRes.album
    albumDetail.songs = albumDetailRes.songs
    if (albumDetail.values) {
        date.value = new Date(albumDetail.values?.publishTime)
    }
    console.log('albumDetailRes: ', albumDetailRes);
})

</script>

<style scoped>
.shadow {
    position: absolute;
    top: 5%;
    left: 0px;
    width: 24%;
    min-width: 200px;
    filter: blur(10px) opacity(.9);
    transform: scale(.92, .96);
    background-size: cover;
    border-radius: .75em;
    aspect-ratio: 1/1;
}

.song-list-footer::after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background-color: rgba(158, 158, 158, 0.692);
    margin-top: 20px;
}
</style>