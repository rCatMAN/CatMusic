<template>
  <div class="left-0 bottom-0 fixed w-52 bg-white aside-box">
    <RouterMenu />
  </div>
</template>

<script setup lang="ts">
import RouterMenu from './RouterMenu.vue';
</script>

<style scoped>
.aside-box {
  padding-top: 4rem;
  height: 100%;
  border-right: 2px solid var(--primary-back-color);
}
</style>
