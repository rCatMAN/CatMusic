<template>
    <div v-if="artistDetail.value.artist" class="w-full h-80 max-w-6xl flex items-center justify-start relative">
        <div class=" relative" style="width: 28% ;">
            <el-image :src="artistDetail.value.artist.cover + '?param=1080y1080'"
                class=" rounded-full z-10 relative aspect-square" fit="cover" />
            <div class="shadow" :style="{ 'background-image': `url(${artistDetail.value.artist.cover})` }">
            </div>
        </div>
        <div class=" h-full mt-14 ml-8 relative" style="width:72%">
            <div>
                <span class="text-5xl font-bold">{{ artistDetail.value.artist.name }}</span>
            </div>
            <div class="mt-8">
                <span class="text-xl">艺人</span>
            </div>
            <div class="text-gray-600 text-sm">
                <span>{{ artistDetail.value.artist.musicSize }} 首歌 · {{ artistDetail.value.artist.albumSize }} 张专辑 · {{
                    artistDetail.value.artist.mvSize }} 个 MV</span>
            </div>
            <div class="mt-8 text-gray-600 text-sm truncate">
                <span @click="isDescriptionShow = true" class="cursor-pointer ">{{
                    artistDetail.value.artist.briefDesc
                }}</span>
            </div>
            <div class=" absolute bg-gray-200 rounded-2xl duration-300 ease-out"
                style="top: 180px;width: 100%;padding: 20px;"
                :style="{ opacity: isDescriptionShow ? '1' : '0', zIndex: isDescriptionShow ? 20 : -50, transform: isDescriptionShow ? 'translateY(-20px)' : 'translateY(10px)' }">
                <SvgIcon @click="isDescriptionShow = false" iconClass="close"
                    class=" absolute top-2 right-4 text-gray-500 z-30 cursor-pointer" style="width: 15px;height: 15px;" />
                <span class="">{{ artistDetail.value.artist.briefDesc }}</span>
            </div>
        </div>
    </div>
    <div class=" mt-8 max-w-6xl">
        <HotSong />
    </div>
    <div class=" mt-8 max-w-6xl ">
        <Album />
    </div>
    <div class="mt-8 max-w-6xl ">
        <Mv />
    </div>
    <div class="mt-8 mb-36 max-w-6xl">
        <SimilarArtist />
    </div>
</template>

<script setup lang='ts'>
import { onMounted, computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { artistDetailApi } from '@/request/api/detail'
import HotSong from './hot-song.vue'
import Album from './album.vue'
import Mv from './mv.vue'
import SimilarArtist from './similar-artist.vue'
const route = useRoute()
const id = computed<any>(() => {
    return route.query.id
})
const isDescriptionShow = ref(false)
type artistDetail = {
    value: {
        artist: {
            name?: string
            cover?: string
            mvSize?: number
            albumSize?: number
            musicSize?: number
            briefDesc?: string
        }
    }
}
const artistDetail = reactive<artistDetail>({
    value: {
        artist: {}
    }

})
onMounted(async () => {
    if (id) {
        const { data: artistDetailRes } = await artistDetailApi(id.value)
        artistDetail.value = artistDetailRes.data
    }
})
</script>

<style scoped>
.shadow {
    position: absolute;
    z-index: 9;
    top: 20px;
    left: 0px;
    width: 100%;
    filter: blur(10px) opacity(.9);
    transform: scale(.92);
    background-size: cover;
    border-radius: 9999px;
    aspect-ratio: 1/1;
}
</style>