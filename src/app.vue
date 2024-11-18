<script setup lang="ts"></script>

<template>
  <div id="id">
    <!-- 無障礙網頁用 NuxtRouteAnnouncer -->
    <!-- <NuxtRouteAnnouncer /> -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style scoped lang="scss">
// 頁面過渡動畫
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  // filter: blur(1rem);
}
</style>
