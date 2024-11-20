<script setup lang="ts">
import type { TApiNewsItem } from '@/types/apiTypes'

const route = useRoute()
const apiUrl = 'https://nuxr3.zeabur.app/api/v1/home/news/'
const { data, isLoading, FetchInit } = useCustomFetch<TApiNewsItem[]>()

onMounted(async () => {
  await FetchInit(apiUrl)
  console.log('res', data.value)
})
</script>

<template>
  <div class="container">
    <p>目前路由的路徑 - route.fullPath為 : {{ route.fullPath }}</p>
    <h1 class="primary">
      Page: Fetch
    </h1>
    <h2 class="title">
      前台Fetch
    </h2>
    <hr>

    <div>
      <ClientOnly>
        <Loading :active="isLoading" />
      </ClientOnly>
      <NewsCard v-for="news in data" :key="news._id" v-bind="news" />
    </div>
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
