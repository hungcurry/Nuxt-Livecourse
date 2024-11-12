<script setup lang="ts">
// 使用 import 動態引入圖片
import roomImage from '@images/room.png'
const route = useRoute()
const post = ref({
  imageSrc: roomImage,
  altText: '尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢',
  title: '尊爵雙人房',
  price: 'NT$10000',
  buttonText: '馬上預約',
})
</script>

<template>
  <div class="container">
    <p>目前路由的路徑 - route.fullPath為 : {{ route.fullPath }}</p>
    <h1 class="primary">Page: card</h1>
    <h2 class="title">前台Card</h2>
    <hr />
    <Card v-bind="post" />
  </div>
</template>

<style lang="scss" scoped>
.primary {
  color: $primary;
}
.title {
  color: #550eef;
  font-size: $font-base;
}
</style>
