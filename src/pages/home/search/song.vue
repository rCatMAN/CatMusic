<template>
    <div class="w-full">
        <div class="flex items-center justify-between mb-8">
            <span class="text-2xl font-bold">单曲</span>
            <span class="title text-sm font-bold text-gray-500 duration-200 ease-out cursor-pointer">查看全部</span>
        </div>
        <div class="flex items-center justify-start flex-wrap w-full cursor-pointer">
            <div v-for="(item, index) in searchSongList.values" :key="index"
                class="song-box flex items-center rounded-xl duration-300 ease-out"
                style="width: 25%;height: 54px;padding: 8px;">
                <img :src="item.al.picUrl" alt="" class="w-9 h-9 rounded-lg">
                <div class="ml-4 flex flex-col items-start justify-center w-full truncate">
                    <span class="font-bold text-sm mb-1">{{ item.name }}</span>
                    <div class=" w-full truncate">
                        <span v-for="(itemm, indexx) in item.ar" :key="indexx" class="text-xs text-gray-500">{{
                            itemm.name
                        }}</span>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { searchSongApi } from '@/request/api/search'
import { onMounted, reactive } from 'vue';
const props = defineProps(['keywords'])
const searchSongList = reactive<any>({
    values: null,
})
onMounted(async () => {
    const { data: searchSongRes } = await searchSongApi(props.keywords)
    searchSongList.values = searchSongRes.result.songs
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