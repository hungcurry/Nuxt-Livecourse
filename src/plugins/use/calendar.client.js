import { Calendar, DatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  // nuxtApp : Nuxt實體
  // vueApp : vue實體
  // app.use(VCalendar, {})
  // 對應vue使用app.use() 所以要改成 nuxtApp.vueApp.use();

  // 完整安裝
  // nuxtApp.vueApp.use(VCalendar)

  // 單獨安裝
  // 第一個參數為Vue元件名稱，第二個參數為元件本身
  // nuxtApp.vueApp.use(setupCalendar, {}); // 啟用 setupCalendar 預設設定
  nuxtApp.vueApp.component('VueCalendar', Calendar)
  nuxtApp.vueApp.component('VueDatePicker', DatePicker)

  // console.log('directive位置', nuxtApp.vueApp._context.directives)
  // console.log('component位置', nuxtApp.vueApp._context.components)
})
