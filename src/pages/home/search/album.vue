<template>
    <div class="w-full">
        <div class="flex items-center justify-between mb-5">
            <span class="text-2xl font-bold">专辑</span>
            <span class="title text-sm font-bold text-gray-500 duration-200 ease-out cursor-pointer">查看全部</span>
        </div>
        <div class="w-full flex items-start flex-wrap ">
            <div v-for="(item, index) in searchAlbumList.values" class="mb-8 mr-8" :key="index" style="width: 27%;">
                <div @mouseenter="selectedIndex = index" @mouseleave="selectedIndex = 100"
                    class=" relative w-full cursor-pointer">
                    <el-image @click="router.push({ path: '/album', query: { id: item.id } })" :src="item.picUrl" alt=""
                        class="relative rounded-lg z-10" lazy />
                    <div class="shadow duration-300 ease-out"
                        :style="{ 'background-image': `url(${item.picUrl})`, opacity: selectedIndex === index ? '1' : '0' }">
                    </div>
                </div>
                <div class="mt-4 flex items-center justify-center">
                    <span @click="router.push({ path: '/album', query: { id: item.id } })"
                        class="title text-sm font-bold duration-200 ease-out cursor-pointer">{{ item.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>:

<script setup lang='ts'>
import { searchAlbumApi } from '@/request/api/search'
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const selectedIndex = ref(100)
const props = defineProps(['keywords'])
type searchAlbumListType = {
    values: Array<{
        picUrl: string
        name: string
        id: number
    }>
}
const searchAlbumList = reactive<searchAlbumListType>({
    values: [],
})
onMounted(async () => {
    const { data: searchAlbumRes } = await searchAlbumApi(props.keywords)
    for (var i = 0; i < 3; i++) {
        searchAlbumList.values.push(searchAlbumRes.result.albums[i])
    }
})
</script>

<style scoped>
.shadow {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    filter: blur(10px) opacity(.9);
    transform: scale(.92, .96) translateY(10px);
    background-size: cover;
    aspect-ratio: 1/1;
    z-index: 0;
}
</style>