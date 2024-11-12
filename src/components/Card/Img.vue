<script setup lang="ts">
const props = defineProps({
  imageSrc: {
    type: String,
    required: true,
    default: 'no image'
  },
  altText: {
    type: String,
    required: true,
    default: 'no altText'
  },
})
</script>

<template>
  <div class="product-image">
    <img :src="imageSrc" :alt="altText" />
  </div>
</template>

<style scoped lang="scss">
.product-image img {
  width: 100%;
  height: auto;
  border-radius: 8px 8px 0 0;
}
</style>
