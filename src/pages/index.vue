<script setup lang="ts">
// 父元件資料
const title = 'Vue 父子元件範例'
const count = ref(0)
const isActive = ref(true)
const items = ref(['Apple', 'Banana', 'Cherry'])
const config = {
  theme: 'light' as 'light' | 'dark',
  size: 'md' as 'sm' | 'md' | 'lg',
}

// 處理子元件的事件
function handleUpdate(newCount: number) {
  count.value = newCount
}

function handleSubmit(data: { id: number, name: string }) {
  console.log('提交資料:', data)
}
</script>

<template>
  <div>
    <Child
      :title="title"
      :count="count"
      :is-active="isActive"
      :items="items"
      :config="config"
      @update="handleUpdate"
      @submit="handleSubmit"
    />
  </div>
</template>
