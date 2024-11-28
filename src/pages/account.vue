<script setup lang="ts">
</script>

<template>
  <div class="container">
    <nav class="d-flex gap-3 justify-content-center mt-3">
      <NuxtLink class="btn btn-primary w-25" to="/account/signup">
        註冊
      </NuxtLink>
      <NuxtLink class="btn btn-primary w-25" to="/account/login">
        登入
      </NuxtLink>
    </nav>

    <div>
      <NuxtPage />
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
