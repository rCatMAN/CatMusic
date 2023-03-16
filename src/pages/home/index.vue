<template>
    <div class="bg-black">
        <keep-alive>
            <HeaderMenu />
        </keep-alive>
        <keep-alive>
            <FooterMenu v-show="!isVideoPlaying" />
        </keep-alive>
        <div class="main-Page bg-white overflow-hidden">

            <router-view />
        </div>
        <player class="fixed top-0 duration-500 ease-out z-50"
            :style="{ top: isShowPlayerPage === true ? '0vw' : '100vw' }" />
    </div>
</template>

<script setup lang="ts">
import player from "../../components/player/index.vue"
import HeaderMenu from "../../components/header/index.vue"
import FooterMenu from "../../components/footer/index.vue"
import { useHowlerStore } from "@/store/howler-store"
import { storeToRefs } from "pinia"
import { watch } from "vue"
const howlerStore = useHowlerStore()
const { isShowPlayerPage, isVideoPlaying } = storeToRefs(howlerStore)
watch(isShowPlayerPage, () => {
    if (isShowPlayerPage.value) {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
        document.body.style.paddingRight = scrollBarWidth + 'px'
        document.body.style.overflow = 'hidden'

    } else {
        document.body.style.overflow = 'auto'
        document.body.style.paddingRight = ''
    }
})
</script>

<style>
.main-Page {
    position: absolute;
    width: 100%;
    min-height: 85vh;
    right: 0px;
    padding-top: calc(4rem + 40px);
    padding-left: 7%;
    padding-right: 7%;
}
</style>
