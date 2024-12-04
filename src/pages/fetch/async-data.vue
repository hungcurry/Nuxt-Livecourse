<script setup lang="ts">
// !1.~useFetch
import type { TApiNewsItem, TApiResponse } from '@/types/apiTypes'

const isFetch = ref(false)
const cookie = useCookie<string>('todoAuth')
const todoStore = useTodoStore()
const { setTodoList } = todoStore
// SSR
const { data: news } = await useFetch('/v1/home/news', {
  method: 'GET',
  baseURL: 'https://nuxr3.zeabur.app/api',
  headers: { Authorization: cookie.value },
  query: { /* ... */ },
  transform: (response: TApiResponse<TApiNewsItem[]>) => {
    isFetch.value = true
    try {
      // response 非proxy 響應物件
      console.log('response', response)
      const { result, status } = response

      // 手動 Transform
      const transformedResult = result?.map(item => ({
        ...item,
        image: item.image.toUpperCase(), // 轉大寫範例
      })) ?? []

      // 將數據存入 pinia
      if (result) {
        // setTodoList(transformedResult)
      }
      return transformedResult
    }
    finally {
      isFetch.value = false
    }
  },
  // 當 cookie 改變時，自動重新請求
  watch: [cookie],
  onResponseError({ response }) {
    console.error('API Error Response:', response)
    const { message } = response._data || {}
    console.error('Error Message:', message)
    // 拋出錯誤
    throw new Error(message || 'Unknown error occurred')
  },
})
console.log('news', news.value)

// !2.~useAsyncData
// import type { TApiNewsItem, TApiResponse } from '@/types/apiTypes'

// const isFetch = ref(false)
// const cookie = useCookie<string>('todoAuth')
// const todoStore = useTodoStore()
// const { setTodoList } = todoStore
// // SSR
// const { data: news } = await useAsyncData('news', async () => {
//   isFetch.value = true
//   try {
//     const response = await $fetch<TApiResponse<TApiNewsItem[]>>('/v1/home/news', {
//       method: 'GET',
//       baseURL: 'https://nuxr3.zeabur.app/api',
//       headers: { Authorization: cookie.value },
//       query: { /* ... */ },
//       onResponseError({ response }) {
//         console.error('API Error Response:', response)
//         const { message } = response._data || {}
//         console.error('Error Message:', message)
//         // 拋出錯誤
//         throw new Error(message || 'Unknown error occurred')
//       },
//     })
//     // response 非proxy 響應物件
//     console.log('response', response)
//     const { result, status } = response

//     // 手動 Transform
//     const transformedResult = result?.map(item => ({
//       ...item,
//       image: item.image.toUpperCase(), // 轉大寫範例
//     })) ?? []

//     // 將數據存入 pinia
//     if (result) {
//       // setTodoList(transformedResult)
//     }
//     return transformedResult
//   }
//   finally {
//     isFetch.value = false
//   }
// }, {
//   // 當 cookie 改變時，自動重新請求
//   watch: [cookie],
//   transform: (data) => {
//     // console.log('data', data)
//     // 這邊拿到的 已經是處理大寫的資料了
//     return data
//   },
// })
// console.log('news', news.value)
</script>

<template>
  <div class="container" />
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
