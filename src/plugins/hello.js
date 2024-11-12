export default defineNuxtPlugin((nuxtApp) => {
  return {
    // 依賴注入Nuxt裡面
    provide: {
      hello: (msg) => `Hello ${msg}!`,
    },
  }
})
