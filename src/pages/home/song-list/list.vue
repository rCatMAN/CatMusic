<template>
    <div>
        <div v-for="(item, index) in songList.songs" :key="index"
            class="list-background flex items-center justify-start rounded-xl duration-200 ease-out cursor-pointer"
            style="padding: 8px;height: 80px;width: 100%;">
            <img :src="item.al.picUrl" alt="" class="rounded-xl mr-4" style="width: 60px;">
            <div class="flex flex-col  justify-center" style="width: 48%;height: 100%;">
                <p class=" font-bold mb-1">{{ item.name }}</p>
                <div class="flex items-center">
                    <p v-for="(itemm, index) in item.ar" :key="index" class=" text-xs font-bold text-gray-600">{{
                        itemm.name
                    }}</p>
                </div>

            </div>
            <div class=" flex items-center" style="width: 40%;height: 100%;">
                <p class="font-bold text-sm">{{ item.al.name }}</p>
            </div>
            <div class="flex items-center" style="width: 12%;height: 100%;">
                <p class="text-xs font-bold text-gray-600">{{ item.dt }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { songListApi } from '@/request/api/detail'
import { onMounted, reactive } from 'vue';
const props = defineProps(['id'])
const songList = reactive<any>({
    songs: null,
})
onMounted(async () => {
    const { data: songListRes } = await songListApi(props.id.id)
    songList.songs = songListRes.songs
    console.log('songListRes', songList)
})
</script>

<style scoped>
.list-background:hover {
    background-color: rgba(128, 128, 128, 0.2);

}

.list-background:active {
    scale: .95;
}
</style>