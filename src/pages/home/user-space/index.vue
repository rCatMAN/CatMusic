<template>
    <div class="w-full" style="min-height: 100vh;">
        <div>
            <span class="text-5xl font-bold">username的音乐库</span>
        </div>
        <div class="mt-9 flex items-center" style="height:250px">
            <div class="relative h-full rounded-2xl flex flex-col"
                style="width: 40%;padding: 30px;background-color: rgba(213, 126, 235, 0.2);">
                <div class="" style="height: 100%;">
                    <!-- 今日听歌 -->
                </div>
                <div class="flex items-center justify-between">
                    <div style=" color:rgb(204, 46, 244)">
                        <p class="text-2xl font-bold">喜欢的音乐</p>
                        <p>300 首歌</p>
                    </div>
                    <div class="flex items-center justify-center rounded-full cursor-pointer duration-200 ease-out active:scale-90 hover:scale-110"
                        style="width: 45px;height: 45px;background-color: rgb(204, 46, 244);">
                        <SvgIcon icon-class="play" class="text-white" style="width: 20px;transform: translateX(2px);">
                        </SvgIcon>
                    </div>
                </div>
            </div>
            <div class=" h-full flex flex-wrap justify-between content-between" style="width: 60%;padding-left: 2%;">
                <div v-for="(item, index) in 12" :key="index" class="like-song-box ">
                    <ElImage src="" fit="cover" class="h-full aspect-square rounded-lg min-w-max" />
                    <div class="ml-3 truncate">
                        <p class="text-base font-bold tracking-wide truncate">歌asdasdasdadasd曲asdasdasdasdadasd名字</p>
                        <p class="text-xs truncate">歌手名字</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="h-10 w-2/5 mt-8 flex items-center justify-between font-bold tracking-wide">
            <div class="hover:bg-gray-100 h-full flex items-center justify-center rounded-lg duration-300 ease-out cursor-pointer active:scale-90"
                style="padding:0px 13px;">
                <p>全部歌单</p>
            </div>
            <div v-for="(routerMenu, routerIndex) in routerMenuButtonText" :key="routerIndex"
                class="hover:bg-gray-100 h-full flex items-center justify-center rounded-lg duration-300 ease-out cursor-pointer active:scale-90"
                style="padding:0px 13px;">
                <p>{{ routerMenu.title }}</p>
            </div>
        </div>
        <RouterView />
    </div>
</template>

<script setup lang='ts'>
import { reactive } from 'vue'
const routerMenuButtonText = reactive<{ title: string, route: string }[]>([{
    title: "专辑",
    route: "album"
}, {
    title: "艺人",
    route: "artist"
}, {
    title: "MV",
    route: "mv"
}, {
    title: "云盘",
    route: "cloud"
}, {
    title: "听歌排行",
    route: "leaderboard"
}])
</script>

<style scoped>
.like-song-box {
    width: 32%;
    height: 19%;
    border-radius: 11px;
    cursor: pointer;
    transition: all 200ms ease-out;
    display: flex;
    align-items: center;
    padding: 5px 13px;
}

.like-song-box:hover {
    background-color: rgba(209, 209, 214, 0.28);
}

.like-song-box:active {
    scale: 0.9;
}
</style>