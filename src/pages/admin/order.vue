<script setup lang="ts">
const route = useRoute()
definePageMeta({
  layout: 'admin',
})
</script>

<template>
  <div class="container">
    <p>目前路由的路徑 - route.fullPath為 : {{ route.fullPath }}</p>
    <h1 class="primary">
      Page: admin/order
    </h1>
    <h2 class="title">
      後台訂單
    </h2>
    <hr>
  </div>
</template>

<style scoped lang="scss">
.primary {
  color: $primary;
}
.title {
  color:#e38d28;
  font-size: $font-base;
}
</style>
