<template>
    <div>
        <div v-for="(item, index) in songList.songs" :key="index" @click="playSong(item.id)"
            class="list-background flex items-center justify-start rounded-xl duration-200 ease-out cursor-pointer"
            style="padding: 8px;height: 80px;width: 100%;" :style="{
                backgroundColor: item.id === nowPlayingId ? 'var(--primary-light-color)' : ''
            }">
            <el-image :src="item.al.picUrl" class="rounded-xl mr-4" style="width: 60px;" fit="cover" loading="lazy" lazy />
            <div class="flex flex-col  justify-center" style="width: 48%;height: 100%;">
                <div class="flex items-center">
                    <p class=" font-bold mb-1" :style="{
                        color: item.id === nowPlayingId ? 'var(--primary-text-color)' : ''
                    }">{{ item.name }}</p>
                    <div v-if="item.fee === 1" class="vip-icon w-7 h-4 ml-2 rounded-sm flex items-center justify-center">
                        <span class=" font-bold" style="font-size: xx-small;">VIP</span>
                    </div>
                </div>
                <div class="flex items-center">
                    <p v-for="(itemm, index) in item.ar" :key="index" class=" text-xs font-bold text-gray-600">{{
                        itemm.name
                    }}</p>
                </div>
            </div>
            <div class=" flex items-center" style="width: 40%;height: 100%;">
                <p class="font-bold text-sm" :style="{
                    color: item.id === nowPlayingId ? 'var(--primary-text-color)' : ''
                }">{{ item.al.name }}</p>
            </div>
            <div class="flex items-center" style="width: 12%;height: 100%;">
                <p class="text-xs font-bold text-gray-600" :style="{
                    color: item.id === nowPlayingId ? 'var(--primary-text-color)' : ''
                }">{{ item.dt }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { songListApi } from '@/request/api/detail'
import { onMounted, reactive, onActivated } from 'vue';
import { useHowlerStore } from '@/store/howler-store';
import { storeToRefs } from 'pinia';
const howlerStore = useHowlerStore()
const { nowPlayingId } = storeToRefs(howlerStore)
const props = defineProps(['id'])
type songListType = {
    songs?: Array<{
        id: number
        al: {
            picUrl: string
            name: string
        }
        dt: string
        name: string
        ar: Array<{
            name: string
        }>
        fee: number
    }>
}
const songList = reactive<songListType>({
    songs: undefined,
})
onMounted(async () => {
    const { data: songListRes } = await songListApi(props.id)
    console.log('songListRes: ', songListRes);
    songList.songs = songListRes.songs
})
const playSong = (id: number) => {
    howlerStore.nowPlayingId = id
}
</script>

<style scoped>
.list-background:hover {
    background-color: rgba(128, 128, 128, 0.2);

}

.list-background:active {
    scale: .95;
}

.vip-icon {
    background-color: #a5a5a53f;
}
</style>