<template>
    <div class=" w-max rounded-3xl overflow-hidden relative" style="border: solid 3px var(--primary-back-color);">
        <!-- <qrcodevue v-if="qrUrl" :value="qrUrl" :size="size" level="H" :margin="5" /> -->
        <img v-show="qrUrl" :src="qrUrl" alt="">
        <div v-show="checkCode === 802 && 800"
            class=" absolute top-0 left-0 w-full h-full flex items-center justify-center  bg-gray-500">
            <div class=" absolute " style="color: var(--primary-back-color);">
                <span>{{ checkString }}</span>
            </div>
        </div>

    </div>
</template>

<script setup lang='ts'>
import qrcodevue from 'qrcode.vue'
import { useRouter } from 'vue-router';
import { onMounted, onUnmounted, ref } from 'vue';
import { qrcodeKeyApi, qrcodeCreateApi, qrcodeCheckApi } from '@/request/api/user';
const router = useRouter()
const size = ref(150)
const qrUrl = ref()
const checkCode = ref(801)
const checkString = ref("二维码已过期 请刷新页面")
let intervalId: any
onMounted(async () => {
    const { data: keyRes } = await qrcodeKeyApi()
    if (keyRes.code === 200) {
        const { data: createRes } = await qrcodeCreateApi(keyRes.data.unikey)
        if (createRes.code === 200) {
            qrUrl.value = createRes.data.qrimg
            intervalId = setInterval(async () => {
                const { data: checkRes } = await qrcodeCheckApi.checkHook(keyRes.data.unikey)
                if (checkRes.code === 803) {
                    clearInterval(intervalId)
                    localStorage.setItem('cookie', checkRes.cookie)
                    checkCode.value = 803
                    router.push({
                        path: '/musichall'
                    })
                } else if (checkRes.code === 800) {
                    checkString.value = "二维码已过期 请刷新页面"
                    clearInterval(intervalId)
                } else if (checkRes.code === 802) {
                    checkCode.value = 802
                    checkString.value = "已扫描 待确认"
                }
            }, 3000)
        }
    }
})
onUnmounted(() => {
    if (intervalId) {
        clearInterval(intervalId)
    }
})
</script>

<style scoped>

</style>
