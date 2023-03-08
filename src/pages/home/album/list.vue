<template>
    <div>
        <div v-for="(item, index) in props.songs" :key="index" @click="playSong(item.id)"
            class="list-background flex items-center justify-start rounded-xl duration-200 ease-out cursor-pointer"
            style="padding: 8px;height: 50px;width: 100%;" :style="{
                backgroundColor: item.id === nowPlayingId ? 'var(--primary-light-color)' : ''
            }">
            <div class="flex items-center" style="height: 100%;width: 30px;">
                <span class="text-gray-600 font-bold">{{ index + 1 }}</span>
            </div>
            <div class="flex items-center" style="width: 100%;height: 100%;">
                <p class=" font-bold" :style="{
                    color: item.id === nowPlayingId ? 'var(--primary-text-color)' : ''
                }">{{ item.name }}</p>
                <p v-for="(aliaName, aliaIndex) in item.alia" :key="aliaIndex" class=" ml-3 text-xs  text-gray-500" :style="{
                    color: item.id === nowPlayingId ? 'var(--primary-text-color)' : ''
                }">{{ aliaName }}</p>
                <div v-if="item.fee === 1" class="vip-icon w-7 h-4 ml-2 rounded-sm flex items-center justify-center">
                    <span class=" font-bold" style="font-size: xx-small;">VIP</span>
                </div>
            </div>
            <div class="flex items-center" style="width: 12%;height: 100%;">
                <p class="text-xs font-bold text-gray-600" :style="{
                    color: item.id === nowPlayingId ? 'var(--primary-text-color)' : ''
                }">{{ dt[index].min }} : {{ dt[index].sec }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { reactive } from 'vue';
import { useHowlerStore } from '@/store/howler-store';
import { storeToRefs } from 'pinia';
const howlerStore = useHowlerStore()
const { nowPlayingId } = storeToRefs(howlerStore)
const dt = reactive<Array<{
    min: string | number
    sec: string | number
}>>([])
const props = defineProps<{
    songs?: Array<{
        name: string
        alia: string[]
        id: number
        fee: number
        dt: number
        al: {
            name: string
            picUrl: string
        }
        ar: Array<{
            name: string
        }>
    }>
}>()
if (props.songs) {
    for (let item of props.songs) {
        if (~~(item.dt / 1000 % 60) < 10) {
            dt.push({ min: ~~(item.dt / 1000 / 60), sec: '0' + ~~(item.dt / 1000 % 60) })
        } else {
            dt.push({ min: ~~(item.dt / 1000 / 60), sec: ~~(item.dt / 1000 % 60) })
        }
    }
}
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
