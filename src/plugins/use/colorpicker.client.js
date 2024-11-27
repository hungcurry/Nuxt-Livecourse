// pnpm install vue3-colorpicker
// import Vue3ColorPicker from 'vue3-colorpicker'
// import 'vue3-colorpicker/style.css'

// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.vueApp.use(Vue3ColorPicker)
// })

import { ColorPicker } from 'vue3-colorpicker'
import 'vue3-colorpicker/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  // console.log('component位置', nuxtApp.vueApp._context.components)
  // 單獨安裝
  // 第一個參數為Vue元件名稱，第二個參數為元件本身
  nuxtApp.vueApp.component('VueColorPicker', ColorPicker)
})
