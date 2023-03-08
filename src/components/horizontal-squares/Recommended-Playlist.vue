<template>
    <div class="flex items-start flex-wrap justify-around w-full h-full" style="min-width: 500px;">
        <div v-for="(item, index) in songList.values" :key="index" class="relative mb-4" style="width:18%">
            <div @click="toSongListPage(item.id)" class="relative">
                <el-image @mouseenter="selectedIndex = index" @mouseleave="selectedIndex = 100"
                    class="mb-1 rounded-2xl overflow-hidden duration-500 ease-out select-none cursor-pointer z-30"
                    :src="item.picUrl + '?param=1080y1080'" alt="" style="width:100%;" lazy />
                <div @mouseenter="selectedIndex = index"
                    class="absolute rounded-full overflow-hidden duration-200 ease-out z-30 cursor-pointer"
                    style="width: 25%;height: 25%; left: 50%;top: 50%;transform: translate(-50%,-50%);background: hsla(0,0%,100%,.14);backdrop-filter: blur(8px);border: 1px solid hsla(0,0%,100%,.08);"
                    :style="{
                        opacity: selectedIndex === index ? '1' : '0',
                    }">
                    <SvgIcon iconClass="play" class="text-white absolute"
                        style="width: 40%;left: 50%;top: 50%;transform: translate(-40%,-50%);" />
                </div>
                <div class="shadow duration-300 ease-out rounded-2xl"
                    :style="{ 'background-image': `url(${item.picUrl + '?param=1080y1080'})`, opacity: selectedIndex === index ? '1' : '0' }">
                </div>
            </div>
            <div class=" flex items-center">
                <SvgIcon iconClass="play" class="mr-2" style="width: 10px;right: 10%;color: var(--primary-back-color);" />
                <span class="text-xs text-gray-500 font-bold">{{ item.playCount }}</span>
            </div>
            <div @click="toSongListPage(item.id)" class="mb-3 text-sm font-bold leading-5">
                <span class="duration-150 ease-out cursor-pointer title">{{ item.name }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { personalizedListApi } from "@/request/api/Recommended"
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
type songListType = {
    values?: Array<{
        id: number
        picUrl: string
        playCount: number
        name: string
    }>

}
const selectedIndex = ref(100)
const songList = reactive<songListType>({
    values: undefined
})
const router = useRouter()
onMounted(async () => {
    const { data: songListRes } = await personalizedListApi()
    songList.values = songListRes.result
})
const toSongListPage = (id: (string | number)) => {
    router.push({
        path: `/songlist`,
        query: { id: id }
    })
}
</script>

<style scoped>
.shadow {
    position: absolute;
    left: 0;
    top: 3%;
    width: 100%;
    height: 100%;
    filter: blur(10px) opacity(.9);
    transform: scale(.92, .96);
    background-size: cover;
    aspect-ratio: 1/1;
    z-index: 0;
}
</style>