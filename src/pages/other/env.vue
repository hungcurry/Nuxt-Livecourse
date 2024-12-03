<script setup lang="ts">
const route = useRoute()

const config = useRuntimeConfig()
console.log(config)
console.log(config.public)

if (import.meta.server) {
  console.log('server token:', config.TOKEN)
}
// vite
// console.log('ENV=>', process.env.VITE_ENV)// local
// console.log('WEB_URL=>', process.env.VITE_WEB_URL) // https://www.vite.com

console.log('VITE_ENV=>', import.meta.env.VITE_ENV) // local
console.log('VITE_WEB_URL=>', import.meta.env.VITE_WEB_URL) // https://www.vite.com
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
