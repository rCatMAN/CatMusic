<template>
  <div class="bg-black">
    <keep-alive>
      <HeaderMenu />
    </keep-alive>
    <keep-alive>
      <FooterMenu v-show="!isVideoPlaying" />
    </keep-alive>
    <div class="main-page bg-white overflow-hidden">
      <router-view />
      <div class="container-bg py-10 mb-28 ">
        <div class="flex items-center max-w-6xl text-xs">
          <img src="@/icons/png/备案图标.png" class="mr-1 w-4">
          <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030702005396" target="_blank"
            class="mr-2">粤公网安备
            44030702005396号</a>
          |
          <a href="https://beian.miit.gov.cn/" target="_blank" class="ml-2">粤ICP备2023041798-1</a>
        </div>
      </div>
    </div>
    <Player class="fixed top-0 duration-500 ease-out z-50"
      :style="{ top: isShowPlayerPage === true ? '0vw' : '100vw' }" />
  </div>
  <ContextMenu :style="{ top: contextMenuY, left: contextMenuX }" ref="contextmenuRef" class="ContextMenu fixed"
    v-show="isShowContextMenu" :type="1" />
</template>

<script setup lang="ts">
import Player from "../../components/player/index.vue";
import HeaderMenu from "../../components/header/index.vue";
import FooterMenu from "../../components/footer/index.vue";
import ContextMenu from "@/components/contextmenu/index.vue"
import { useHowlerStore } from "@/store/howler-store";
import { storeToRefs } from "pinia";
import { watch, ref, provide } from "vue";

const howlerStore = useHowlerStore();
const { isShowPlayerPage, isVideoPlaying } = storeToRefs(howlerStore);
watch(isShowPlayerPage, () => {
  if (isShowPlayerPage.value) {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = scrollBarWidth + "px";
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "";
  }
});
const isShowContextMenu = ref(false)
const contextMenuY = ref()
const contextMenuX = ref()
type rightCLickEventType = {
  clientY: number,
  clientX: number,
}
const cancelContextMenu = () => {
  isShowContextMenu.value = false
  document.body.removeEventListener('mousedown', cancelContextMenu)
}
const rightClick = (e: rightCLickEventType) => {
  isShowContextMenu.value = true
  contextMenuY.value = e.clientY + "px"
  contextMenuX.value = e.clientX + "px"
  document.body.addEventListener('mousedown', cancelContextMenu)
}
provide('showContextMenu', rightClick)
</script>

<style>
.main-page {
  position: absolute;
  min-height: 85vh;
  right: 0px;
  padding-top: calc(4rem + 40px);
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'deyi';
}

@font-face {
  font-family: "deyi";
  src: url('../../font/deyi/Smiley_Sans_Oblique_斜体.woff2') format('woff2');
}
</style>
