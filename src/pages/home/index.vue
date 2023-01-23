<template>
    <div class="bg-black home-Page overflow-hidden">
        <HeaderMenu/>
        <AsideMenu/>
        <FooterMenu/>
        <div class="main-Page bg-white">
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
.home-Page{
    width: 1500px;
    height: 868px;
    transform: translate(-50%, -50%);
    position: relative;
    top: 50%;
    left: 50%;
    border-radius: 30px;
    box-shadow:0 5px 17px 9px #0000001a;
}
.main-Page{
    position: absolute;
    width:calc(100% - 13rem);
    height: calc(100% - 9rem);
    right: 0px;
    top: 4rem;
}
</style>
