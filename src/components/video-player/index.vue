<template>
    <div>
        <div v-if="mvUrl.values" class="flex items-center justify-center">
            <video class="aspect-video rounded-3xl w-full " :src="mvUrl.values?.url" controls></video>
        </div>
        <div v-if="videoUrl.values" class="flex items-center justify-center">
            <video class="aspect-video rounded-3xl w-full" :src="videoUrl.values[0].url" controls></video>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useRoute } from 'vue-router';
import { computed, onMounted, onUnmounted, reactive } from 'vue';
import { mvUrlApi, videoUrlApi } from '@/request/api/url'
import { useHowlerStore } from '@/store/howler-store';
import { storeToRefs } from 'pinia';
const route = useRoute()
const howlerStore = useHowlerStore()
const { howler } = storeToRefs(howlerStore)
const id = computed<any>(() => {
    if (props.type) {
        return route.query.id
    } else {
        return route.query.vid
    }

})
enum videoType {
    videos,
    Mvs
}
const props = defineProps<{
    type: videoType
}>()
type mvUrlType = {
    values?: {
        url: string
        r: number
    }
}
const mvUrl = reactive<mvUrlType>({
    values: undefined
})
type videoUrlType = {
    values?: Array<{
        url: string
    }>
}
const videoUrl = reactive<videoUrlType>({
    values: undefined
})
onMounted(async () => {
    howlerStore.isVideoPlaying = true
    if (howler.value) {
        howlerStore.isPlaying = false
        howler.value.pause()
    }
    if (props.type === videoType.Mvs) {
        const { data: mvUrlRes } = await mvUrlApi(id.value)
        mvUrl.values = mvUrlRes.data
    } else if (props.type === videoType.videos) {
        const { data: videoUrlRes } = await videoUrlApi(id.value)
        console.log('videoUrlRes: ', videoUrlRes);
        videoUrl.values = videoUrlRes.urls
    }
})
onUnmounted(() => {
    howlerStore.isVideoPlaying = false
})
</script>

<style scoped></style>