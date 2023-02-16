<template>
    <div class="bg-black">
        <HeaderMenu />
        <!-- <AsideMenu /> -->
        <keep-alive>
            <FooterMenu />
        </keep-alive>
        <div class="main-Page bg-white">
            <router-view />
        </div>
    </div>
</template>

<script setup lang="ts">
import AsideMenu from "../../components/aside-menu/index.vue"
import HeaderMenu from "../../components/header/index.vue"
import FooterMenu from "../../components/footer/index.vue"
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
