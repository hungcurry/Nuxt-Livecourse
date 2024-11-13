<script setup lang="ts">
import { TNewsItem, TApiResponse } from '@/types/apiTypes'
const route = useRoute()
const apiUrl = 'https://nuxr3.zeabur.app/api/v1/home/news/'
const ary = ref<TNewsItem[]>([])

// !1.~useFetch
// ~nuxt 打API useFetch (useAsyncData + $fetch)
const { data, status, error, refresh, clear } = await useFetch<TApiResponse<TNewsItem[]>>(apiUrl)
console.log('nuxt', data.value?.result)
// 這邊要小心回傳的資料格式是 RefImpl 因此 要多加層value
ary.value = data.value?.result || []

// !2.~useAsyncData
// ~nuxt 打API useAsyncData
// const { data, status, error, refresh, clear }  = await useAsyncData('news', () => {
//   return $fetch<TApiResponse<TNewsItem[]>>(apiUrl)
// })
// console.log('nuxt', data.value?.result)
// // 這邊要小心回傳的資料格式是 RefImpl 因此 要多加層value
// ary.value = data.value?.result || []
</script>

<template>
  <div class="container">
    <p>目前路由的路徑 - route.fullPath為 : {{ route.fullPath }}</p>
    <h1 class="primary">Page: AsyncData</h1>
    <h2 class="title">前台AsyncData</h2>
    <hr />

    <div v-if="status === 'pending'">加载中...</div>
    <div v-else-if="error">加载失败: {{ error }}</div>
    <ul v-else>
      <li v-for="item in ary" :key="item._id">
        <h3>{{ item.title }}</h3>
        <img :src="item.image" alt="" />
      </li>
    </ul>
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
