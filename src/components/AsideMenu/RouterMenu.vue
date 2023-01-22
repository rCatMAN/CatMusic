<script setup lang='ts'>
import { useRouter,useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()
const routerMenuList = [
    {
        path: "/musichall",
        name: "音乐馆",
    },
    {
        path: "/radios",
        name: "电台",
    },
    {
        path: "/videos",
        name: "视频",
    }

]
const toPage = (path: string) => {
    router.push({
        path: path
    })
}
</script>

<template>
    <div class="flex items-center flex-col justify-around mt-8 exploreMenu">
        <div 
            v-for="(item, index) in routerMenuList" 
            :key="index"
            @click="toPage(item.path)" 
            class="routerButtonBox w-3/4 h-10 rounded-xl cursor-pointer flex items-center justify-center text-sm"
            :class="route.path === item.path?'routerButtonBoxDown':''"
            >
            <span class="font-bold">{{ item.name }}</span>
        </div>
    </div>
</template>

<style scoped>
.exploreMenu{
    height:200px
}
.routerButtonBox {
  user-select: none;
  transition-property: all;
  transition-timing-function: ease-out;
  transition-duration: 150ms;
  border-radius: 10px;

}
.routerButtonBox:hover {
  transition-property: all;
  transition-timing-function: ease-out;
  transition-duration: 150ms;
  color: white;
  box-shadow: none;
  background-color: var(--primary-color);
}
.routerButtonBoxDown {
  transition-property: all;
  transition-timing-function: ease-out;
  transition-duration: 150ms;
  color: white;
  box-shadow: var(--primary-color) 0px 0px 15px 0px;
  background-color: var(--primary-color);
}
.routerButtonBox:active{
  transform: scale(0.86);
}
</style>