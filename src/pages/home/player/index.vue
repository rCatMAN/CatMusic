<template>
    <div class="flex items-center justify-center overflow-hidden relative" style="width: 100vw;height: 100vh;">
        <img v-if="songDetail.values" :src="songDetail.values.al.picUrl" alt=""
            class="player-background absolute w-full h-full ">
        <div class="player-icon-box ml-2 flex items-center justify-center absolute  rounded-md duration-200 ease-out"
            style="top:4%;left: 8%;">
            <SvgIcon iconClass="downarrow" class="text-white" style="width: 20px;" />
        </div>
        <div class="flex items-center justify-between  relative z-10"
            style="width: 60vw;height: 100vh;min-width: 1000px;">
            <div class="al-picture-box">
                <div class=" relative">
                    <img v-if="songDetail.values" :src="songDetail.values.al.picUrl" class="rounded-2xl"
                        style="width: 440px;">
                    <div class="shadow z-10">

                    </div>
                </div>
                <div class="player-detail " style="width: 440px;height: 140px;">
                    <div class=" flex items-center mt-8">
                        <div v-if="songDetail.values" class=" truncate" style="width: 220px;">
                            <div class="truncate text-white text-2xl font-bold">
                                <span class="text-2xl font-bold text-white ">{{ songDetail.values.name }}</span>
                            </div>
                            <div class="truncate text-white font-bold mt-4">
                                <span v-for="(item, index) in songDetail.values.ar" :key="index"
                                    class="text-xs text-gray-300">{{ item.name }}</span>
                            </div>
                        </div>
                        <div class="flex items-center" style="width: 220px;">
                            <div
                                class="player-icon-box flex items-center justify-center  rounded-md duration-200 ease-out">
                                <SvgIcon iconClass="volume" class="text-white" style="width: 20px;" />
                            </div>
                            <div class="vol-progress-bar-back w-24 h-1 ml-2 rounded-xl bg-gray-500 relative">
                                <div class="vol-progress-bar w-20 h-1 rounded-xl bg-green-400">
                                </div>
                                <div class="vol-press-progress w-24 h-1 rounded-xl absolute top-0 cursor-pointer">
                                </div>
                            </div>
                            <div
                                class="player-icon-box ml-2 flex items-center justify-center  rounded-md duration-200 ease-out">
                                <SvgIcon iconClass="unlike" class="text-white" style="width: 20px;" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class=" overflow-hidden relative" style="width: 400px;height: 85vh;">
                <ScrollLyric />
            </div>
        </div>

    </div>
</template>

<script setup lang='ts'>
import { useHowlerStore } from '@/store/howler-store';
import { onMounted, reactive } from 'vue';
import { songDetailApi } from '@/request/api/detail'
import ScrollLyric from '@/components/scroll-lyric/index.vue'
const howlerStore = useHowlerStore()
const songDetail = reactive<any>({
    values: null
})
onMounted(async () => {
    const { data: songDetailRes } = await songDetailApi(howlerStore.nowPlayingId)
    songDetail.values = songDetailRes.songs[0]
    console.log('songDetailRes', songDetail.values)
})
</script>

<style scoped>
.shadow {
    position: absolute;
    top: 20px;
    left: 0px;
    width: 400px;
    filter: blur(10px) opacity(.9);
    transform: scale(.92, .96);
    background-size: cover;
    border-radius: .75em;
    aspect-ratio: 1/1;
}

.player-background {
    filter: blur(15px) brightness(0.5);
    transform: scale(1.1);
    background-size: cover;

}

.player-icon-box {
    width: 35px;
    height: 35px;
}

.player-icon-box:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.3);
}
</style>