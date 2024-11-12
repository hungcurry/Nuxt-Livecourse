<script setup lang="ts">
const props = defineProps({
  price: {
    type: String,
    required: true,
    default: 'no price'
  },
})
</script>

<template>
  <p class="product-price">{{ price }}</p>
</template>

<style scoped lang="scss">
.product-price {
  font-size: 16px;
  color: #007BFF;
  text-align: center;
  margin-bottom: 16px;
}
</style>
