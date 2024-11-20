<script setup lang="ts">
const route = useRoute()
// 使用全局的useNuxtApp() 把hello抓出來
// 記得方法都要加$
const { $hello } = useNuxtApp()

// 日期選擇器
const showDatePicker = ref(false)
const date = ref(new Date())
function toggleDatePicker() {
  showDatePicker.value = !showDatePicker.value
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

    <!-- 輸出 出來就會 Hello Mike! -->
    <div>{{ $hello('Mike') }}</div>
    <!-- timeformat -->
    <h1 v-timeformat="'2021-09-16T01:52:45.780Z'" />
    <h1 v-timeformat="1696861522513" />
    <!-- VCalendar -->
    <button @click="toggleDatePicker">
      {{ showDatePicker ? '關閉日期' : '顯示日期' }}
    </button>
    <v-date-picker v-if="showDatePicker" v-model="date" />
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
