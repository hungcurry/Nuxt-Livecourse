<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div class="container">
    <p>目前路由的路徑 - route.fullPath為 : {{ route.fullPath }}</p>
    <h1 class="primary">
      Page: 嵌套router
    </h1>
    <h2 class="title">
      前台router
    </h2>
    <hr>
    <!-- 嵌套router -->
    <nav>
      <NuxtLink to="/">
        回首頁
      </NuxtLink>
      <NuxtLink to="/router">
        index
      </NuxtLink>
      <NuxtLink to="/router/routerA">
        routerA
      </NuxtLink>
      <NuxtLink to="/router/routerB">
        routerB
      </NuxtLink>
    </nav>
    <main>
      <NuxtPage />
    </main>
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
a {
  color: $primary;
}
</style>
