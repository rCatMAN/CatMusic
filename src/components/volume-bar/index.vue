<template>
    <div class=" absolute flex items-center justify-between" style="width: 100px;">
        <div class="icon-footer-box rounded-xl" style="padding: 4px;">
            <SvgIcon iconClass="volume" style="width: 20px;" />
        </div>
        <div class="w-full h-1 rounded-2xl" style="background-color: rgba(229 ,231, 235,0.5);">
        </div>
        <div class=" absolute h-1 rounded-2xl "
            :style="{ left: '28px', width: barWidth, backgroundColor: 'var(--primary-back-color)' }">
        </div>
        <div v-show="selectIndex === 1 || isDraging === true" class=" absolute w-2 h-2 rounded-full bg-green-500"
            :style="{ left: `calc(${barWidth} + 28px - 4px)`, backgroundColor: 'var(--primary-back-color)' }">

        </div>
        <div @mouseenter="selectIndex = 1" @mouseleave="selectIndex = 100" @mousedown="addMouseMoveListener"
            ref="volumeBar" class=" absolute h-3 rounded-2xl cursor-pointer"
            :style="{ left: '28px', width: 'calc(100% - 28px)' }">
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, computed, onMounted } from 'vue';
import { useHowlerStore } from '@/store/howler-store';
import { storeToRefs } from 'pinia';
const howlerStore = useHowlerStore()
const { howler } = storeToRefs(howlerStore)
const selectIndex = ref(100)
const isDraging = ref(false)
const volumeBar = ref<any>(null)
const barPosition = ref<any>(null)
const dragingX = ref(0)
const barWidth = computed(() => {
    if (barPosition.value) {
        if (dragingX.value - barPosition.value.left < 0) {
            return '0px'
        } else if (dragingX.value - barPosition.value.left > barPosition.value.width) {
            return barPosition.value.width + 'px'
        } else {
            return dragingX.value - barPosition.value.left + 'px'
        }
    } else {
        '100%'
    }
})
const volume = computed(() => {
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
    howler.value.volume(volume.value)
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

<style scoped>

</style>