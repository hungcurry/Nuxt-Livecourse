import dayjs from 'dayjs'

export default defineNuxtPlugin((nuxtApp) => {
  // nuxtApp : Nuxt實體
  // vueApp : vue實體

  nuxtApp.vueApp.directive('timeformat', {
    mounted(el, binding) {
      // binding 是傳入的參數 要用binding.value
      // console.log('binding', binding);
      const time = dayjs(binding.value).format('YYYY年MM月DD日')
      el.textContent = time
    },
  })
})
