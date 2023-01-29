<template>
<div class=" w-max rounded-3xl overflow-hidden" style="border: solid 3px var(--primary-color);">
    <qrcodevue v-if="qrurl" :value="qrurl" :size="size" level="H" :margin="5" />
</div>
</template>

<script setup lang='ts'>
import qrcodevue from 'qrcode.vue'
import { onMounted,ref } from 'vue';
import { qrcodeKeyApi,qrcodeCreatApi,qrcodeCheckApi } from '@/request/api/user';
const size = ref(150)
const qrurl = ref()
onMounted(()=>{
    qrcodeKeyApi().then((keyRes)=>{
        console.log(1,keyRes)
        if(keyRes.code === 200){
            qrcodeCreatApi(keyRes.data.unikey).then((creatRes)=>{
            console.log(2,creatRes)
            if(creatRes.code === 200){
                qrurl.value = creatRes.data.qrurl
                qrcodeCheckApi.checkHook(keyRes.data.unikey).then((checkRes)=>{
                    console.log(3,checkRes)
                })
            }
        })
        }

    })
    
})
</script>

<style scoped>

</style>