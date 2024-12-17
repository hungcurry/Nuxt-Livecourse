<script setup lang="ts">
// 父元件資料
// const title = 'Vue 父子元件範例'
// const count = ref(0)
// const isActive = ref(true)
// const items = ref(['Apple', 'Banana', 'Cherry'])
// const config = {
//   theme: 'light' as 'light' | 'dark',
//   size: 'md' as 'sm' | 'md' | 'lg',
// }

type TProps = {
  title?: string
  count?: number
  isActive?: boolean
  items?: string[]
  config?: {
    theme?: 'light' | 'dark'
    size?: 'sm' | 'md' | 'lg'
  }
}
const parentData = ref<TProps>({
  title: 'Vue 父子元件範例',
  count: 0,
  isActive: true,
  items: ['Apple', 'Banana', 'Cherry'],
  config: {
    theme: 'light',
    size: 'md',
  },
})
// 處理子元件的事件
function handleUpdate(newCount: number) {
  console.log('父接收資料newCount:', newCount)
  parentData.value.count = newCount
}
function handleSubmit(newdata: { id: number, name: string }) {
  console.log('父接收資料newdata:', newdata)
}
</script>

<template>
  <div>
    <Child
      v-bind="parentData"
      @update="handleUpdate"
      @submit="handleSubmit"
    />
  </div>
</template>
