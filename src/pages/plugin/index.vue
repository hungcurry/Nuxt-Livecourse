<script setup lang="ts">
const route = useRoute()
// 使用全局的useNuxtApp() 把hello抓出來
// 記得方法都要加$

const { $hello } = useNuxtApp()

// 文字大小寫
const message = ref('A1B2c3deFGhijk')

// 顏色選取
const pureColor = ref('green')
const gradientColor = ref(
  'linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)',
)

// 讀取效果
const isLoading = ref(false)
function openLoading() {
  isLoading.value = true
  // 開啟讀取效果
  // ($loading as any).show()
  setTimeout(() => {
    // 關閉讀取效果
    isLoading.value = false
  }, 1000)
}
</script>

<template>
  <div class="container">
    <p>目前路由的路徑 - route.fullPath為 : {{ route.fullPath }}</p>
    <h1 class="primary">
      Page: Plugin
    </h1>
    <h2 class="title">
      前台Plugin
    </h2>
    <hr>

    <h2 class="title">
      provide
    </h2>
    <!-- 輸出 出來就會 Hello Mike! -->
    <div>{{ $hello('Mike') }}</div>

    <h2 class="title">
      directive 自定義語法
    </h2>
    <!-- 大寫轉小寫格式之後，將結果寫入元素 -->
    <p v-textformat:lowercase="message" />
    <!-- 小寫轉大寫格式之後，將結果寫入元素 -->
    <p v-textformat:uppercase="message" />

    <!-- timeformat -->
    <h1 v-timeformat="'2021-09-16T01:52:45.780Z'" />
    <h1 v-timeformat="1696861522513" />
    <!-- copy -->
    <p v-copy>
      請透過點擊複製這一段文字
    </p>

    <h2 class="title">
      use
    </h2>

    <!-- ColorPicker -->
    <ClientOnly>
      <VueColorPicker
        v-model:pure-color="pureColor"
        v-model:gradient-color="gradientColor"
      />
    </ClientOnly>

    <!-- Loading -->
    <button type="button" @click="openLoading">
      開啟 Loading 效果
    </button>
    <ClientOnly>
      <VueLoading v-model:active="isLoading" />
    </ClientOnly>
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
