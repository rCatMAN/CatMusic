<template>
    <div class=" w-max rounded-3xl overflow-hidden" style="border: solid 3px var(--primary-color);">
        <!-- <qrcodevue v-if="qrUrl" :value="qrUrl" :size="size" level="H" :margin="5" /> -->
        <img v-show="qrUrl" :src="qrUrl" alt="">
    </div>
</template>

<script setup lang='ts'>
import qrcodevue from 'qrcode.vue'
import { onMounted, onUnmounted, ref } from 'vue';
import { qrcodeKeyApi, qrcodeCreateApi, qrcodeCheckApi } from '@/request/api/user';
const size = ref(150)
const qrUrl = ref()
let intervalId: any
onMounted(async () => {
    const { data: keyRes } = await qrcodeKeyApi()
    if (keyRes.code === 200) {
        console.log(1, keyRes)
        const { data: createRes } = await qrcodeCreateApi(keyRes.data.unikey)
        if (createRes.code === 200) {
            qrUrl.value = createRes.data.qrimg
            console.log(2, createRes)
            console.log(2, qrUrl.value)
            let i = 3
            intervalId = setInterval(async () => {
                const { data: checkRes } = await qrcodeCheckApi.checkHook(keyRes.data.unikey)
                console.log(i, checkRes)
                i++
                if (checkRes.code === 803) {
                    clearInterval(intervalId)
                    console.log(checkRes.cookie)
                    localStorage.setItem('cookie', checkRes.cookie)
                } else if (checkRes.code === 800) {
                    clearInterval(intervalId)
                }
            }, 4000)
        }
    }
})
onUnmounted(() => {
    clearInterval(intervalId)
})
</script>

<style scoped>

</style>