<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: 'no title'
  },
})
</script>

<template>
  <h2 class="product-title">{{ title }}</h2>
</template>

<style scoped lang="scss">
.product-title {
  font-size: 18px;
  font-weight: bold;
  margin: 16px 0 8px;
  text-align: center;
}
</style>
