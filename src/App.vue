<script setup lang="ts">
import Home from "./pages/home/index.vue";
import ScrollLyric from "./components/scroll-lyric/index.vue";
</script>

<template>
  <div class="bg-gray-300" style="width: 100vw; height: 100vh">
    <router-view />
    <ScrollLyric></ScrollLyric>
  </div>
</template>

<style scoped></style>
