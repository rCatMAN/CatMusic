<template>
    <div class="flex items-start justify-around flex-wrap w-full h-full" style="min-width: 500px;">
        <div v-for="(item, index) in songList" :key="index" class="relative mb-8" style="width:18%">
            <div @click="toSongListPage(item.id)">
                <div>
                    <img @mouseenter="selectedIndex = index" @mouseleave="selectedIndex = 100"
                        class="mb-4 rounded-2xl overflow-hidden duration-500 ease-out select-none cursor-pointer"
                        :class="selectedIndex === index ? 'box-Shadow' : ''" :src="item.picUrl" alt=""
                        style="width:100%;">
                </div>
                <div @click="toSongListPage(item.id)" @mouseenter="selectedIndex = index"
                    class=" bg-red-500 w-12 h-12 rounded-full absolute duration-200 ease-out cursor-pointer"
                    style=" left: 50%;top: 30%;transform: translateX(-50%);background: hsla(0,0%,100%,.14);backdrop-filter: blur(8px);border: 1px solid hsla(0,0%,100%,.08);"
                    :style="{
                        opacity: selectedIndex === index ? '1' : '0',
                        scale: selectedIndex === index ? '1' : '0.3',
                    }">
                    <SvgIcon iconClass="play" class="text-white absolute" style="width: 22px;right: 20%;bottom: 17%;" />
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
        songList.push(dailyListRes.recommend[i])
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
.box-Shadow {
    box-shadow: var(--primary-back-color) 0px 12px 15px -10px;
}
</style>