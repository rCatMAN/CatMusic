<template>
  <div>
    <p class="mb-8 text-3xl font-bold">Welcome back</p>
    <div class="mb-20">
      <HorizontalSquares />
    </div>
    <div>
      <RecommendCard/>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrollLyric from "@/components/scroll-lyric/index.vue";
import HorizontalSquares from "@/components/horizontal-squares/index.vue"
import RecommendCard from "@/components/recommend-card/index.vue"
</script>

<style scoped>

</style>
