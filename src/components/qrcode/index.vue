<template>
<div>
    <qrcodevue :value="src" :size="size" level="H" />
</div>
</template>

<script setup lang='ts'>
import qrcodevue from 'qrcode.vue'
import { onMounted } from 'vue';
    import { ref } from 'vue';
    const props = defineProps<{
        src:string
    }>()
    const size = ref(150)
    onMounted(()=>{
        console.log("props",props.src)
    })
</script>

<style scoped>

</style>