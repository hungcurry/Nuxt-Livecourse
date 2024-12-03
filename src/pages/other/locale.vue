<script setup>
const route = useRoute()
const { locale, setLocaleCookie } = useI18n()
watch(locale, (newLocale) => {
  setLocaleCookie(newLocale)
})
</script>

<template>
  <div class="container">
    <p>目前路由的路徑 - route.fullPath為 : {{ route.fullPath }}</p>
    <h1 class="primary">
      Page: 首頁
    </h1>
    <h2 class="title">
      前台首頁
    </h2>

    <select v-model="locale">
      <option value="zh-TW">
        zh-TW
      </option>
      <option value="en-US">
        en-US
      </option>
      <option value="ja-JP">
        ja-JP
      </option>
    </select>

    <ul>
      <li>
        <p>{{ $t('cancel') }}</p>
        <p>{{ $t('email') }}</p>
        <p>{{ $t('date') }}</p>
        <p>{{ $t('subject') }}</p>
        <p>{{ $t('message') }}</p>
        <p>{{ $t('upload') }}</p>
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
