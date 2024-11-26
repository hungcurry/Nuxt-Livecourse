// https://nuxt.com/docs/api/configuration/nuxt-config

import path from 'node:path'
import process from 'node:process'
import dotenv from 'dotenv'

const viteApiPath = process.env.VITE_API || '/api3'
let envFile = '.env.dev' // 預設為開發環境
// 根據 APP_ENV 決定對應的 .env 檔案
switch (process.env.APP_ENV) {
  case 'prod':
    envFile = '.env.prod'
    break
  case 'test':
    envFile = '.env.test'
    break
  default:
    envFile = '.env.dev'
    break
}
dotenv.config({ path: path.resolve(__dirname, envFile) })

export default defineNuxtConfig({
  // compatibilityDate 屬性 : 將 Nuxt3 的功能和行為鎖定在 2024-04-03 之前的版本，
  // 避免之後 Nuxt3 新版本的寫法調整會影響到目前專案的運作
  compatibilityDate: '2024-04-03',
  // 啟用 Nuxt DevTools 開發工具
  devtools: { enabled: true },
  // ------------------ add ----------------------
  app: {
    // 應用路由基礎路徑
    baseURL: '/Nuxt-Livecourse/',
    head: {
      title: '樂悠悠',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'zh-Hant-TW',
      },
      meta: [
        { 'http-equiv': 'x-ua-compatible', 'content': 'IE=edge' },
        { 'http-equiv': 'x-content-type-options', 'content': 'nosniff' },
        { name: 'author', content: 'Freyja 旅館' },
        { name: 'keywords', content: 'Freyja,Freyja 訂房,高雄旅遊,訂房,住宿,住宿預訂,四人房,雙人房,景觀房' },
        { name: 'description', content: 'Freyja 旅館位於高雄，提供頂級的住宿體驗。享受絕美市景與高級設施，讓您的每一刻都充滿奢華與舒適。立即預訂，開啟難忘的住宿之旅！' },
        { name: 'theme-color', content: '#ffffff' },
        { name: 'robots', content: '"index, follow' },
        { property: 'fb:app_id', content: '12345678' },
        { property: 'og:locale', content: 'zh-TW' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://freyja.travel.com.tw' },
        { property: 'og:title', content: 'Freyja | 高雄頂級旅館 - 提供奢華住宿體驗' },
        { property: 'og:image', content: 'https://freyja.travel.com.tw/images/og-image.jpg' },
        { property: 'og:description', content: 'Freyja 旅館位於高雄，提供頂級的住宿體驗。享受絕美市景與高級設施，讓您的每一刻都充滿奢華與舒適。立即預訂，開啟難忘的住宿之旅！' },
      ],
      link: [
        // { rel: 'icon', type: 'image/x-icon', href: 'path/to/your/design' },
        // { rel: 'apple-touch-icon', href: 'path/to/your/design' },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&display=swap',
        },
      ],
    },
    // 頁面過渡動畫
    pageTransition: { name: 'page', mode: 'out-in' },
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
            // @use "@style/config/_variables" as *;
            @import "@style/config/_variables.scss";
          `,
        },
      },
    },
    plugins: [],
    define: {
      // vite 環境變數(全域)
      'process.env': process.env,
    },
    server: {
      proxy: {
        [`/Nuxt-Livecourse/API${viteApiPath}`]: {
          target: 'https://www.vscinemas.com.tw/',
          changeOrigin: true,
          rewrite: (path) => {
            // console.log('原始路徑:', path)
            // ~ /Nuxt-Livecourse/API/api3/VsWeb/api/GetLstDicCinema
            const rewrittenPath = path.replace(new RegExp(`^/Nuxt-Livecourse/API${viteApiPath}`), '')
            // console.log('重寫後路徑:', rewrittenPath)
            // ~ /VsWeb/api/GetLstDicCinema
            return rewrittenPath
          },
        },
      },
    },
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
  // 設定 nuxt環境變數runtimeConfig
  runtimeConfig: {
    // 放外面的 只有server抓的到 隱密性高
    TOKEN: process.env.TOKEN,
    // 放在 public client 和 server 抓的到
    public: {
      API_URL: process.env.API_URL,
    },
  },
  // Auto-import pinia
  imports: {
    dirs: ['stores'],
  },
  // 開發環境使用 https
  devServer: {
    https: {
      key: './https/localhost+3-key.pem',
      cert: './https/localhost+3.pem',
    },
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  modules: [['@pinia/nuxt', { autoImports: ['defineStore', 'acceptHMRUpdate'] }], '@unocss/nuxt', '@nuxt/eslint'],
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
