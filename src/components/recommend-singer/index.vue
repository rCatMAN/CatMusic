<template>
    <div>
        <div v-if="singerList.values" class="flex items-start justify-start " style="min-width: 500px;">
            <div v-for=" (item, index) in singerList.values" :key="index" class="relative mr-10 mb-8" style="width: 18%;">
                <el-image @mouseenter="selectedIndex = index" @mouseleave="selectedIndex = 100"
                    @click="router.push({ path: '/artist', query: { id: item.id } })"
                    class="relative z-20 rounded-full cursor-pointer" :src="item.img1v1Url + '?param=500y500'" fit="cover"
                    loading="lazy" />
                <div class="shadow w-full duration-200 ease-out" style="max-width: 330px;"
                    :style="{ 'background-image': `url(${item.img1v1Url + '?param=500y500'})`, opacity: selectedIndex === index ? '1' : '0' }">
                </div>
                <div class=" mt-4 flex items-center justify-center font-bold duration-200 ease-out">
                    <span @click="router.push({ path: '/artist', query: { id: item.id } })" class="title cursor-pointer">{{
                        item.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { hotSingerApi } from '@/request/api/Recommended'
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
type singerListType = {
    values?: Array<{
        img1v1Url: string
        name: string
        id: number
    }>
}
const singerList = reactive<singerListType>({
    values: undefined
})
const selectedIndex = ref(100)
onMounted(async () => {
    const { data: singerRes } = await hotSingerApi()
    singerList.values = singerRes.artists
    console.log('singerList.values: ', singerList.values);
})
</script>

<style scoped>
.shadow {
    position: absolute;
    top: 5%;
    left: 0px;
    filter: blur(10px) opacity(.9);
    transform: scale(.92, .96);
    background-size: cover;
    border-radius: 999px;
    aspect-ratio: 1/1;
}
</style>