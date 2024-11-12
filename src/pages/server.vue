<script setup lang="ts">
const route = useRoute()

const fetchData = async () => {
  // 特別注意 server / middleware 能攔截的只有站內的 Request
  // 外部
  // https://api.nuxtjs.dev/mountains
  // 站內
  // /api/hello
  const res = await $fetch('/api/hello')
  console.log(res)
}
</script>

<template>
  <div class="container">
    <p>目前路由的路徑 - route.fullPath為 : {{ route.fullPath }}</p>
    <h1 class="primary">Page: Server</h1>
    <h2 class="title">前台Server</h2>
    <hr />
    <button @click="fetchData">get api data</button>
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
