<script setup lang="ts">
const route = useRoute()
const CountStore = useCountStore()
</script>

<template>
  <div class="container">
    <p>目前路由的路徑 - route.fullPath為 : {{ route.fullPath }}</p>
    <h1 class="primary">
      Page: Store
    </h1>
    <h2 class="title">
      前台Store
    </h2>
    <hr>

    <p>CountStore.num: {{ CountStore.num }}</p>
    <button @click="CountStore.addCount">
      addCount
    </button>
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
