// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path'
export default defineNuxtConfig({
  // compatibilityDate 屬性 : 將 Nuxt3 的功能和行為鎖定在 2024-04-03 之前的版本，
  // 避免之後 Nuxt3 新版本的寫法調整會影響到目前專案的運作
  compatibilityDate: '2024-04-03',
  // 啟用 Nuxt DevTools 開發工具
  devtools: { enabled: true },
  // ------------------ add ----------------------
  app: {
    baseURL: '/Nuxt-Livecourse/',
    head: {
      title: '樂悠悠',
      htmlAttrs: {
        lang: 'zh-Hant-TW',
      },
      meta: [
        { charset: 'utf-8' },
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=Edge' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#ffffff' },
        {
          hid: 'description',
          name: 'description',
          content:
            '歡迎來到樂悠悠票務集市，在這裡，您可以輕鬆地享受現場活動的激动人心的時刻。我們的目標是讓每個人都能夠體驗娛樂的樂趣',
        },
        { property: 'og:title', content: '樂悠悠票務集市' },
        {
          property: 'og:description',
          content: 'Experience More with Ticket Bazaar',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'FB上的網址' },
        { property: 'og:image', content: 'FB的圖片' },
      ],
      link: [
        // { rel: 'icon', type: 'image/x-icon', href: 'path/to/your/design' },
        // { rel: 'apple-touch-icon', href: 'path/to/your/design' },
      ],
    },
  },
  srcDir: 'src',
  alias: {
    '@/': `${path.resolve(__dirname, 'src')}/`,
    '@assets': `${path.resolve(__dirname, 'src/assets')}/`,
    '@components': `${path.resolve(__dirname, 'src/components')}/`,
    '@images': `${path.resolve(__dirname, 'src/assets/images')}/`,
    '@style': `${path.resolve(__dirname, 'src/assets/style')}/`,
  },
  // 引入 SCSS 檔案
  css: ['@style/all.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // 解決警告 api: 'modern',
          // The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0
          api: 'modern',
          // 自動在所有元件引入 _variables.scss
          additionalData: `
            @use "@style/config/_variables" as *;
            // @import "@style/config/_variables.scss";
          `,
        },
      },
    },
    plugins: [],
  },
  // 啟用 TypeScript 類型檢查
  typescript: {
    typeCheck: true,
  },
  // <NuxtLink> 元件添加指定的 class。
  router: {
    options: {
      linkActiveClass: 'active',
      linkExactActiveClass: 'active',
    },
  },
  // Auto-import pinia
  imports: {
    dirs: ['stores'],
  },
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],
  ],
  // ===================
  // ... 未啟用 ...
  // ===================
  // components: {
  //   dirs: [
  //     {
  //       path: '@/components/global',
  //       global: true, // 全域註冊
  //     },
  //     '@/components', // 區域註冊
  //   ],
  // },
})
