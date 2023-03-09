<template>
  <div class="mb-96">
    <p v-if="!isLogin" class="mb-8 text-2xl font-bold">私人推荐 </p>
    <div v-if="!isLogin" class="mt-4 w-full h-20 flex items-center justify-center">
      <p class="text-2xl font-bold">登录后即可为您定制推荐歌单</p>
    </div>
    <p v-if="isLogin" class="mb-8 text-3xl font-bold">Welcome back 今日为你推荐</p>
    <div v-if="isLogin" class="mb-20">
      <HorizontalSquares />
    </div>
    <div class="mb-20 mt-20">
      <RecommendCard />
    </div>
    <div class="mb-20">
      <p class="mb-8 text-2xl font-bold">热门歌手</p>
      <RecommendSinger />
    </div>
    <div>
      <p class="mb-8 text-2xl font-bold">推荐歌单</p>
      <RecommendedPlaylist />
    </div>
  </div>
</template>

<script setup lang="ts">
import HorizontalSquares from "@/components/horizontal-squares/index.vue"
import RecommendCard from "@/components/recommend-card/index.vue"
import RecommendSinger from "@/components/recommend-singer/index.vue"
import RecommendedPlaylist from '@/components/horizontal-squares/recommended-Playlist.vue'
import { useUserStore } from "@/store/user-store/index"
import { computed } from "vue";
const store = useUserStore()
const isLogin = computed<boolean>(() => {
  return store.isLogin
})
</script>

<style scoped></style>
