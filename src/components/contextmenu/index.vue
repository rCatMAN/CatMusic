<template>
    <div class="context-menu shadow-lg min-w-max z-50  ">
        <div v-for="(opitions, index) in contextMenuOptions" :key="index"
            class="item  cursor-pointer rounded-md py-1 px-2 flex">

            <span>{{ opitions.title }}</span>
        </div>

    </div>
</template>

<script setup lang='ts'>
import { reactive, onMounted } from 'vue'
const props = defineProps<{
    type: number
}>()
let contextMenuOptions = reactive([{ title: "下一首播放", }, { title: "添加到喜欢" }, { title: "收藏到歌单" }])
onMounted(() => {
    switch (props.type) {
        case 0:
            contextMenuOptions = reactive([{ title: "播放" }, { title: "添加到我最爱的音乐" }])
            break;

        default:
            break;
    }
})

</script>

<style scoped>
.context-menu {
    backdrop-filter: saturate(200%) blur(30px);
    /* background-color: hsla(0, 0%, 100%, 0.86); */
    background-color: var(--primary-light-color);

    border-radius: 10px;
    padding: 5px;
}

.item {
    color: var(--primary-text-color);
}

.item:hover {
    background-color: var(--primary-back-color);
    color: white;
}
</style>