<template>
    <div class="bg-black">
        <HeaderMenu/>
        <AsideMenu/>
        <FooterMenu/>
        <div class="mainPage bg-white">
            <router-view/>
        </div>
    </div>
</template>


<script setup lang="ts">
import AsideMenu from "../../components/AsideMenu/index.vue"
import HeaderMenu from "../../components/HeaderMenu/index.vue"
import FooterMenu from "../../components/FooterMenu/index.vue"
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