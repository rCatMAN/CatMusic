<template>
    <div v-if="artistDetail.value.artist" class="w-3/5 h-80 flex items-center justify-start relative">
        <div class="artist-cover relative">
            <el-image :src="artistDetail.value.artist.cover + '?param=1080y1080'" class="mr-8 rounded-full z-10 relative"
                style="width: 300px;height: 300px;" fit="cover" />
            <div class="shadow" :style="{ 'background-image': `url(${artistDetail.value.artist.cover})` }">
            </div>
        </div>
        <div class="w-full h-full mt-14">
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
            <div class="w-full mt-8 text-gray-600 text-sm truncate">
                <span>{{ artistDetail.value.artist.briefDesc }}</span>
            </div>
        </div>
    </div>
    <div class="w-full mt-8">
        <HotSong />
    </div>
    <div class="w-full mt-8 ">
        <Album />
    </div>
    <div class="w-full mt-8 ">
        <Mv />
    </div>
    <div class="w-full mt-8 mb-36">
        <SimilarArtist />
    </div>
</template>

<script setup lang='ts'>
import { onMounted, computed, reactive } from 'vue';
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
    width: 300px;
    filter: blur(10px) opacity(.9);
    transform: scale(.92);
    background-size: cover;
    border-radius: 9999px;
    aspect-ratio: 1/1;
}

.artist-cover {
    left: 0;
    top: 0;
    animation: first-animation 0.2s ease-out;
}

@keyframes first-animation {
    0% {
        opacity: 0;
        top: 20px;
    }
}
</style>