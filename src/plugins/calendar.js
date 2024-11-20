import VCalendar from 'v-calendar'
import 'v-calendar/dist/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  // nuxtApp : Nuxt實體
  // vueApp : vue實體
  // app.use(VCalendar, {})
  // 對應vue使用app.use() 所以要改成 nuxtApp.vueApp.use();
  nuxtApp.vueApp.use(VCalendar)
})
