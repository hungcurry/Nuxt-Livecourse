<script setup lang="ts">
const route = useRoute()

// 取得環境變數 api / api2 / api3
const api = process.env.VITE_API
const apiServer = `/API${api}`
onMounted(async () => {
  // 威秀電影院API : https://www.vscinemas.com.tw/VsWeb/api/GetLstDicCinema
  const response = await $fetch(`${apiServer}/VsWeb/api/GetLstDicCinema`)
  console.log(response)
})
</script>

<template>
  <div class="container">
    <p>目前路由的路徑 - route.fullPath為 : {{ route.fullPath }}</p>
    <h1 class="primary">
      Page: 首頁
    </h1>
    <h2 class="title">
      前台首頁
    </h2>
    <hr>
  </div>
</template>

<style lang="scss" scoped>
.primary {
  color: $primary;
}
.title {
  color: #e38d28;
  font-size: $font-base;
}
</style>
