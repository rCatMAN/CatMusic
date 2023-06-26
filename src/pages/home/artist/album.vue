<template v-if="artistAlbumList.values">
    <div class="w-full">
        <span class="text-2xl font-bold">专辑</span>
    </div>
    <div class="w-full mt-8 flex items-start justify-between flex-wrap">
        <div v-for="(item, index) in artistAlbumList.values" class="mb-8" :key="index" style="width: 17%;">
            <div @mouseenter="selectedIndex = index" @mouseleave="selectedIndex = 100"
                class="relative w-full cursor-pointer">
                <el-image @click="router.push({ path: '/album', query: { id: item.id } })"
                    :src="item.picUrl + '?param=800y800'" alt="" class="relative rounded-lg z-10" loading="lazy" />
                <div class="absolute rounded-full overflow-hidden duration-200 ease-out z-30"
                    style="width: 25%;height: 25%; left: 50%;top: 50%;transform: translate(-50%,-50%);background: hsla(0,0%,100%,.14);backdrop-filter: blur(8px);border: 1px solid hsla(0,0%,100%,.08);"
                    :style="{
                        opacity: selectedIndex === index ? '1' : '0',
                    }">
                    <SvgIcon iconClass="play" class="text-white absolute"
                        style="width: 40%;left: 50%;top: 50%;transform: translate(-40%,-50%);" />
                </div>
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
    <div class="w-full">
        <span @click="more()" class="title text-sm font-bold text-gray-500 duration-200 ease-out cursor-pointer">查看更多</span>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, reactive, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { artistAlbumAPi } from '@/request/api/detail'
const route = useRoute()
const router = useRouter()
const selectedIndex = ref(100)
const offset = ref(0)
const id = computed(() => {
    return route.query.id
})
type artistAlbumListType = {
    values?: Array<{
        name: string
        picUrl: string
        id: number
    }>
}
const artistAlbumList = reactive<artistAlbumListType>({
    values: undefined
})
onMounted(async () => {
    const { data: artistAlbumRes } = await artistAlbumAPi(id.value, offset.value)
    artistAlbumList.values = artistAlbumRes.hotAlbums
})
const more = async () => {
    offset.value += 10
    const { data: artistAlbumRes } = await artistAlbumAPi(id.value, offset.value)
    for (let item of artistAlbumRes.hotAlbums) {
        artistAlbumList.values?.push(item)
    }
}
</script>

<style scoped>
.shadow {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    filter: blur(10px) opacity(.9);
    transform: scale(.92) translateY(7px);
    background-size: cover;
    aspect-ratio: 1/1;
    z-index: 0;
}
</style>