<template>
    <div class="footer fixed bottom-0 right-0 h-20 z-50 bg-white ">
        <div class="flex items-center w-full h-full relative ">

            <img src="https://p2.music.126.net/bDdwz0zd-BGYpel1QEU2RA==/109951165983886039.jpg" alt=""
                style="height: 100%;" class="mr-4">
            <div @mouseenter="selectIndex = 1" @mouseleave="selectIndex = 100"
                class="absolute bg-black duration-200 ease-out cursor-pointer" style="width: 80px;height: 80px;" :style="{
                    opacity:selectIndex === 1? '0.3':'0'
                }">
            </div>
            <div class="flex flex-col self-start mt-2">
                <p class="mb-1 font-bold">歌曲名字</p>
                <p class="text-xs font-bold text-gray-600">歌手名字</p>
            </div>
            <div class=" absolute flex items-center justify-between "
                style="left: 50%;transform: translateX(-50%);width: 180px;">
                <div class="icon-footer-box rounded-xl" style="padding: 4px;">
                    <SvgIcon iconClass="lastsong" style="width: 35px;;" />
                </div>
                <div class="icon-footer-box rounded-xl" style="padding: 6px;">
                    <SvgIcon iconClass="play" style="width: 40px;transform: translateX(2px)" />
                </div>
                <div class="icon-footer-box rounded-xl" style="padding: 4px;">
                    <SvgIcon iconClass="nextsong" style="width: 35px;" />
                </div>

            </div>
            <div class=" absolute flex items-center justify-between" style="right: 20%;width: 180px;">
                <div class="flex items-center">
                    <div class="icon-footer-box rounded-xl" style="padding: 4px;">
                        <SvgIcon iconClass="volume" style="width: 20px;" />
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
const selectIndex = ref<number>(100)
</script>

<style scoped>
.footer {
    width: calc(100% - 13rem);
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
</style>