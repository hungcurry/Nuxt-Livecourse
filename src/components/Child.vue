<script setup lang="ts">
// ===================
// ... defineProps ...
// ===================
// 定義 Props 類型
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

// ~使用 原始 defineProps
// const props = defineProps({
//   title: {
//     type: String,
//     default: 'Vue 父子元件範例',
//   },
//   count: {
//     type: Number,
//     default: 0,
//   },
//   isActive: {
//     type: Boolean,
//     default: true,
//   },
//   items: {
//     type: Array,
//     default: () => ['Apple', 'Banana', 'Cherry'],
//   },
//   config: {
//     type: Object,
//     default: () => ({
//       theme: 'light',
//       size: 'md',
//     }),
//   },
// })

// ~使用 withDefaults 提供預設值
// #region withDefaults
// const props = withDefaults(defineProps<TProps>(), {
//   title: 'Vue 父子元件範例',
//   count: 0,
//   isActive: true,
//   items: () => ['Apple', 'Banana', 'Cherry'],
//   config: () => ({ theme: 'light', size: 'md' }),
// })
// #endregion

// ~最新方式 使用 defineProps 直接解構 props，並提供預設值
const {
  title: propsTitle = 'Vue 父子元件範例',
  count: propsCount = 0,
  isActive: propsIsActive = true,
  items: propsItems = ['Apple', 'Banana', 'Cherry'],
  config: propsConfig = { theme: 'light', size: 'md' },
} = defineProps<TProps>()

// 直接使用title 會找不到 要使用 重新命名的 propsTitle
console.log('props', propsTitle)
// ===================
// ... defineEmits ...
// ===================
// ~使用 原始 defineEmits
// const emit = defineEmits({
//   update: (count: number) => {
//     console.log('傳出count', count)
//     return typeof count === 'number'
//   },
//   submit: (data: { id: number, name: string }) => {
//     console.log('傳出data', data)
//     return typeof data.id === 'number' && typeof data.name === 'string'
//   },
// })

// 定義 Emits 類型
type TEmits = {
  update: [count: number]
  submit: [data: { id: number; name: string }]
}
const emit = defineEmits<TEmits>()


const emitCount = ref(propsCount)
const emitData = ref({
  id: 1,
  name: 'test',
})
// 處理emit事件
function handleEmitClick() {
  emitCount.value++
  emit('update', emitCount.value)
}
function handleEmitSubmit() {
  emit('submit', emitData.value)
}
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Count: {{ count }}</p>
    <button
      :class="{ active: isActive }"
      @click="handleEmitClick"
    >
      增加
    </button>
    <hr>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item }}
      </li>
    </ul>
    <button @click="handleEmitSubmit">
      提交
    </button>
  </div>
</template>

<style scoped lang="scss">
.active {
  color: red;
}
</style>
