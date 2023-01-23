<script setup lang="ts">
</script>

<template>
 <div class="bg-gray-300 homePage overflow-hidden">
    <router-view/>
 </div>
</template> 

<style scoped>
.homePage{
    width: 85% ;
    min-width: 1000px;
    height: 90%;
    min-height: 700px;
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 30px;
    box-shadow:0 5px 17px 9px #0000001a;
}
</style>
