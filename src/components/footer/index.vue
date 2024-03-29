<template>
    <div class="footer fixed bottom-0 right-0 h-20 z-50 bg-white ">
        <div v-show="!(nowPlayingId === 1)">
            <div class="absolute h-1 -top-1"
                :style="{ width: `calc( ${progressBarRatio} * 100vw)`, backgroundColor: 'var(--primary-back-color)' }">
            </div>
            <div v-show="selectIndex === 2 || isDraging === true" class=" absolute w-3 h-3 rounded-full -top-2" :style="{
                    left: `calc( (${progressBarRatio} * 100vw) - 6px )`, backgroundColor: 'var(--primary-back-color)'
                }">

            </div>
            <div @mouseenter="selectIndex = 2" @mouseleave="selectIndex = 100" ref="bar" @mousedown="addMouseMoveListener()"
                class="absolute w-full h-3 -top-2 cursor-pointer z-10">
            </div>
        </div>
        <div class="flex items-center w-full h-full relative ">
            <img v-if="songDetail.values" :src="songDetail.values.al.picUrl" alt="" style="height: 100%;" class="mr-4">
            <div v-if="!(nowPlayingId === 1)" @click="showPlayer()" @mouseenter="selectIndex = 1"
                @mouseleave="selectIndex = 100" class="absolute bg-black duration-200 ease-out cursor-pointer"
                style="width: 80px;height: 80px;" :style="{
                        opacity: selectIndex === 1 ? '0.3' : '0'
                    }">
            </div>
            <SvgIcon v-if="!(nowPlayingId === 1)" @click="showPlayer()" @mouseenter="selectIndex = 1"
                iconClass="doubleuparrow" class=" absolute text-white duration-200 ease-out cursor-pointer"
                style="left:40px;top: 40px;" :style="{
                        opacity: selectIndex === 1 ? '0.8' : '0',
                        transform: selectIndex === 1 ? 'translate(-50%,-45%)' : 'translate(-50%,-10%)'
                    }" />
            <div class="flex flex-col self-start mt-2">
                <p v-if="songDetail.values" class="title mb-1 font-bold cursor-pointer">{{ songDetail.values.name }}</p>
                <div class="flex items-center">
                    <span v-if="songDetail.values" v-for="(item, index) in songDetail.values.ar" :key="index"
                        class="title text-xs font-bold text-gray-600 cursor-pointer">{{ item.name }}</span>
                </div>
            </div>
            <div class=" absolute flex items-center justify-between "
                style="left: 50%;transform: translateX(-50%);width: 180px;">
                <div class="icon-footer-box " style="padding: 4px;">
                    <SvgIcon iconClass="lastsong" style="width: 35px;;" />
                </div>
                <div v-show="isLoaded" @click="changePlayStatus()" class="icon-footer-box absolute "
                    style="padding: 6px;left: 50%; transform: translateX(-50%);">
                    <SvgIcon :iconClass="isPlaying ? 'pause' : 'play'" style="width: 40px;transform: translateX(2px)" />
                </div>
                <div v-show="!isLoaded" class="icon-footer-box  absolute"
                    style="padding: 6px;left: 50%; transform: translateX(-50%);">
                    <SvgIcon iconClass="loading" class="loading-animation" style="width: 40px;transform: translateX(0px)" />
                </div>
                <div class="icon-footer-box " style="padding: 4px;">
                    <SvgIcon iconClass="nextsong" style="width: 35px;" />
                </div>
            </div>
            <div class="options-icon icon-footer-box flex items-start absolute" style="right:23%;">
                <SvgIcon :iconClass="isLiked ? 'liked' : 'unlike'" class="" style="width: 30px;padding:0px 5px;" />
            </div>
            <div @click="switchLoopMode()" class="options-icon icon-footer-box flex items-start absolute"
                style="right:20%;">
                <SvgIcon :iconClass="howlerStore.isOneSongLoop ? 'onesong' : 'listloop'" class=""
                    style="width: 30px;padding:0px 5px;" />
            </div>
            <VolumeBar class="absolute" style="right: 10%;" />
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { useHowlerStore } from '@/store/howler-store'
import { usekeepAliveStore } from '@/store/keepAlive-store';
import { useUserStore } from '@/store/user-store';
import { songUrlApi } from '@/request/api/url'
import { songDetailApi } from '@/request/api/detail'
import { getUserLikeSongs } from '@/request/api/user'
import { watch, reactive, computed, onActivated, onDeactivated, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import VolumeBar from '@/components/volume-bar/index.vue'
const keepAliveStore = usekeepAliveStore()
const selectIndex = ref<number>(100)
const isDraging = ref(false)
const showPlayer = () => {
    howlerStore.isShowPlayerPage = true
}
type barPositionType = {
    values: {
        width: number
    }
}
const barPosition = reactive<barPositionType>({
    values: {
        width: 0
    }
})
const dragingX = ref(0)
const bar = ref<any>()
type songDetailType = {
    values: {
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
    values: {
        al: {
            picUrl: ''
        },
        name: '',
        ar: [{ name: '' }]
    },
})
const howlerStore = useHowlerStore()
const { nowPlayingId, howler, nowPlayTime, durationTime, isLoaded, isPlaying, } = storeToRefs(howlerStore)
const progressBarRatio = computed(() => {
    if (isLoaded.value) {
        if (isDraging.value) {
            return dragingX.value / barPosition.values.width
        }
        else {
            return nowPlayTime.value / durationTime.value
        }
    } else {
        return 0
    }
})
let timeRecorder: any
const userStore = useUserStore()
const isLiked = ref(false)
watch(nowPlayingId, async (newid, oldid) => {
    const { data: songDetailRes } = await songDetailApi(nowPlayingId.value)
    if (userStore.userProfile.userId) {
        const { data: userLikeSongsListRes } = await getUserLikeSongs(userStore.userProfile.userId)
        for (let index = 0; index < userLikeSongsListRes.ids.length; index++) {
            if (newid === userLikeSongsListRes.ids[index]) {
                isLiked.value = true
                break
            } else if (index === userLikeSongsListRes.ids.length - 1) {
                isLiked.value = false
            }
        }
    }
    songDetail.values = songDetailRes.songs[0]
    const { data: urlRes } = await songUrlApi(nowPlayingId.value)
    console.log('newid:', newid, 'oldid:', oldid)
    howlerStore.newHowl(urlRes.data[0].url, howlerStore)
})
watch(durationTime, () => {
    console.log('com', howlerStore.durationTime)
})
const setTimeRecorder = () => {
    timeRecorder = setInterval(howlerStore.setNowPlayTime, 1000 / 5)
}
const clearTimeRecorder = () => {
    clearInterval(timeRecorder)
}
watch(isPlaying, () => {
    if (isPlaying.value) {
        setTimeRecorder()
    } else {
        clearTimeRecorder()
    }
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
const addMouseMoveListener = () => {
    if (isLoaded) {
        document.body.addEventListener('mousemove', dragBar)

    }
}
const dragBar = (event: any) => {

    document.body.style['userSelect'] = 'none'
    dragingX.value = event.clientX
    barPosition.values = bar.value.getBoundingClientRect()
    isDraging.value = true
}
const mouseUpEvent = () => {
    if (isDraging.value) {
        document.body.style['userSelect'] = 'text'
        howler.value.seek((dragingX.value / barPosition.values.width * durationTime.value))
        howlerStore.setNowPlayTime()
        document.body.removeEventListener('mousemove', dragBar)
        isDraging.value = false
        dragingX.value = 0
    }
}
onMounted(() => {
    document.body.addEventListener('mouseup', mouseUpEvent)
})
onActivated(() => {
    songDetail.values.name = keepAliveStore.name
    songDetail.values.ar = keepAliveStore.artist
    songDetail.values.al.picUrl = keepAliveStore.picUrl
})
onDeactivated(() => {
    keepAliveStore.addState(songDetail.values.name, songDetail.values.ar, songDetail.values.al.picUrl)
})
const switchLoopMode = () => {
    howlerStore.isOneSongLoop = !howlerStore.isOneSongLoop
    console.log('是否单曲循环：', howlerStore.isOneSongLoop)
    if (howlerStore.howler)
        howlerStore.howler.loop(howlerStore.isOneSongLoop)
}

</script>

<style scoped>
.footer {
    width: 100%;
    padding-left: 0;
    backdrop-filter: saturate(200%) blur(10px);
    background-color: hsla(0, 0%, 100%, 0.86);
}

.icon {
    transition: all 100ms ease-out;
    cursor: pointer;

}

.icon:hover {
    color: var(--primary-back-color);
}

.icon-footer-box {
    border-radius: 12px;
    cursor: pointer;
    transition: all 200ms ease-out;
}

.icon-footer-box:hover {
    transition: all 200ms ease-out;
    color: var(--primary-back-color);
    background-color: rgba(128, 128, 128, 0.265);
}

.icon-footer-box:active {
    scale: 0.9;
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