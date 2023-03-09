<template>
    <div v-if="simiMv.values" class="w-full">
        <span class="text-2xl font-bold">相似Mv</span>
    </div>
    <div v-if="simiMv.values" class="mt-8 w-full flex items-start justify-between flex-wrap">
        <div v-for="(item, index) in simiMv.values" :key="index" class="mb-8" style="width: 17.5%;">
            <div @click="router.push({ path: '/mv', query: { id: item.id } }); reload()" @mouseenter="selectedIndex = index"
                @mouseleave="selectedIndex = 100" class=" relative cursor-pointer">
                <el-image :src="item.cover + '?param=800y450'" fit="cover" class="w-full rounded-xl  relative z-10"
                    style="aspect-ratio:16/9;" lazy />
                <div class="absolute rounded-full overflow-hidden duration-200 ease-out z-30"
                    style="aspect-ratio:1/1;height: 30%; left: 50%;top: 50%;transform: translate(-50%,-50%);background: hsla(0,0%,100%,.1);backdrop-filter: blur(7px);border: 1px solid hsla(0,0%,100%,.08);"
                    :style="{
                        opacity: selectedIndex === index ? '1' : '0',
                    }">
                    <SvgIcon iconClass="play" class="text-white absolute"
                        style="width: 40%;left: 50%;top: 50%;transform: translate(-40%,-50%);" />
                </div>
                <div class="shadow duration-300 ease-out"
                    :style="{ 'background-image': `url(${item.cover})`, opacity: selectedIndex === index ? '1' : '0' }">
                </div>
            </div>
            <div class="w-full mt-2">
                <span class="title cursor-pointer font-bold">{{ item.name }}</span>
            </div>
            <div class="text-xs text-gray-500 mt-1">
                <span>{{ item.artistName }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, reactive, computed, ref, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { simiMvApi } from '@/request/api/detail'
const route = useRoute()
const router = useRouter()
const selectedIndex = ref(100)
const reload = inject<Function>('reload', () => { })
const id = computed(() => {
    return route.query.id
})
type simiMvType = {
    values?: Array<{
        name: string
        cover: string
        id: number
        artistName: string
    }>
}
const simiMv = reactive<simiMvType>({
    values: undefined
})
onMounted(async () => {
    const { data: simiMvRes } = await simiMvApi(id.value)
    simiMv.values = simiMvRes.mvs
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