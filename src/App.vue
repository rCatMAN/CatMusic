<template>
  <div class="bg-white" style="width: 100vw; height: 100vh">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script setup lang="ts">
import { nextTick,provide,ref } from 'vue';
const isRouterAlive = ref(true)
const reload = ()=>{
  isRouterAlive.value = false
  nextTick(()=>{
    isRouterAlive.value = true
  })
}
provide('reload',reload)
</script>

<style>
.title:hover{
  color:var(--primary-color)
}
.theme-button {
    user-select: none;
    transition-property: all;
    transition-timing-function: ease-out;
    transition-duration: 150ms;
    border-radius: 10px;

}

.theme-button {
    transition-property: all;
    transition-timing-function: ease-out;
    transition-duration: 150ms;
    color: white;
    box-shadow: none;
    background-color: var(--primary-color);
}

.theme-button:hover {
    transition-property: all;
    transition-timing-function: ease-out;
    transition-duration: 150ms;
    color: white;
    box-shadow: var(--primary-color) 0px 0px 15px 0px;
    background-color: var(--primary-color);
}

.theme-button:active {
    transform: scale(0.86);
}
</style>
