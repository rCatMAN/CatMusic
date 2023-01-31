<template>
  <div>
    <p class="mb-8 text-3xl font-semibold">Listen Now</p>
    <div>
      <HorizontalSquares />
    </div>

  </div>
</template>

<script setup lang="ts">
import ScrollLyric from "@/components/scroll-lyric/index.vue";
import HorizontalSquares from "@/components/horizontal-squares/index.vue"
import { getLoginStatus } from "@/request/api/user"
import { onMounted } from "vue";
// document.cookie = "MUSIC_R_T=1438878022542;"
// localStorage.setItem('cookie', "MUSIC_R_T=1438878022542; Max-Age=2147483647; Expires=Sun, 18 Feb 2091 06:17:29 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_A_T=1438878011208; Max-Age=2147483647; Expires=Sun, 18 Feb 2091 06:17:29 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_U=3407eb204c84f097fcb20d93e354ef47e0c63c242503a1fc3a4fd655e4da8e39993166e004087dd30aad702f2cd620765bca55310a09cffcd8fba5381569b7e39f644c91b252db7c1b93ac14e0ed86ab; Max-Age=15552000; Expires=Sun, 30 Jul 2023 03:03:22 GMT; Path=/; HTTPOnly;MUSIC_R_T=1438878022542; Max-Age=2147483647; Expires=Sun, 18 Feb 2091 06:17:29 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_R_T=1438878022542; Max-Age=2147483647; Expires=Sun, 18 Feb 2091 06:17:29 GMT; Path=/wapi/clientlog; HTTPOnly;__csrf=e6113162ea26b3a5863da8587caa5b9d; Max-Age=1296010; Expires=Wed, 15 Feb 2023 03:03:32 GMT; Path=/;;MUSIC_A_T=1438878011208; Max-Age=2147483647; Expires=Sun, 18 Feb 2091 06:17:29 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_A_T=1438878011208; Max-Age=2147483647; Expires=Sun, 18 Feb 2091 06:17:29 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_A_T=1438878011208; Max-Age=2147483647; Expires=Sun, 18 Feb 2091 06:17:29 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_A_T=1438878011208; Max-Age=2147483647; Expires=Sun, 18 Feb 2091 06:17:29 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_R_T=1438878022542; Max-Age=2147483647; Expires=Sun, 18 Feb 2091 06:17:29 GMT; Path=/api/feedback; HTTPOnly;MUSIC_R_T=1438878022542; Max-Age=2147483647; Expires=Sun, 18 Feb 2091 06:17:29 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_R_T=1438878022542; Max-Age=2147483647; Expires=Sun, 18 Feb 2091 06:17:29 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_R_T=1438878022542; Max-Age=2147483647; Expires=Sun, 18 Feb 2091 06:17:29 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_A_T=1438878011208; Max-Age=2147483647; Expires=Sun, 18 Feb 2091 06:17:29 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_A_T=1438878011208; Max-Age=2147483647; Expires=Sun, 18 Feb 2091 06:17:29 GMT; Path=/api/feedback; HTTPOnly;MUSIC_R_T=1438878022542; Max-Age=2147483647; Expires=Sun, 18 Feb 2091 06:17:29 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_A_T=1438878011208; Max-Age=2147483647; Expires=Sun, 18 Feb 2091 06:17:29 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_A_T=1438878011208; Max-Age=2147483647; Expires=Sun, 18 Feb 2091 06:17:29 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_R_T=1438878022542; Max-Age=2147483647; Expires=Sun, 18 Feb 2091 06:17:29 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_A_T=1438878011208; Max-Age=2147483647; Expires=Sun, 18 Feb 2091 06:17:29 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_SNS=; Max-Age=0; Expires=Tue, 31 Jan 2023 03:03:22 GMT; Path=/;MUSIC_A_T=1438878011208; Max-Age=2147483647; Expires=Sun, 18 Feb 2091 06:17:29 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_R_T=1438878022542; Max-Age=2147483647; Expires=Sun, 18 Feb 2091 06:17:29 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_R_T=1438878022542; Max-Age=2147483647; Expires=Sun, 18 Feb 2091 06:17:29 GMT; Path=/neapi/clientlog; HTTPOnly")
onMounted(async () => {
  const { data: loginStatus } = await getLoginStatus()
  console.log("LoginStatus", loginStatus)
})
</script>

<style scoped>

</style>
