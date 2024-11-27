// pnpm install vue-loading-overlay
import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  // 單獨安裝
  // 第一個參數為Vue元件名稱，第二個參數為元件本身
  nuxtApp.vueApp.component('VueLoading', VueLoading)
})
