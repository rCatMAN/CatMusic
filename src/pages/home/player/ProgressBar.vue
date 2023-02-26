<template>
    <div>
        <div v-show="!(nowPlayingId === 1)" class="w-full">
            <div class="absolute h-1 w-full rounded-2xl" style="background-color: rgba(229 ,231, 235,0.5);">

            </div>
            <div class="absolute h-1 rounded-2xl"
                :style="{ width: `calc( ${progressBarRatio} * 100%)`, backgroundColor: 'var(--primary-back-color)' }">
            </div>
            <div v-show="selectIndex === 2 || isDraging === true" class=" absolute w-3 h-3 rounded-full -top-1" :style="{
                left: `calc( (${progressBarRatio} * 100%) - 6px )`, backgroundColor: 'var(--primary-back-color)'
            }">

            </div>
            <div @mouseenter="selectIndex = 2" @mouseleave="selectIndex = 100" ref="bar"
                @mousedown="addMouseMoveListener()" class="absolute w-full h-3 -top-1 cursor-pointer z-10">
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useHowlerStore } from '@/store/howler-store';
import { storeToRefs } from 'pinia';
import { ref, onMounted, reactive, computed } from 'vue'
const howlerStore = useHowlerStore()
const { nowPlayTime, nowPlayingId, isLoaded, howler, durationTime } = storeToRefs(howlerStore)
const selectIndex = ref(100)
const isDraging = ref(false)
const bar = ref()
const dragingX = ref(0)
type barPositionType = {
    values: {
        width: number
        left: number
        right: number
    }
}
const barPosition = reactive<barPositionType>({
    values: {
        width: 0,
        left: 0,
        right: 0
    }
})
const progressBarRatio = computed(() => {
    if (isLoaded.value) {
        if (isDraging.value) {
            if (dragingX.value > barPosition.values.right) {
                return 1
            } else if (dragingX.value < barPosition.values.left) {
                return 0
            } else {
                return (dragingX.value - barPosition.values.left) / barPosition.values.width
            }
        }
        else {
            return nowPlayTime.value / durationTime.value
        }
    } else {
        return 0
    }
})
const addMouseMoveListener = () => {
    if (isLoaded) {
        document.body.addEventListener('mousemove', dragBar)

    }
}
const dragBar = (event: any) => {

    document.body.style['userSelect'] = 'none'
    dragingX.value = event.clientX
    barPosition.values = bar.value.getBoundingClientRect()
    isDraging.value = true
}
const mouseUpEvent = () => {
    if (isDraging.value) {
        document.body.style['userSelect'] = 'text'
        howler.value.seek(progressBarRatio.value * durationTime.value)
        howlerStore.setNowPlayTime()
        document.body.removeEventListener('mousemove', dragBar)
        isDraging.value = false
        dragingX.value = 0
    }
}
onMounted(() => {
    document.body.addEventListener('mouseup', mouseUpEvent)
})
</script>

<style scoped>

</style>