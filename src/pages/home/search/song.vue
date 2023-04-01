<template >
    <div v-if="searchSongList.values" class="w-full">
        <div class="flex items-center justify-between mb-8">
            <span class="text-2xl font-bold">单曲</span>
            <span class="title text-sm font-bold text-gray-500 duration-200 ease-out cursor-pointer">查看全部</span>
        </div>
        <div class="flex items-center justify-start flex-wrap w-full cursor-pointer">
            <div v-for="(item, index) in searchSongList.values" :key="index"
                class="song-box flex items-center rounded-xl duration-300 ease-out"
                style="width: 25%;height: 54px;padding: 8px;" :style="{
                    backgroundColor: item.id === nowPlayingId ? 'var(--primary-light-color)' : ''
                }" @click="playSong(item.id)">
                <el-image :src="item.al.picUrl + '?param=100y100'" fit="cover" class="w-12 rounded-lg" loading="lazy" />
                <div class="ml-3 flex flex-col items-start justify-center w-full truncate">
                    <div class="w-full flex items-center truncate ">
                        <span class="font-bold text-sm mb-1 " :style="{
                            color: item.id === nowPlayingId ? 'var(--primary-text-color)' : ''
                        }">{{ item.name }}</span>
                        <div v-if="item.fee === 1" class="vip-icon w-7 h-4 ml-2 rounded-sm flex items-center justify-center"
                            :style="{
                                backgroundColor: item.id === nowPlayingId ? 'var(--primary-light-color)' : ''
                            }">
                            <span class=" font-bold" style="font-size: xx-small;" :style="{
                                color: item.id === nowPlayingId ? 'var(--primary-text-color)' : ''
                            }">VIP</span>
                        </div>
                    </div>
                    <div class=" w-full truncate" style="margin-top: -5px;">
                        <span v-for="(item2, index2) in item.ar" :key="index2" class="text-xs text-gray-500" :style="{
                            color: item.id === nowPlayingId ? 'var(--primary-text-color)' : ''
                        }">{{ item2.name }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { searchSongApi } from '@/request/api/search'
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useHowlerStore } from '@/store/howler-store';
import { storeToRefs } from 'pinia';
const router = useRouter()
const howlerStore = useHowlerStore()
const { nowPlayingId } = storeToRefs(howlerStore)
const props = defineProps(['keywords'])
type searchSongListType = {
    values?: Array<{
        al: {
            picUrl: string
        }
        name: string
        id: number
        ar: Array<{
            name: string
        }>
        fee: number
    }>
}
const searchSongList = reactive<searchSongListType>({
    values: undefined,
})
onMounted(async () => {
    const { data: searchSongRes } = await searchSongApi(props.keywords)
    searchSongList.values = searchSongRes.result.songs

})
const playSong = (id: number) => {
    howlerStore.nowPlayingId = id
}
</script>

<style scoped>
.song-box:hover {
    background-color: rgba(209, 209, 214, 0.28);
}

.song-box:active {
    scale: .92;
}

.vip-icon {
    background-color: #a5a5a53f;
}
</style>