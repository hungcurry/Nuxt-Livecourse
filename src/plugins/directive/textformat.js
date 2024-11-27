export default defineNuxtPlugin((nuxtApp) => {
  // nuxtApp : Nuxt實體
  // vueApp : vue實體

  nuxtApp.vueApp.directive('textformat', (el, binding) => {
    const bindingArg = {
      uppercase: binding.value.toUpperCase(),
      lowercase: binding.value.toLowerCase(),
    }
    el.innerHTML = bindingArg[binding.arg]
  })
})
