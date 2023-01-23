<template>
    <div class="bg-black">
        <HeaderMenu/>
        <AsideMenu/>
        <FooterMenu/>
        <div class="main-Page bg-white mainPage">
            <router-view/>
        </div>
    </div>
</template>

<script setup lang="ts">
import AsideMenu from "../../components/aside-menu/index.vue"
import HeaderMenu from "../../components/header/index.vue"
import FooterMenu from "../../components/footer/index.vue"
</script>

<style>
.mainPage{
    position: absolute;
    width:calc(100% - 13rem);
    height: calc(100% - 9rem);
    right: 0px;
    top: 4rem;
}
</style>
