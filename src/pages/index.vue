<script setup lang="ts">
const route = useRoute()

const config = useRuntimeConfig()
console.log(config)
console.log(config.public)

if (import.meta.server) {
  console.log('server token:', config.TOKEN)
}

console.log('ENV=>', process.env.VITE_ENV)
console.log('WEB_URL=>', process.env.VITE_WEB_URL)
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
