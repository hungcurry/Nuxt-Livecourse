<script setup lang="ts">
import { TMenuItem } from '@/types/menuTypes'
// <NuxtLink to="/">index</NuxtLink>
// <NuxtLink to="/async">async</NuxtLink>
const menuList: TMenuItem[] = [
  // 前台
  { label: '前台index', path: '/' },
  //{ label: '嵌套router', path: '/router' },
  // { label: '前台Card', path: '/card' },
  // { label: '前台Fetch', path: '/fetch' },
  // { label: '前台bootstrap', path: '/bootstrap' },
  // { label: '前台Store', path: '/store' },
  // { label: '前台Plugin', path: '/plugin' },
  // { label: '前台Server', path: '/server' },
  // { label: '前台Middleware', path: '/middleware' },
  // { label: '前台Room', path: '/room' },
  // { label: '前台Meta', path: '/meta' },
  // { label: '前台AsyncData', path: '/async-data' },

  // admin
  // { label: '後台首頁', path: '/admin' },
  // { label: '後台訂單', path: '/admin/order' },
]
</script>

<template>
  <div>
    <header>
      <nav class="d-flex items-center justify-center gap-2">
        <NuxtLink v-for="(item, idx) in menuList" :key="idx" :to="item.path" :title="item.label">
          <p>{{ item.label }} /</p>
        </NuxtLink>
        <!-- 外部連結 使用 target="_blank" external -->
        <!-- <NuxtLink to="https://thecodingpro.com/courses/nuxt3" target="_blank" external>
          Nuxt 3 高效入門全攻略
        </NuxtLink> -->
      </nav>
    </header>
  </div>
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
