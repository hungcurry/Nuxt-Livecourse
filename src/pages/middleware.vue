<script setup lang="ts">
const route = useRoute()

// 1.匿名 route middleware
// definePageMeta({
//   middleware: (to, from) => {
//     console.log('address=>', { to, from })
//   },
// })

// 2.具名 route middleware
definePageMeta({
  // 這裡名稱 要跟 auth.js一樣
  middleware: ['auth'],
})
</script>

<template>
  <div class="container">
    <p>目前路由的路徑 - route.fullPath為 : {{ route.fullPath }}</p>
    <h1 class="primary">
      Page: Middleware
    </h1>
    <h2 class="title">
      前台Middleware
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
