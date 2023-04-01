<template>
    <div class="flex items-center justify-between w-full h-full select-none">
        <div @mouseenter="selectedIndex = 1" @mouseleave="selectedIndex = 100"
            class="relative daily-background rounded-2xl overflow-hidden cursor-pointer background-Animation"
            style="width: 48%;height: 200px;">
            <div class=" absolute flex flex-wrap justify-between content-between font-semibold text-6xl text-white"
                style="width: 138px;height: 138px;left: 40px;top: 50%;transform: translateY(-50%);">
                <span>每</span>
                <span>日</span>
                <span>推</span>
                <span>荐</span>
            </div>
            <div class=" absolute w-12 h-12 rounded-full duration-200 ease-out  "
                style="right: 10%;bottom: 17%;background: hsla(0,0%,100%,.14);backdrop-filter: blur(8px);border: 1px solid hsla(0,0%,100%,.08);"
                :style="{
                    scale: selectedIndex === 1 ? '1.15' : '1',
                }">
                <SvgIcon iconClass="play" class="text-white absolute" style="width: 22px;right: 20%;bottom: 17%;" />
            </div>
        </div>
        <div v-if="fmList.id" class="relative daily-background rounded-2xl overflow-hidden"
            style="width: 48%;height: 200px;background-image:linear-gradient(0deg,#a18cd1 0%, #fbc2eb 100%)">
            <div class="absolute rounded-2xl overflow-hidden "
                style="width: 166px;height: 166px;left: 20px;top: 50%;transform: translateY(-50%);">
                <el-image style="width: 166px;height: 166px" :src="fmList.url + '?param=500y500'" fit="cover"
                    loading="lazy" />
            </div>
            <div class=" absolute text-white " style="left: 200px;top: 20px;">
                <p class="text-2xl font-bold">{{ fmList.name }}</p>
                <p class="text-lg font-bold mt-4">{{ fmList.singer }}</p>
            </div>
            <div class="flex items-center absolute" style="left: 190px;bottom: 20px;">
                <div
                    class="ml-2 mr-2 rounded-xl cursor-pointer duration-200 ease-out flex items-center justify-center icon-Box">
                    <SvgIcon iconClass="dontlike" class="text-white" style="width: 29px;" />
                </div>
                <div @click="playFmSong()"
                    class="mr-1 rounded-xl cursor-pointer duration-200 ease-out flex items-center justify-center icon-Box">
                    <SvgIcon iconClass="play" class="text-white" style="width: 25px;" />
                </div>
                <div class=" rounded-xl cursor-pointer duration-200 ease-out flex items-center justify-center icon-Box">
                    <SvgIcon iconClass="nextsong" class="text-white" style="width: 50px;" />
                </div>
            </div>
            <div class="text-white font-bold absolute flex items-center" style="right: 8%;bottom: 20px;opacity: 0.3;">
                <SvgIcon iconClass="radio" class="mr-1" />
                <span>私人FM</span>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { personalFmApi } from "@/request/api/Recommended"
import { onMounted, ref, reactive } from "vue"
import { useHowlerStore } from "@/store/howler-store";
const howlerStore = useHowlerStore()
const selectedIndex = ref(100)
type fmListType = {
    name?: string
    singer?: string
    url?: string
    id: number
}
const fmList = reactive<fmListType>({
    name: undefined,
    singer: undefined,
    url: undefined,
    id: 1,
})
const playFmSong = () => {
    howlerStore.nowPlayingId = fmList.id
}
onMounted(async () => {
    const { data: fmListRes } = await personalFmApi()
    fmList.name = fmListRes.data[0].name
    fmList.singer = fmListRes.data[0].artists[0].name
    fmList.url = fmListRes.data[0].album.picUrl
    fmList.id = fmListRes.data[0].bMusic.id
})
</script>

<style scoped>
.background-Animation {
    background: url('https://p2.music.126.net/QxJA2mr4hhb9DZyucIOIQw==/109951165422200291.jpg?param=1024y1024');
    background-position-y: 0%;
    background-size: cover;
    animation: backMove 200s linear infinite;
}

@keyframes backMove {
    50% {
        background-position-y: 100%;
    }
}

.icon-Box {
    width: 40px;
    height: 40px;

}

.icon-Box:hover {
    background-color: rgba(192, 192, 192, 0.4);
}
</style>