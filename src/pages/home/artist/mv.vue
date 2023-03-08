<template>
    <div class="w-full">
        <span class="text-2xl font-bold">MVs</span>
    </div>
    <div class="mt-8 w-full flex items-start justify-between flex-wrap">
        <div v-for="(item, index) in artistMvList.values" :key="index" class="mb-8" style="width: 17.5%;">
            <div @mouseenter="selectedIndex = index" @mouseleave="selectedIndex = 100" class=" relative cursor-pointer">
                <el-image :src="item.imgurl16v9" fit="cover" class="w-full rounded-xl  relative z-10"
                    style="aspect-ratio:16/9;" lazy />
                <div class="shadow duration-300 ease-out"
                    :style="{ 'background-image': `url(${item.imgurl16v9})`, opacity: selectedIndex === index ? '1' : '0' }">
                </div>
            </div>
            <div class="w-full mt-2">
                <span class="title cursor-pointer font-bold">{{ item.name }}</span>
                <div>
                    <span class="title cursor-pointer mt-1 text-xs text-gray-500">{{ item.publishTime }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, reactive, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { artistMvAPi } from '@/request/api/detail'
const route = useRoute()
const selectedIndex = ref(100)
const id = computed(() => {
    return route.query.id
})
type artistMvType = {
    values?: Array<{
        name: string
        imgurl16v9: string
        publishTime: string
    }>
}
const artistMvList = reactive<artistMvType>({
    values: undefined
})
onMounted(async () => {
    const { data: artistMvRes } = await artistMvAPi(id.value)
    artistMvList.values = artistMvRes.mvs
})
</script>

<style scoped>
.shadow {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    filter: blur(10px) opacity(.9);
    transform: scale(.9) translateY(2px);
    background-size: cover;
    border-radius: 12px;
    aspect-ratio: 1/1;
    z-index: 0;
}
</style>