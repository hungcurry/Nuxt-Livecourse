<script setup lang="ts">
// 如果今天是元件的資料夾 建議改用import
// 因為元件是一種封閉改念 會比較好閱讀
import CardImg from '@components/Card/Img.vue'
import CardTitle from '@components/Card/Title.vue'
import CardPrice from '@components/Card/Price.vue'
import CardBtn from '@components/Card/Btn.vue'

const props = defineProps({
  imageSrc: {
    type: String,
    required: true,
    default: 'no image',
  },
  altText: {
    type: String,
    required: true,
    default: 'no altText',
  },
  title: {
    type: String,
    required: true,
    default: 'no title',
  },
  price: {
    type: String,
    required: true,
    default: 'no price',
  },
  buttonText: {
    type: String,
    required: true,
    default: 'no buttonText',
  },
})
</script>

<template>
  <div class="product-card">
    <CardImg :imageSrc="imageSrc" :altText="altText" />
    <CardTitle :title="title" />
    <CardPrice :price="price" />
    <CardBtn :buttonText="buttonText" />
  </div>
</template>

<style scoped lang="scss">
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 300px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  margin: 0 auto;
  & :hover {
    transform: translateY(-5px);
  }
}
</style>
