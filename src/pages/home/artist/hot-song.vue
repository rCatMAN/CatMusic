<template>
    <div class="w-full flex items-center justify-between">
        <span class="text-2xl font-bold">热门单曲</span>
    </div>
    <div class="w-full flex items-center justify-start flex-wrap mt-4 overflow-hidden"
        :style="{ height: isShow === true ? 'auto' : '162px' }">
        <div v-for="(item, index) in artistHotSong.values" :key="index"
            class="song-box w-1/4 flex items-center rounded-xl duration-300 ease-out cursor-pointer"
            style="height: 54px;padding: 8px;">
            <el-image :src="item.al.picUrl" class="w-11 rounded-lg" lazy />
            <div class="ml-3 flex flex-col items-start justify-center w-full truncate">
                <div class="w-full truncate">
                    <span class="font-bold text-sm mb-1 " :style="{
                        color: item.id === nowPlayingId ? 'var(--primary-text-color)' : ''
                    }">{{ item.name }}</span>
                </div>
                <div class=" w-full truncate" style="margin-top: -5px;">
                    <span v-for="(itemm, indexx) in item.ar" :key="indexx" class="text-xs text-gray-500">{{
                        itemm.name
                    }}</span>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-4">
        <span @click="isShow = !isShow"
            class="title text-sm font-bold text-gray-500 duration-200 ease-out cursor-pointer">{{ isShow === true ? '收起' :
                '查看更多'
            }}</span>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, reactive, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { artistHotSongAPi } from '@/request/api/detail'
import { useHowlerStore } from '@/store/howler-store';
import { storeToRefs } from 'pinia';
const howlerStore = useHowlerStore()
const { nowPlayingId } = storeToRefs(howlerStore)
const route = useRoute()
type artistHotSong = {
    values?: Array<{
        ar: Array<{
            name: string
        }>
        al: {
            picUrl: string
        }
        id: number
        name: string
    }>
}
const artistHotSong = reactive<artistHotSong>({
    values: undefined
})
const id = computed(() => {
    return route.query.id
})
const isShow = ref(false)
onMounted(async () => {
    const { data: artistHotSongRes } = await artistHotSongAPi(id.value)
    artistHotSong.values = artistHotSongRes.songs
})
</script>

<style scoped>
.song-box:hover {
    background-color: rgba(209, 209, 214, 0.28);
}

.song-box:active {
    scale: .92;
}
</style>