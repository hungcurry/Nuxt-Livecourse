<script setup lang="ts">
import type { TMenuItem } from '@/types/dataTypes'
// <NuxtLink to="/">index</NuxtLink>
// <NuxtLink to="/async">async</NuxtLink>
const menuList: TMenuItem[] = [
  // 前台
  { label: '前台index', path: '/' },
  // { label: '前台Bootstrap', path: '/bootstrap' },
  // { label: '前台Card', path: '/bootstrap/card' },
  // ----other-----
  // { label: '前台Meta', path: '/other/meta' },
  // { label: '前台Env', path: '/other/env' },
  // { label: '前台Proxy', path: '/other/proxy' },
  // { label: '前台Locale', path: '/other/locale' },
  // { label: '前台Middleware', path: '/other/middleware' },
  // { label: '前台Server', path: '/other/server' },
  // ----資料夾-----
  // { label: '前台Store', path: '/store' },
  // { label: '前台Todo', path: '/todo' },
  // { label: '前台Rooms', path: '/rooms' },
  // { label: '前台Router', path: '/router' },
  // { label: '前台Plugin', path: '/plugin' },
  // { label: '前台validate', path: '/plugin/validate' },
  // { label: '前台swiper', path: '/plugin/swiper' },
  // { label: '前台calendar', path: '/plugin/calendar' },
  { label: '前台props', path: '/props' },
  // ----有api-----
  // { label: '前台Fetch', path: '/fetch' },
  // { label: '前台AsyncData', path: '/fetch/async-data' },
  // { label: '前台Account', path: '/account' },

  // admin
  // { label: '後台首頁', path: '/admin' },
  // { label: '後台訂單', path: '/admin/order' },
]
</script>

<template>
  <header>
    <nav class="d-flex items-center justify-center gap-2">
      <NuxtLink
        v-for="(item, idx) in menuList"
        :key="idx"
        :to="item.path"
        :title="item.label"
      >
        <p>{{ item.label }} /</p>
      </NuxtLink>
      <!-- 外部連結 使用 target="_blank" external -->
      <!-- <NuxtLink to="https://thecodingpro.com/courses/nuxt3" target="_blank" external> 外部連結 </NuxtLink> -->
    </nav>
  </header>
</template>

<style scoped lang="scss">
header {
  background-color: #6610f2;
  color: #fff;
  padding: 1rem;
  text-align: center;
  font-size: 1.5rem;
}
</style>
