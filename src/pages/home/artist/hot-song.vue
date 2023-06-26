<template>
  <div class="w-full flex items-center justify-between">
    <span class="text-2xl font-bold">热门单曲</span>
  </div>
  <div class="w-full flex items-center justify-start flex-wrap mt-4 overflow-hidden"
    :style="{ height: isShow === true ? 'auto' : '162px' }">
    <div @click="playSong(item.id)" v-for="(item, index) in artistHotSong.values" :key="index"
      class="song-box w-1/4 flex items-center rounded-xl duration-300 ease-out cursor-pointer"
      style="height: 54px; padding: 8px" :style="{
          backgroundColor: item.id === nowPlayingId ? 'var(--primary-light-color)' : '',
        }">
      <el-image :src="item.al.picUrl + '?param=100y100'" class="w-11 rounded-lg" loading="lazy" />
      <div class="ml-3 flex flex-col items-start justify-center w-full truncate">
        <div class="w-full flex items-start truncate">
          <span class="font-bold text-sm mb-1" :style="{
              color: item.id === nowPlayingId ? 'var(--primary-text-color)' : '',
            }">{{ item.name }}</span>
          <div v-if="item.fee === 1" class="vip-icon w-7 h-4 ml-2 rounded-sm flex items-center justify-center" :style="{
              backgroundColor:
                item.id === nowPlayingId ? 'var(--primary-light-color)' : '',
            }">
            <span class="font-bold" style="font-size: xx-small" :style="{
                color: item.id === nowPlayingId ? 'var(--primary-text-color)' : '',
              }">VIP</span>
          </div>
        </div>
        <div class="w-full truncate" style="margin-top: -5px">
          <span v-for="(item2, index2) in item.ar" :key="index2" class="text-xs text-gray-500" :style="{
              color: item.id === nowPlayingId ? 'var(--primary-text-color)' : '',
            }">{{ item2.name }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-4">
    <span @click="isShow = !isShow" class="title text-sm font-bold text-gray-500 duration-200 ease-out cursor-pointer">{{
      isShow === true ? "收起" : "查看更多" }}</span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, computed, ref } from "vue";
import { useRoute } from "vue-router";
import { artistHotSongAPi } from "@/request/api/detail";
import { useHowlerStore } from "@/store/howler-store";
import { storeToRefs } from "pinia";
const howlerStore = useHowlerStore();
const { nowPlayingId } = storeToRefs(howlerStore);
const route = useRoute();
type artistHotSong = {
  values?: Array<{
    ar: Array<{
      name: string;
    }>;
    al: {
      picUrl: string;
    };
    id: number;
    name: string;
    fee: number;
  }>;
};
const artistHotSong = reactive<artistHotSong>({
  values: undefined,
});
const id = computed(() => {
  return route.query.id;
});
const isShow = ref(false);
onMounted(async () => {
  const { data: artistHotSongRes } = await artistHotSongAPi(id.value);
  artistHotSong.values = artistHotSongRes.songs;
});
const playSong = (id: number) => {
  howlerStore.nowPlayingId = id;
};
</script>

<style scoped>
.song-box:hover {
  background-color: rgba(209, 209, 214, 0.28);
}

.song-box:active {
  scale: 0.92;
}

.vip-icon {
  background-color: #a5a5a53f;
}
</style>
