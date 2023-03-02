<template>
    <div class=" absolute flex items-center justify-between" style="width: 100px;">
        <div class="icon-footer-box absolute rounded-xl " style="padding: 4px;left: -30%;">
            <SvgIcon iconClass="volume" style="width: 20px;" />
        </div>
        <div class="absolute w-full h-1 rounded-2xl" style="background-color: rgba(229 ,231, 235,0.5);">
        </div>
        <div class=" absolute h-1 rounded-2xl " :style="{ width: barWidth, backgroundColor: 'var(--primary-back-color)' }">
        </div>
        <div v-show="selectIndex === 1 || isDraging === true" class=" absolute w-2 h-2 rounded-full bg-green-500"
            :style="{ left: `calc(${barWidth} - 4px)`, backgroundColor: 'var(--primary-back-color)' }">

        </div>
        <div @mouseenter="selectIndex = 1" @mouseleave="selectIndex = 100" @mousedown="addMouseMoveListener" ref="volumeBar"
            class=" absolute h-3 rounded-2xl cursor-pointer" :style="{ width: '100%' }">
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, computed, onMounted } from 'vue';
import { useHowlerStore } from '@/store/howler-store';
import { storeToRefs } from 'pinia';
const howlerStore = useHowlerStore()
const { howler, volume } = storeToRefs(howlerStore)
const selectIndex = ref(100)
const isDraging = ref(false)
const volumeBar = ref<any>(null)
const barPosition = ref<any>(null)
const dragingX = ref(0)
const barWidth = computed(() => {
    return (volume.value * 100) + '%'
})
const volumeRatio = computed(() => {
    if ((dragingX.value - barPosition.value.left) < 0) {
        return 0
    } else if ((dragingX.value - barPosition.value.left) > barPosition.value.width)
        return 1
    else {
        return ((dragingX.value - barPosition.value.left) / barPosition.value.width)
    }
})
const addMouseMoveListener = () => {
    document.body.addEventListener('mousemove', moveEvent)
}
const moveEvent = (event: any) => {
    document.body.style['userSelect'] = 'none'
    dragingX.value = event.clientX
    barPosition.value = volumeBar.value.getBoundingClientRect()
    isDraging.value = true
    howlerStore.volume = volumeRatio.value
    if (howler.value) {
        howler.value.volume(volumeRatio.value)
    }
}
const mouseUpEvent = () => {
    document.body.style['userSelect'] = 'text'
    document.body.removeEventListener('mousemove', moveEvent)
    isDraging.value = false

}
onMounted(() => {
    if (isDraging.value = true) {
        document.body.addEventListener('mouseup', mouseUpEvent)
    }

})
</script>

<style scoped></style>