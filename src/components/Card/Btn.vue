<script setup lang="ts">
defineProps({
  buttonText: {
    type: String,
    required: true,
    default: 'no buttonText',
  },
})
</script>

<template>
  <button class="product-button">
    {{ buttonText }}
  </button>
</template>

<style scoped lang="scss">
.product-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0 0 8px 8px;
  cursor: pointer;
  text-align: center;
  font-size: 16px;
  &:hover {
    background-color: #0056b3;
  }
}
</style>
