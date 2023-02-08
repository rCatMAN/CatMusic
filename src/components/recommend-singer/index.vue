<template>
    <div>
        <div class="flex items-start justify-start " style="min-width: 500px;">
            <div v-for=" (item, index) in singerList.values" :key="index" class=" mr-10 mb-8" style="width: 18%;">
                <div @mouseenter="selectedIndex = item" @mouseleave="selectedIndex = 100"
                    class="img-Shadow relative duration-200 ease-out rounded-full overflow-hidden cursor-pointer ">
                    <img :src="item.img1v1Url" style="width: 100%;">
                    <div class="absolute w-12 h-12 rounded-full overflow-hidden duration-200 ease-out"
                        style="left: 50%;top: 50%;transform: translate(-50%,-50%);background: hsla(0,0%,100%,.14);backdrop-filter: blur(8px);border: 1px solid hsla(0,0%,100%,.08);"
                        :style="{
                            opacity: selectedIndex === item ? '1' : '0',
                        }">
                        <SvgIcon iconClass="play" class="text-white absolute"
                            style="width: 23px;left: 50%;top: 50%;transform: translate(-40%,-50%);" />
                    </div>
                </div>
                <div class=" mt-4 flex items-center justify-center font-bold duration-200 ease-out">
                    <span class="title cursor-pointer">{{ item.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { hotSingerApi } from '@/request/api/Recommended'
import { onMounted, reactive, ref } from 'vue';
const singerList: any = reactive({})
const selectedIndex = ref(100)
onMounted(async () => {
    const { data: singerRes } = await hotSingerApi()
    singerList.values = singerRes.artists
    console.log('singerRes', singerList)
})
</script>

<style scoped>
.img-Shadow:hover {
    box-shadow: var(--primary-color) 0px 12px 15px -10px;
}
</style>