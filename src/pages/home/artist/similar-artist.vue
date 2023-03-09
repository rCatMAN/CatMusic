<template>
    <div v-if="similarArtistList.values" class="w-full">
        <span class="text-2xl font-bold">相似艺人</span>
    </div>
    <div v-if="similarArtistList.values && isLogin" class="mt-8 w-full flex items-start justify-between flex-wrap">
        <div v-for="(item, index) in similarArtistList.values" :key="index" class="mb-8" style="width: 15%;">
            <div @mouseenter="selectedIndex = index" @mouseleave="selectedIndex = 100" class=" relative cursor-pointer">
                <el-image @click="toArtistPage(item.id)" :src="item.picUrl + '?param=500y500'" alt=""
                    class="rounded-full relative z-10" fit="cover" style="width:90%;aspect-ratio: 1/1;" lazy />
                <div class="shadow duration-300 ease-out"
                    :style="{ 'background-image': `url(${item.picUrl})`, opacity: selectedIndex === index ? '1' : '0' }">
                </div>
            </div>
            <div class="w-full flex items-center justify-center mt-2">
                <span @click="toArtistPage(item.id)" class="title cursor-pointer font-bold">{{ item.name }}</span>
            </div>
        </div>
    </div>
    <div v-if="!isLogin" class="mt-8 flex items-center justify-center">
        <span class="text-2xl font-bold">登录后为您推荐相似艺人</span>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, reactive, computed, ref, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { similarArtistApi } from '@/request/api/detail'
import { useUserStore } from '@/store/user-store'
import { storeToRefs } from 'pinia';
const userStore = useUserStore()
const { isLogin } = storeToRefs(userStore)
const route = useRoute()
const router = useRouter()
const selectedIndex = ref(100)

const reload = inject<Function>('reload', () => { })
const id = computed(() => {
    return route.query.id
})
type similarArtistType = {
    values?: Array<{
        name: string
        picUrl: string
        id: number
    }>
}
const similarArtistList = reactive<similarArtistType>({
    values: []
})
onMounted(async () => {
    if (isLogin.value) {
        const { data: similarArtistRes } = await similarArtistApi(id.value)
        for (let i = 0; i < 12; i++) {
            similarArtistList.values?.push(similarArtistRes.artists[i])
        }
    }
})
const toArtistPage = (id: number) => {
    router.push({
        path: '/artist',
        query: { id: id }
    })
    reload()
}
</script>

<style scoped>
.shadow {
    position: absolute;
    left: 0;
    top: 0;
    width: 90%;
    height: 90%;
    filter: blur(10px) opacity(.9);
    transform: scale(.9) translateY(15%);
    background-size: cover;
    border-radius: 1000px;
    aspect-ratio: 1/1;
    z-index: 0;
}
</style>