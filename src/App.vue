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

<style scoped></style>
