<template>
    <div class="relative bg-white flex flex-col" style="width:100%;min-height: 100vh;">
        <div class="relative">
            <video class="relative" style="width: 100vw;height: 600px;object-fit: cover;" preload="auto" loop autoplay
                src="https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt778f65cedfee54fd/63bcad5b08dfb21202a7794d/VAL_Ep6_Homepage-CG-Video_V5.mp4">
            </video>
            <div class="absolute top-0 left-1/2 text-white text-8xl font-medium flex items-center justify-center"
                style="width: 800px;height: 150px;transform: translateX(-50%);top: 200px;letter-spacing: 10px;">
                VALORANT
            </div>
            <div @mouseenter="isButtonHover = true" @mouseleave="isButtonHover = false"
                class="enter-button absolute bottom-20 left-1/2 -translate-x-1/2 overflow-hidden cursor-pointer"
                style="width: 250px;height: 56px;">
                <button @click="router.push({ path: '/musichall' })"
                    class="absolute w-full h-full bg-red-500 font-bold text-white text-sm">
                    <span class="relative z-10">进入</span>
                </button>
                <div class="bg-black h-full absolute duration-500 ease-out" style="width: 110%;"
                    :style="{ transform: isButtonHover ? 'translateX(-5%) skew(-10deg)' : 'translateX(-110%)skew(-10deg)' }">
                </div>
            </div>
        </div>
        <div class="relative w-full" style="height: 650px;">
            <video class="" style="object-fit: cover;position:absolute;width: 100vw;height: 100%;"
                src="https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt29d7c4f6bc077e9e/5eb26f54402b8b4d13a56656/agent-background-generic.mp4"
                autoplay preload="auto" loop></video>
            <AnimCard />
        </div>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import AnimCard from '@/components/animation-card/index.vue'
const router = useRouter()
const isButtonHover = ref(false)
onMounted(() => {

})
</script>

<style scoped>
.enter-button::before {
    content: '';
    z-index: 10;
    width: 250px;
    height: 56px;
    position: absolute;
    border: 2px solid #fff;
}
</style>