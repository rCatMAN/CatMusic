<template>
    <div>
        <div v-for="(item, index) in songList.songs" :key="index" @contextmenu.prevent="showContextMenu($event)"
            @click="playSong(item.id)"
            class="list-background mb-1 flex items-center justify-start rounded-xl duration-200 ease-out cursor-pointer"
            style="padding: 8px;height: 80px;width: 100%;" :style="{
                    backgroundColor: item.id === nowPlayingId ? 'var(--primary-light-color)' : ''
                }">
            <el-image :src="item.al.picUrl + '?param=100y100'" class="rounded-xl mr-4" style="width: 60px;" fit="cover"
                loading="lazy" />
            <div class="flex flex-col  justify-center" style="width: 48%;">
                <div class="flex items-center ">
                    <p class=" font-bold mb-1" :style="{
                            color: item.id === nowPlayingId ? 'var(--primary-text-color)' : ''
                        }">{{ item.name }}</p>
                    <p v-for="(aliaName, aliaIndex) in item.alia" :key="aliaIndex" class=" ml-3 text-xs  text-gray-500"
                        :style="{
                                color: item.id === nowPlayingId ? 'var(--primary-text-color)' : ''
                            }">{{ aliaName }}</p>
                    <div v-if="item.fee === 1" class="vip-icon w-7 h-4 ml-2 rounded-sm flex items-center justify-center">
                        <span class=" font-bold" style="font-size: xx-small;">VIP</span>
                    </div>
                </div>
                <div class="flex items-center">
                    <div v-for="(artists, artistsIndex) in item.ar" :key="artistsIndex"
                        class=" text-xs font-bold text-gray-600 truncate" :style="{
                                color: item.id === nowPlayingId ? 'var(--primary-text-color)' : ''
                            }">
                        <span class="title">{{ artists.name }}</span>
                        <span v-if="item.ar.length !== 1 && artistsIndex !== item.ar.length - 1">&nbsp;/&nbsp;</span>
                    </div>
                </div>
            </div>
            <div class=" flex items-center" style="width: 40%;height: 100%;">
                <p class="title font-bold text-sm" :style="{
                        color: item.id === nowPlayingId ? 'var(--primary-text-color)' : ''
                    }">{{ item.al.name }}</p>
            </div>
            <div class=" relative flex items-center text-xs font-bold text-gray-600" style="width: 12%;height: 100%;"
                :style="{
                    color: item.id === nowPlayingId ? 'var(--primary-text-color)' : ''
                }">
                <div v-if="item.isLike" class=" flex items-start absolute" style="left: -50px;">
                    <SvgIcon iconClass="liked" class=""
                        style="width: 30px;padding:0px 5px;color: var(--primary-text-color);" />
                </div>
                <p>{{ ~~(item.dt / 1000 / 60) }}</p>
                <p>&nbsp;:&nbsp;</p>
                <p v-if="~~(item.dt / 1000 % 60) < 10">0</p>
                <p>{{ ~~(item.dt / 1000 % 60) }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { songListApi } from '@/request/api/detail'
import { onMounted, reactive, inject } from 'vue';
import { useHowlerStore } from '@/store/howler-store';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user-store';
import { getUserLikeSongs } from '@/request/api/user'
const howlerStore = useHowlerStore()
const { nowPlayingId } = storeToRefs(howlerStore)
const props = defineProps(['id'])
const showContextMenu = inject<Function>('showContextMenu', () => { })
type songListType = {
    songs?: Array<{
        id: number
        al: {
            picUrl: string
            name: string
        }
        dt: number
        name: string
        alia: string[]
        ar: Array<{
            name: string
        }>
        fee: number
        isLike: boolean
    }>
}
const songList = reactive<songListType>({
    songs: undefined,
})
onMounted(async () => {
    const { data: songListRes } = await songListApi(props.id)
    songList.songs = songListRes.songs
    const userStore = useUserStore()
    if (userStore.userProfile.userId && songList.songs) {
        const { data: userLikeSongsListRes } = await getUserLikeSongs(userStore.userProfile.userId)
        songList.songs.forEach((item) => {
            for (let index = 0; index < userLikeSongsListRes.ids.length; index++) {
                if (item.id === userLikeSongsListRes.ids[index]) {
                    item.isLike = true
                    break
                } else if (index === userLikeSongsListRes.ids.length - 1) {
                    item.isLike = false
                }
            }
        })
    }
})
const playSong = (id: number) => {
    howlerStore.nowPlayingId = id
}

</script>

<style scoped>
.list-background:hover {
    background-color: rgba(128, 128, 128, 0.2);

}

.list-background:active {
    scale: .95;
}

.vip-icon {
    background-color: #a5a5a53f;
}
</style>