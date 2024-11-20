<script setup lang="ts">
const route = useRoute()

// useHead({
//   title: 'Meta - Nuxt3 高效入門全攻略',
//   meta: [
//     { property: 'title', content: '關於我們 Meta - Nuxt3 高效入門全攻略' },
//     { property: 'og:title', content: '關於我們 Meta - Nuxt3 高效入門全攻略' },
//     { property: 'og:url', content: 'http://localhost:3000/Meta' },
//     { property: 'og:image', content: 'http://localhost:3000/share.jpg' },
//     { name: 'description', content: '關於我們 Meta - 最棒的Nuxt3的線上課程' },
//     {
//       property: 'og:description',
//       content: '關於我們 Meta - 最棒的Nuxt3的線上課程',
//     },
//   ],
//   link: [
//     {
//       rel: 'stylesheet',
//       href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
//     },
//   ],
//   script: [
//     {
//       src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.3/jquery.min.js',
//       async: true,
//       // https://nuxt.com/docs/getting-started/seo-meta#body-tags
//       // valid options are: 'head' | 'bodyClose' | 'bodyOpen'
//       tagPosition: 'bodyClose',
//     },
//   ],
// })

// ~第2種寫法
// useSeoMeta({
//   title: "About - Nuxt3 高效入門全攻略",
//   description: "關於我們 - 最棒的Nuxt3的線上課程",
//   ogDescription: "關於我們 - 最棒的Nuxt3的線上課程",
//   ogTitle: "About - Nuxt3 高效入門全攻略",
// });

// ~第3種寫法 只會在伺服器端執行 client端 還是會吃全域的
// 會變這樣
// client : <title>Meta - Nuxt3 高效入門全攻略</title>
// 檢視原始碼: <title>關於我們 - Nuxt3 高效入門全攻略 - Nuxt3</title>

// 提供三種不同的 params 來對應不同頁面 /about、/user、/home
// https://vue-lessons-api.vercel.app/seo/about
// const res = await useFetch('https://vue-lessons-api.vercel.app/seo/about')
// useServerSeoMeta({
//   title: () => `${res.data.value.title} - Nuxt3`,
//   ogTitle: () => `${res.data.value.title} - Nuxt3`,
//   description: () => `${res.data.value.description} - Nuxt3`,
//   ogDescription: () => `${res.data.value.description} - Nuxt3`,
// })
</script>

<template>
  <div class="container">
    <p>目前路由的路徑 - route.fullPath為 : {{ route.fullPath }}</p>
    <h1 class="primary">
      Page: Meta
    </h1>
    <h2 class="title">
      前台Meta
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
