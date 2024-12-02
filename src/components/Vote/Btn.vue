<script setup lang="ts">
</script>

<template>
  <button class="vote_btn">
    投票數:
    <slot />
  </button>
</template>

<style scoped lang="scss">
.vote_btn {
  margin-top: 10px;
  border-radius: 30px;
  width: 100%;
  height: 30px;
  border: 1px solid #ddd;
}
</style>
