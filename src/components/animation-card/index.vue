<template>
    <div class="w-full h-full relative flex items-center justify-between" style="padding-left: 5%;padding-right: 5%;">
        <div v-for="(item, index) in characterArr.values" :key="index" @mouseenter="selectIndex = index"
            @mouseleave="selectIndex = 100" class="card-box relative cursor-pointer" style="">
            <div class="absolute w-full h-full">
                <el-image class="card w-full h-full duration-500 ease-out" fit="cover" :src="item.backgroundUrl"
                    :style="{ transform: selectIndex === index ? ' perspective(900px) translateY(-5%) rotateX(25deg) translateZ(0)' : '', 'box-shadow': selectIndex === index ? '2px 35px 32px -8px rgba(0, 0, 0, 0.75)' : '', filter: selectIndex === index ? ' brightness(0.5)' : '' }" />
            </div>
            <div>
                <el-image class="character w-full h-full absolute duration-500 ease-out" fit="cover"
                    :src="item.characterUrl"
                    :style="{ opacity: selectIndex === index ? '1' : '0', transform: selectIndex === index ? ' translate3d(0%,-15%,100px)' : '' }" />
            </div>
            <div class=" absolute bottom-12 left-1/2 duration-500 ease-out"
                :style="{ transform: selectIndex === index ? ' translateY(-80px) translateX(-50%)' : 'translateX(-50%)' }">
                <span class="font-bold text-2xl text-red-500">{{ item.name }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
const selectIndex = ref(100)
const characterArr = reactive({
    values: [
        {
            backgroundUrl: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt90da44b1a3809ba3/5fd2a2d58593bc52457ee3d7/VALORANT_Jett_Dark.jpg',
            characterUrl: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltceaa6cf20d328bd5/5eb7cdc1b1f2e27c950d2aaa/V_AGENTS_587x900_Jett.png',
            name: 'JETT'
        },
        {
            backgroundUrl: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltca6ea6b077533429/5fd2a2c67c43e43bf4196b69/VALORANT_Omen_Dark.jpg',
            characterUrl: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt4e5af408cc7a87b5/5eb7cdc17bedc8627eff8deb/V_AGENTS_587x900_Omen.png',
            name: 'OMEN'
        },
        {
            backgroundUrl: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt24b827486453f3ff/5fd2a2dd752123476ba03a97/VALORANT_Raze_Dark.jpg',
            characterUrl: '	https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt6fef56a8182d0a81/5ebf2c2798f79d6925dbd6b4/V_AGENTS_587x900_ALL_Raze_2.png',
            name: 'RAZE'
        },
        {
            backgroundUrl: 'src/picture/gekko.jpg',
            characterUrl: '	https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltc942933be01094ae/6402724fe9f75310481c3851/V_AGENTS_587x900_Gekko2.png',
            name: 'GEKKO'
        }
    ]
})
</script>

<style scoped>
.card-box {
    width: 270px;
    height: 400px;
    perspective: 2500px;
}

.card::after {
    content: '';
    width: 100%;
    height: 100px;
    bottom: 0px;
    position: absolute;
    background-image: linear-gradient(to top, black, transparent);

}
</style>