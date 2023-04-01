<template>
    <div class="w-full max-w-6xl flex justify-between mb-8">
        <div class="" style="width:45%">
            <Artist :keywords="keywords" />
        </div>
        <div style="width: 45%;">
            <Album :keywords="keywords" />
        </div>
    </div>
    <div class="mb-8 max-w-6xl" style="width: 100%;">
        <Song :keywords="keywords" />
    </div>
    <div class="mb-36 max-w-6xl">
        <Video :keywords="keywords" />
    </div>
</template>

<script setup lang='ts'>
import Artist from './artist.vue'
import Album from './album.vue'
import Song from './song.vue'
import Video from './video.vue'
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const keywords = computed<any>(() => {
    return route.query.keywords
})
</script>

<style scoped></style>