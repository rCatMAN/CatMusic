<template>
  <div class="bg-white">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script setup lang="ts">
import { nextTick, provide, ref } from 'vue';
const isRouterAlive = ref(true)
const reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}
provide('reload', reload)
</script>

<style>
.title:hover {
  color: var(--primary-back-color)
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
  color: var(--primary-text-color);
  box-shadow: none;
  background-color: var(--primary-light-color);
}

.theme-button:hover {
  transition-property: all;
  transition-timing-function: ease-out;
  transition-duration: 150ms;
  color: white;
  box-shadow: var(--primary-back-color) 0px 0px 15px 0px;
  background-color: var(--primary-back-color);
  transform: scale(1.1);
}

.theme-button:active {
  transform: scale(0.86);
}
</style>
