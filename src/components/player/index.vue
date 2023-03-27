<template>
    <div class="flex items-center justify-center overflow-hidden " style="width: 100vw;height: 100vh;">
        <img v-if="songDetail.values" :src="songDetail.values.al.picUrl" alt=""
            class="player-background absolute w-full h-full ">
        <div @click="hiddenPlayerPage()"
            class="player-icon-box ml-2 flex items-center justify-center absolute  rounded-md duration-200 ease-out"
            style="top:4%;left: 8%;">
            <SvgIcon iconClass="downarrow" class="text-white" style="width: 20px;" />
        </div>
        <div class="flex items-center justify-between  relative z-10" style="width: 78vw;height: 100vh;min-width: 1000px;">
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
                        <div class="flex items-center ml-10" style="width: 220px;">
                            <VolumeBar class="text-white" />
                            <div class="player-icon-box flex items-center justify-center  rounded-md duration-200 ease-out"
                                style="margin-left: 120px;">
                                <SvgIcon iconClass="unlike" class="text-white" style="width: 20px;" />
                            </div>
                        </div>
                    </div>
                    <div class=" relative mt-4 w-full h-2 ">
                        <ProgressBar />
                    </div>
                    <div class=" w-full mt-4 h-10 flex items-center justify-center">
                        <div class="player-icon-box ml-2 flex items-center justify-center rounded-md duration-200 ease-out">
                            <SvgIcon iconClass="lastsong" class="text-white" style="width: 20px;" />
                        </div>
                        <div v-show="isLoaded" @click="changePlayStatus()"
                            class="play-icon-box ml-2 flex items-center justify-center rounded-md duration-200 ease-out">
                            <SvgIcon :iconClass="isPlaying ? 'pause' : 'play'" class="text-white" style="width: 35px;" />
                        </div>
                        <div v-show="!isLoaded"
                            class="player-icon-box ml-2 flex items-center justify-center rounded-md duration-200 ease-out">
                            <SvgIcon iconClass="loading" class="text-white loading-animation" style="width: 20px;" />
                        </div>
                        <div class="player-icon-box ml-2 flex items-center justify-center rounded-md duration-200 ease-out">
                            <SvgIcon iconClass="nextsong" class="text-white " style="width: 20px;" />
                        </div>
                    </div>
                </div>
            </div>
            <div class=" relative" style="width: 650px;height: 80vh;transform: translateY(-23px);">
                <ScrollLyric />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default defineComponent({
    name: 'player'
})
</script>

<script setup lang='ts'>
import VolumeBar from '@/components/volume-bar/index.vue'
import ProgressBar from './ProgressBar.vue';
import { useHowlerStore } from '@/store/howler-store';
import { storeToRefs } from 'pinia';
import { reactive, watch, defineComponent } from 'vue';
import { songDetailApi } from '@/request/api/detail'
import ScrollLyric from '@/components/scroll-lyric/index.vue'
const howlerStore = useHowlerStore()
const { howler, isPlaying, isLoaded, nowPlayingId } = storeToRefs(howlerStore)
const hiddenPlayerPage = () => {
    howlerStore.isShowPlayerPage = false
}
type songDetailType = {
    values?: {
        al: {
            picUrl: string
        }
        name: string
        ar: Array<{
            name: string
        }>
    }
}
const songDetail = reactive<songDetailType>({
    values: undefined
})
const changePlayStatus = () => {
    if (isPlaying.value) {
        howlerStore.isPlaying = false
        howler.value.pause()
    } else {
        howlerStore.isPlaying = true
        howler.value.play()
    }
}
watch(nowPlayingId, async () => {
    const { data: songDetailRes } = await songDetailApi(nowPlayingId.value)
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
    filter: blur(25px) brightness(0.5);
    transform: scale(1.1);
    object-fit: cover;

}

.play-icon-box {
    width: 45px;
    height: 45px;
}

.play-icon-box:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.3);
}

.player-icon-box {
    width: 35px;
    height: 35px;
}

.play-icon-box:active {
    scale: .8;
}

.player-icon-box:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.3);
}

.player-icon-box:active {
    scale: .7;
}

.loading-animation {
    animation: loading-animation 1.5s linear infinite;
}

@keyframes loading-animation {
    100% {
        transform: rotate(180deg)
    }
}
</style>