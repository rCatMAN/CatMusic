<template>
    <div class="max-w-6xl w-full relative" style="min-height: 100vh;">
        <div>
            <span class="text-5xl font-bold">{{ userStore.userProfile.nickname }}的音乐库</span>
        </div>
        <div class="mt-9 flex items-center" style="height:250px">
            <div class="relative h-full rounded-2xl flex flex-col"
                style="width: 40%;padding: 30px;background-color: var(--primary-light-color);">
                <div class="" style="height: 100%;">
                    <!-- 今日听歌 -->
                </div>
                <div class="flex items-center justify-between">
                    <div style=" color:var(--primary-text-color)">
                        <p class="text-2xl font-bold">喜欢的音乐</p>
                        <p>{{ userLikeSongs.allIdList.length }} 首歌</p>
                    </div>
                    <div class="flex items-center justify-center rounded-full cursor-pointer duration-200 ease-out active:scale-90 hover:scale-110"
                        style="width: 45px;height: 45px;background-color: var(--primary-text-color);">
                        <SvgIcon icon-class="play" class="text-white" style="width: 20px;transform: translateX(2px);">
                        </SvgIcon>
                    </div>
                </div>
            </div>
            <div class=" h-full  flex flex-wrap justify-between content-between" style="width: 60%;padding-left: 2%;">
                <div @click="playSong(songDetail.id)" v-for="(songDetail, songsIndex) in userLikeSongs.songs"
                    :key="songsIndex" class="like-song-box " :style="{
                            backgroundColor: songDetail.id === howlerStore.nowPlayingId ? 'var(--primary-light-color)' : ''
                        }">
                    <ElImage :src="songDetail.al.picUrl + '?param=100y100'" fit="cover" loading="lazy"
                        class="h-full aspect-square rounded-lg min-w-max" />
                    <div class="ml-3 truncate" :style="{
                            color: songDetail.id === howlerStore.nowPlayingId ? 'var(--primary-text-color)' : ''
                        }">
                        <div class="flex items-center">
                            <p class="text-sm font-bold tracking-wide truncate">{{ songDetail.name }}</p>
                            <div v-if="songDetail.fee === 1"
                                class="vip-icon w-7 h-4 ml-2 rounded-sm flex items-center justify-center" :style="{
                                        backgroundColor: songDetail.id === howlerStore.nowPlayingId ? 'var(--primary-light-color)' : ''
                                    }">
                                <span class=" font-bold" style="font-size: xx-small;" :style="{
                                        color: songDetail.id === howlerStore.nowPlayingId ? 'var(--primary-text-color)' : ''
                                    }">VIP</span>
                            </div>
                        </div>
                        <span v-for="(artistValue, artistIndex) in songDetail.ar" :key="artistIndex"
                            class="text-xs truncate">{{ artistValue.name }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="h-10 w-2/5 mt-8 flex items-center justify-between font-bold tracking-wide">
            <div @click="router.push({ path: `/musicspace/songlist` })"
                class="hover:bg-gray-100 h-full flex items-center justify-center rounded-lg duration-300 ease-out cursor-pointer active:scale-90"
                style="padding:0px 13px;" :style="{
                        backgroundColor: route.path === '/musicspace/songlist' ? 'rgb(243,244,246)' : ''
                    }">
                <p>全部歌单</p>
            </div>
            <div v-for="(routerMenu, routerIndex) in routerMenuButtonText" :key="routerIndex"
                class="hover:bg-gray-100 h-full flex items-center justify-center rounded-lg duration-300 ease-out cursor-pointer active:scale-90"
                style="padding:0px 13px;" :style="{
                        backgroundColor: routerMenu.route === route.path ? 'rgb(243,244,246)' : ''
                    }">
                <p>{{ routerMenu.title }}</p>
            </div>
        </div>
        <div class="mt-8">
            <RouterView />
        </div>

    </div>
</template>

<script setup lang='ts'>
import { reactive, onMounted } from 'vue'
import { songListApi } from "@/request/api/detail"
import { getUserSongList, getUserLikeSongs } from '@/request/api/user'
import { useUserStore } from '@/store/user-store';
import { useHowlerStore } from '@/store/howler-store';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()
console.log('toure', route)
const userStore = useUserStore()
const howlerStore = useHowlerStore()
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
type userLikeSongsType = {
    allIdList: number[]
    IdList: number[]
    songs: Array<{
        name: string
        id: number
        al: {
            picUrl: string
        }
        ar: Array<{
            name: string
        }>
        fee: number
    }>
}
const userLikeSongs = reactive<userLikeSongsType>({
    allIdList: [],
    IdList: [],
    songs: [],
})
onMounted(async () => {
    if (userStore.userProfile.userId) {
        const { data: userSongListRes } = await getUserSongList(userStore.userProfile.userId)
        const { data: userLikeSongsRes } = await songListApi(userSongListRes.playlist[0].id, 12)
        const { data: userLikeSongsIdList } = await getUserLikeSongs(userStore.userProfile.userId)
        userLikeSongs.allIdList = userLikeSongsIdList.ids
        userLikeSongs.songs = userLikeSongsRes.songs
    }
})
const playSong = (id: number) => {
    howlerStore.nowPlayingId = id
}
</script>

<style scoped>
.like-song-box {
    width: 32.8%;
    height: 23%;
    border-radius: 11px;
    cursor: pointer;
    transition: all 200ms ease-out;
    display: flex;
    align-items: center;
    padding: 8px 13px;
}

.like-song-box:hover {
    background-color: rgba(209, 209, 214, 0.28);
}

.like-song-box:active {
    scale: 0.9;
}

.vip-icon {
    background-color: #a5a5a53f;
}
</style>