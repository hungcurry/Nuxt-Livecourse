export default defineNuxtPlugin((nuxtApp) => {
  // nuxtApp : Nuxt實體
  // vueApp : vue實體

  nuxtApp.vueApp.directive('copy', {
    // 自定義指令的生命週期函式
    // 如 mounted() 和 updated()）僅在客戶端渲染時執行
    mounted(el) {
      // 實作點擊複製功能
      el.addEventListener('click', (e) => {
        navigator.clipboard.writeText(e.target.textContent)
        // 使用更友善的通知方式
        const notification = document.createElement('div')
        notification.textContent = '成功複製內容'
        notification.style.cssText = `
          position: fixed;
          bottom: 20px;
          right: 20px;
          padding: 10px 20px;
          background: #4CAF50;
          color: white;
          border-radius: 4px;
          z-index: 9999;
        `
        document.body.appendChild(notification)
        setTimeout(() => {
          notification.remove()
        }, 2000)
      })
    },
  })
})
