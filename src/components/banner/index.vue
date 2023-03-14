<template>
    <div v-if="bannerDetail.values" class="w-full  bg-white ">
        <div @mouseenter="clearTimerRecord()" @mouseleave="startTimerRecord()" class="container relative"
            style="width: 65%;left: 50%;transform: translateX(-50%);aspect-ratio: 27/10;">
            <div class="absolute h-1 z-20" :style="{ width: progress * 100 + '%' }"
                style="background-color: var( --primary-back-color);">
            </div>
            <div id="slide">
                <div v-for="(item, index) in bannerDetail.values" :key="index" class="item"
                    :style="{ 'background-image': `url(${item.imageUrl})` }">
                    <div class="content">
                        <div class="name">
                        </div>
                        <div class="des">
                        </div>
                        <button class="">See More</button>
                    </div>
                </div>
            </div>
            <div class="buttons flex items-center justify-center">
                <div @click="last()" class="icon-box bg-white " style="width:30px;height:30px">
                    <SvgIcon icon-class="back" style="width:15px" />
                </div>
                <div @click="next()" class="icon-box bg-white ml-3" style="width:30px;height:30px">
                    <SvgIcon icon-class="front" style="width:15px" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { bannerApi } from "@/request/api/Recommended"
import { onMounted, reactive, onUnmounted, ref, watch } from "vue";
type bannerDetailType = {
    values?: Array<{
        imageUrl: string
    }>
}
const bannerDetail = reactive<bannerDetailType>({
    values: undefined
})

let timer: NodeJS.Timer
const progress = ref(0)
watch(progress, () => {
    console.log('progress', progress.value)
    if (progress.value >= 1) {
        next()
        progress.value = 0
    }
})
const startTimerRecord = () => {
    timer = setInterval(() => {
        progress.value += 0.0007
    }, 10)
}

const clearTimerRecord = () => {
    clearInterval(timer)
}

onMounted(async () => {
    const { data: bannerRes } = await bannerApi()
    bannerDetail.values = bannerRes.banners
    console.log('bannerRes: ', bannerRes);
    if (bannerDetail.values) {
        startTimerRecord()
    }
})
onUnmounted(() => {
    clearTimerRecord()
})
const next = () => {
    let lists = document.querySelectorAll('.item')
    document.getElementById('slide')?.appendChild(lists[0])
}
const last = () => {
    let lists = document.querySelectorAll('.item')
    document.getElementById('slide')?.prepend(lists[lists.length - 1])
}
</script>

<style scoped>
#slide {
    width: max-content;
}

.item {
    width: 200px;
    height: 100px;
    background-position: 50%, 50%;
    display: inline-block;
    transition: 0.5s;
    background-size: cover;
    position: absolute;
    z-index: 10;
    top: 90%;
    /* transform: translateY(-10%); */
    border-radius: 20px;
    box-shadow: 0 30px 50px #505050;
    overflow: hidden;
}

.item:nth-child(1) {
    left: 0;
    top: 0;
    transform: translate(0, 0);
    background-position: top;
    border-radius: 0;
    width: 100%;
    height: 100%;
    box-shadow: none;
}

.item:nth-child(2) {
    left: 0;
    top: 0;
    transform: translate(0, 0);
    background-position: top;
    border-radius: 0;
    width: 100%;
    height: 100%;
    box-shadow: none;
}

.item:nth-child(3) {
    left: 60%;
}

.item:nth-child(4) {
    left: calc(55% + 220px);


}

.item:nth-child(5) {
    left: calc(50% + 440px);


}

.item:nth-child(n+6) {
    left: calc(50% + 660px);
    opacity: 0;
}

.item .content {
    position: absolute;
    bottom: 5%;
    left: 5%;
    width: 300px;
    text-align: left;
    padding: 0px;
    color: #eee;
    transform: translate(0, -50%);
    display: none;
}

.item:nth-child(2) .content {
    display: block;
    z-index: 100;
}

.item .name {
    font-weight: 600;
    font-size: 40px;
    opacity: 0;
    animation: showcontent 1s ease-in-out 1 forwards;
}

.item .des {
    opacity: 0;
    margin: 20px 0;
    animation: showcontent 1s ease-in-out 0.3s 1 forwards;
}

.item button {
    font-size: x-small;
    transition: 1s all;
    padding: 7px 20px;
    border: none;
    opacity: 0;
    backdrop-filter: saturate(200%) blur(7px);
    background-color: hsla(0, 0%, 100%, 0.39);
    animation: showcontent 1s ease-in-out 0.6s 1 forwards;
    border-radius: 13px;
    overflow: hidden;
}

.item button:hover {
    transition: 1s all;
    backdrop-filter: blur(14px) saturate(200%);
}

@keyframes showcontent {
    from {
        opacity: 0;
        transform: translate(0, 100px);
        filter: blur(33px);
    }

    to {
        opacity: 1;
        transform: translate(0, 0);
        filter: blur(0px);
    }
}

.buttons {
    position: absolute;
    bottom: 20px;
    z-index: 100;
    width: 100%;
}
</style>  