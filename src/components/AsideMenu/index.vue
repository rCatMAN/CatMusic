<script setup lang="ts">
import RouterMenu from './RouterMenu.vue';
</script>

<template>
  <div class="left-0 bottom-0 fixed w-52 bg-white Aside">

    <RouterMenu/>
  </div>
</template>

<style scoped>
.Aside{
  height: calc(100% - 4rem);
  border-right: 2px solid var(--primary-color);
}
</style>
