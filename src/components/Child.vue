<script setup lang="ts">
// 定義 Props 類型
type TProps = {
  title: string
  count: number
  isActive: boolean
  items: string[]
  config: {
    theme: 'light' | 'dark'
    size: 'sm' | 'md' | 'lg'
  }
}

// 使用 defineProps 和 defineEmits
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: 'Vue 父子元件範例',
  },
  count: {
    type: Number,
    required: true,
    default: 0,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  items: {
    type: Array,
    required: true,
    default: () => ['Apple', 'Banana', 'Cherry'],
  },
  config: {
    type: Object,
    required: true,
    default: () => ({
      theme: 'light',
      size: 'md',
    }),
  },
})

const emit = defineEmits<Emits>()

// 定義 Emits 類型
interface Emits {
  (event: 'update', value: number): void
  (event: 'submit', data: { id: number, name: string }): void
}

// 處理事件
function handleClick() {
  emit('update', props.count + 1)
}

function handleSubmit() {
  emit('submit', {
    id: 1,
    name: 'test',
  })
}
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Count: {{ count }}</p>
    <button
      :class="{ active: isActive }"
      @click="handleClick"
    >
      增加
    </button>
    <hr>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item }}
      </li>
    </ul>
    <button @click="handleSubmit">
      提交
    </button>
  </div>
</template>

<style scoped lang="scss">
.active {
  color: red;
}
</style>
