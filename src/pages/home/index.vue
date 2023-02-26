<template>
    <div class="bg-black">
        <keep-alive>
            <HeaderMenu />
        </keep-alive>
        <!-- <AsideMenu /> -->
        <keep-alive>
            <FooterMenu />
        </keep-alive>
        <div class="main-Page bg-white">
            <router-view v-slot="{ Component }">
                <component :is="Component" />
            </router-view>
        </div>
        <player class="fixed top-0 duration-500 ease-out z-50"
            :style="{ top: isShowPlayerPage === true ? '0vw' : '100vw' }" />
    </div>
</template>

<script setup lang="ts">
import player from "../home/player/index.vue"
import HeaderMenu from "../../components/header/index.vue"
import FooterMenu from "../../components/footer/index.vue"
import { useHowlerStore } from "@/store/howler-store"
import { storeToRefs } from "pinia"
const howlerStore = useHowlerStore()
const { isShowPlayerPage } = storeToRefs(howlerStore)
</script>

<style>
.main-Page {
    position: absolute;
    width: 100%;
    min-height: 85vh;
    right: 0px;
    padding-top: calc(4rem + 40px);
    padding-left: 4%;
    padding-right: 4%;
}
</style>
