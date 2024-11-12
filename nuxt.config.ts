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
