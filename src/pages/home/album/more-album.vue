<template>
    <div class="w-full">
        <span class="font-bold text-2xl">More By {{ props.artistName }}</span>
    </div>
    <div class="w-full flex items-start mt-8">
        <div v-for="(item, index) in similarAlbum.values" :key="index" style="width: 18%;margin-right: 5%;"
            class="relative">
            <div class="relative">
                <el-image @mouseenter="selectedIndex = index" @mouseleave="selectedIndex = 100"
                    @click="toAlbumPage(item.id)" :src="item.picUrl + '?param=1080y1080'"
                    class="w-full cursor-pointer rounded-2xl z-10" lazy />
                <div class="absolute rounded-full overflow-hidden duration-200 ease-out z-30"
                    style="width: 25%;height: 25%; left: 50%;top: 50%;transform: translate(-50%,-50%);background: hsla(0,0%,100%,.14);backdrop-filter: blur(8px);border: 1px solid hsla(0,0%,100%,.08);"
                    :style="{
                        opacity: selectedIndex === index ? '1' : '0',
                    }">
                    <SvgIcon iconClass="play" class="text-white absolute"
                        style="width: 40%;left: 50%;top: 50%;transform: translate(-40%,-50%);" />
                </div>
            </div>
            <div class="shadow w-full duration-200 ease-out" style="max-width: 330px;"
                :style="{ 'background-image': `url(${item.picUrl})`, opacity: selectedIndex === index ? '1' : '0' }">
            </div>

            <div class="w-full truncate mt-2">
                <span @click="toAlbumPage(item.id)" class="title font-bold cursor-pointer duration-200 ease-out">{{
                    item.name }}</span>
            </div>
            <div class="w-full truncate -mt-1">
                <span class="text-xs text-gray-500">{{ item.type }} · {{ date[index] }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, reactive, inject, ref } from 'vue';
import { artistAlbumAPi } from "@/request/api/detail"
import { useRouter } from 'vue-router';
const router = useRouter()
const selectedIndex = ref(100)
const reload = inject<Function>('reload', () => { })
const date = reactive<number[]>([])
const props = defineProps<{
    artistId?: number,
    albumId?: number,
    artistName: string,
}>()
type similarAlbum = {
    values: Array<{
        name: string
        type: string
        publishTime: Date
        picUrl: string
        id: number
    }>
}
const similarAlbum = reactive<similarAlbum>({
    values: []
})
onMounted(async () => {
    const { data: artistAlbumRes } = await artistAlbumAPi(props.artistId, 0)
    for (let item of artistAlbumRes.hotAlbums) {
        if (item.id !== props.albumId) {
            similarAlbum.values?.push(item)
            date.push(new Date(item.publishTime).getFullYear())
            if (similarAlbum.values.length === 5) {
                break
            }
        }
    }
})
const toAlbumPage = (id: number) => {
    router.push({
        path: '/album',
        query: { id: id }
    })
    reload()
}
</script>

<style scoped>
.shadow {
    position: absolute;
    top: 5%;
    left: 0px;
    filter: blur(10px) opacity(.9);
    transform: scale(.92, .96);
    background-size: cover;
    border-radius: .75em;
    aspect-ratio: 1/1;
}
</style>