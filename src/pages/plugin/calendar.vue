<script setup lang="ts">
import { useScreens } from 'vue-screen-utils'
// <VueCalendar /> 用於呈現日曆
// <VueDatePicker v-model="date" /> 元件提供日期選取功能

// ===================
// ... VueCalendar ...
// ===================
/*
起始日期 => 當前日期
結束日期 => 下一天
最晚日期 => 下一年的同天
日期格式需要是  YYYY-MM-DD
*/
const today = new Date().toLocaleDateString('en-CA')
const tommorowDate = new Date(today)
const nextyearDate = new Date(today)
tommorowDate.setDate(tommorowDate.getDate() + 1)
nextyearDate.setDate(nextyearDate.getDate() + 365)
const tommorow = tommorowDate.toLocaleDateString('en-CA') // 格式化YYYY-MM-DD
const nextyear = nextyearDate.toLocaleDateString('en-CA') // 格式化 YYYY-MM-DD

// console.log('today', today) // 2024-12-10
// console.log('tommorow', tommorow) // 2024-12-11
// console.log('nextyear', nextyear) // 2025-12-10

// 日期選擇器
const showDatePicker = ref(false)
// const date = ref(new Date())
// 預設選取 2024 年 12 月 15 日至 2024 年 12 月 21 日之間
// js月份 會從0 開始
// const date = ref({
//   start: new Date(2024, 11, 15).toLocaleDateString('en-CA'), // YYYY-MM-DD 格式
//   end: new Date(2024, 11, 21).toLocaleDateString('en-CA'), // YYYY-MM-DD 格式
// })
const date = ref({
  start: today,
  end: tommorow,
})

// 最早可選取的日期 ( 2024 年 12 月 5 日 )
// const minDate = ref(new Date(2024, 11, 5))
// 最晚可選取的日期 ( 2024 年 12 月  29 日 )
// const maxDate = ref(new Date(2024, 11, 29))
const minDate = ref(today)
const maxDate = ref(nextyear)

// 標題
const masks = ref({
  title: '西元 YYYY 年 MM 月',
  modelValue: 'YYYY-MM-DD',
})
// ===================
// ... vue-screen-utils ...
// pnpm install vue-screen-utils
// ===================
// 設定螢幕尺寸並解構 mapCurrent
const { mapCurrent } = useScreens({
  // 螢幕尺寸為 mobile-first ( 從小尺寸到大尺寸 )
  xs: '0px', // 等同於 (min-width: 0px)
  sm: '640px', // 等同於 (min-width: 640px)
  md: '768px', // 等同於 (min-width: 768px)
  lg: '1024px', // 等同於 (min-width: 1024px)
})
// 使用 mapCurrent 設定螢幕尺寸對應的欄數
// { lg: 2 } => 在 lg 尺寸 ( 1024px ) 以上使用 2 欄
//  1 => 沒有配對到螢幕尺寸時，預設使用 1 欄
// const columns = mapCurrent({ lg: 2 }, 1)

// 767px 以下 1 欄，768px 以上 2 欄，1200px 以上 3 欄
const columns = mapCurrent({ md: 2, lg: 3 }, 1)
// 767px 以下 1 列，768px 以上 2 列，1200px 以上 2 列
const rows = mapCurrent({ md: 2, lg: 2 }, 1)

// 整日曆標題的對齊
const totlePosition = mapCurrent({ md: 'left' }, 'center')
// 使元件與父層容器等寬
const expanded = mapCurrent({ md: false }, true)

function toggleDatePicker() {
  showDatePicker.value = !showDatePicker.value
}
</script>

<template>
  <div class="container">
    <!-- VCalendar -->
    <button @click="toggleDatePicker">
      {{ showDatePicker ? '關閉日期' : '顯示日期' }}
    </button>
    <ClientOnly>
      <!-- <VueCalendar /> -->
      <div class="date-picker">
        <p>使用自訂顏色</p>
        <VueDatePicker
          v-if="showDatePicker"
          v-model.range="date"
          :min-date="minDate"
          :max-date="maxDate"
          :masks="masks"
          :columns="columns"
          :rows="rows"
          :title-position="totlePosition"
          :expanded
          color="sky-blue"
        />
      </div>
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.date-picker {
  :deep(.vc-sky-blue) {
  --vc-accent-50: #f0f9ff;
  --vc-accent-100: #e0f2fe;
  // 選取區間的背景顏色
  --vc-accent-200: #f94acd;
  --vc-accent-300: #7dd3fc;
  --vc-accent-400: #38bdf8;
  --vc-accent-500: #0ea5e9;
  // 選取日期的背景顏色
  --vc-accent-600: #950af8;
  --vc-accent-700: #0369a1;
  --vc-accent-800: #075985;
  --vc-accent-900: #0c4a6e;
  }
  :deep(.vc-title) {
    background: none;
  }
  :deep(.vc-arrow) {
    background: none;
  }
  :deep(.vc-pane-layout) {
    gap: 60px;
  }
}
</style>
