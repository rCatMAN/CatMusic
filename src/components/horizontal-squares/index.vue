<template>
    <div class="flex items-start justify-around flex-wrap w-full h-full" style="min-width: 500px;">
        <div v-for="(item, index) in songList" :key="index" class="relative mb-8" style="width:18%">
            <div @click="toSongListPage(item.id)" class="relative">
                <el-image @mouseenter="selectedIndex = index" @mouseleave="selectedIndex = 100"
                    class="mb-4 rounded-2xl overflow-hidden duration-500 ease-out select-none cursor-pointer z-30"
                    :src="item.picUrl + '?param=1080y1080'" fit="cover" style="width:100%;" lazy />
                <div class="shadow duration-300 ease-out"
                    :style="{ 'background-image': `url(${item.picUrl})`, opacity: selectedIndex === index ? '1' : '0' }">
                </div>
                <div @mouseenter="selectedIndex = index"
                    class="absolute rounded-full overflow-hidden duration-200 ease-out z-30 cursor-pointer"
                    style="width: 20%;aspect-ratio: 1/1; left: 50%;top: 50%;transform: translate(-50%,-50%);background: hsla(0,0%,100%,.14);backdrop-filter: blur(8px);border: 1px solid hsla(0,0%,100%,.08);"
                    :style="{
                        opacity: selectedIndex === index ? '1' : '0',
                    }">
                    <SvgIcon iconClass="play" class="text-white absolute"
                        style="width: 40%;left: 50%;top: 50%;transform: translate(-40%,-50%);" />
                </div>
            </div>
            <div @click="toSongListPage(item.id)" class="mb-3 text-sm font-bold leading-5 ">
                <span class="duration-150 ease-out cursor-pointer title">{{ item.name }}</span>
            </div>
            <div>
                <span class="text-xs font-bold text-gray-500 cursor-default"> {{ item.creator.nickname }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { recommendListDailyApi } from "@/request/api/Recommended"
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
var i: number
const router = useRouter()
const selectedIndex = ref()
type resType = {
    id: number
    picUrl: string
    name: string
    creator: {
        nickname: string
    }
}
const songList = reactive<Array<resType>>([])
onMounted(async () => {
    const { data: dailyListRes } = await recommendListDailyApi()
    for (i = 0; i < 10; i++) {
        if (dailyListRes.recommend[i]) {
            songList.push(dailyListRes.recommend[i])
        }
    }
    console.log('songList', songList)
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
    top: 1%;
    width: 100%;
    height: 100%;
    filter: blur(10px) opacity(.9);
    transform: scale(.85, .85);
    background-size: cover;
    aspect-ratio: 1/1;
    z-index: 0;
}
</style>