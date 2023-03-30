<template>
  <div>
    <div class="w-full py-16 container-bg">
      <div class="max-w-7xl w-full">
        <Banner />
      </div>
    </div>

    <div v-if="!isLogin" class="mt-4 w-full h-20 flex items-center justify-center">
      <p class="text-xl mt-6 text-gray-600 ">
        登录后即可为您定制推荐歌单
      </p>
    </div>
    <div v-if="isLogin" class=" container-bg py-20">
      <div class="max-w-6xl w-full">
        <p v-if="isLogin" class="mb-8 text-3xl font-bold">Welcome back 今日为你推荐</p>
        <HorizontalSquares />
      </div>

    </div>
    <div class="container-bg py-20">
      <div class="max-w-6xl w-full">
        <RecommendCard />
      </div>
    </div>
    <div class="container-bg py-16">
      <div class="max-w-6xl">
        <p class="mb-8 text-2xl font-bold">热门歌手</p>
        <RecommendSinger />
      </div>
    </div>
    <div class="container-bg py-20">
      <div class="max-w-6xl">
        <p class="mb-8 text-2xl font-bold">推荐歌单</p>
        <RecommendedPlaylist />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HorizontalSquares from "@/components/horizontal-squares/index.vue";
import RecommendCard from "@/components/recommend-card/index.vue";
import RecommendSinger from "@/components/recommend-singer/index.vue";
import RecommendedPlaylist from "@/components/horizontal-squares/recommended-Playlist.vue";
import { useUserStore } from "@/store/user-store/index";
import { computed } from "vue";
const store = useUserStore();
const isLogin = computed<boolean>(() => {
  return store.isLogin;
});
</script>

<style scoped></style>
