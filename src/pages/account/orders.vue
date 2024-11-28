<script setup lang="ts">
definePageMeta({
  middleware: ['account-auth'],
})
</script>

<template>
  <div class="py-3 py-md-5">
    <div class="container h-full">
      <div class="row justify-content-md-center">
        <div class="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
          <div class="bg-white p-4 p-md-5 rounded shadow-sm">
            <h2 class="mb-4">
              訂單管理
            </h2>
            <div class="order-list">
              <!-- 訂單列表 -->
              <div class="alert alert-info text-center">
                目前尚無訂單記錄
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg-white {
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

h2 {
  color: $primary;
  font-weight: bold;
}

.order-list {
  min-height: 200px;
}
</style>
