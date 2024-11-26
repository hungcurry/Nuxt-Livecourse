<script setup lang="ts">
// 串接 API 取得房型詳細資料
// API path : https://nuxr3.zeabur.app/api/v1/rooms/{id}
// 將資料渲染至下方的 div.room-page 區塊
import type { TApiResponse, TApiRoomItem } from '@/types/apiTypes'

const router = useRouter()
const route = useRoute()
const roomId = route.params.id

// CSR
// const apiUrl = `https://nuxr3.zeabur.app/api/v1/rooms/${roomId}`
// const { data: room, FetchInit } = useCustomFetch<TApiRoomItem>()

// onMounted(async () => {
//   await FetchInit(apiUrl)
//   console.log('room', room.value)
// })

// SSR
const { data: room } = await useFetch(`/rooms/${roomId}`, {
  baseURL: 'https://nuxr3.zeabur.app/api/v1',
  transform: (response: TApiResponse<TApiRoomItem>) => {
    const { result } = response
    return result
  },
  onResponseError({ response }) {
    const { message } = response._data
    console.error('Error:', message)
    router.push('/')
  },
})
// console.log(room.value)
// 使用 useSeoMeta  將 room 的資訊寫入 SEO Meta
useSeoMeta({
  title: () => room.value?.name || '',
  titleTemplate: title => `Freyja | ${title}`,
  description: () => room.value?.description || '',
  ogTitle: () => `Freyja | ${room.value?.name || ''}`,
  ogDescription: () => room.value?.description || '',
  ogImage: () => room.value?.imageUrl || '',
  ogUrl: () => room.value ? `https://freyja.travel.com.tw/room/${room.value._id}` : '',
  twitterCard: 'summary_large_image',
  twitterTitle: () => `Freyja | ${room.value?.name || ''}`,
  twitterDescription: () => room.value?.description || '',
  twitterImage: () => room.value?.imageUrl || '',
})
</script>

<template>
  <div>
    <h2 style="text-align: center">
      房型詳細頁面
    </h2>
    <div class="container">
      <button @click="router.go(-1)">
        回上一頁
      </button>
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div v-if="room" class="room-page">
            <div class="room-header">
              <h1 class="room-name">
                {{ room.name }}
              </h1>
              <p class="room-description">
                {{ room.description }}
              </p>
            </div>

            <div class="room-gallery">
              <img :src="room.imageUrl" :alt="room.name" class="room-main-image">
              <div class="room-image-list">
                <img
                  v-for="imageUrl in room.imageUrlList"
                  :key="imageUrl"
                  :src="imageUrl"
                  :alt="room.name"
                >
              </div>
            </div>

            <div class="room-info">
              <div class="info-block">
                <h2>房間資訊</h2>
                <p>面積: {{ room.areaInfo }}</p>
                <p>床型: {{ room.bedInfo }}</p>
                <p>最多容納人數: {{ room.maxPeople }}</p>
                <p>價格: NT${{ room.price }}</p>
              </div>

              <div class="info-block">
                <h2>房間配置</h2>
                <ul v-for="item in room.layoutInfo" :key="item.title">
                  <li>{{ item.title }}</li>
                </ul>
              </div>

              <div class="info-block">
                <h2>房內設施</h2>
                <ul v-for="item in room.amenityInfo" :key="item.title">
                  <li>{{ item.title }}</li>
                </ul>
              </div>

              <div class="info-block">
                <h2>客房備品</h2>
                <ul v-for="item in room.amenityInfo" :key="item.title">
                  <li>{{ item.title }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 第2層路由 下方頁面 有缺陷會跳回畫面上方 -->
        <div class="col-md-6">
          <nav>
            <h3 style="text-align: center">
              第2層路由 下方頁面
            </h3>
            <hr>
            <NuxtLink :to="`/room/${route.params.id}`">
              房型首頁
            </NuxtLink>
            <NuxtLink :to="`/room/${route.params.id}/about`">
              房型介紹
            </NuxtLink>
            <NuxtLink :to="`/room/${route.params.id}/list`">
              房型列表
            </NuxtLink>
            <NuxtLink :to="`/room/${route.params.id}/feedbacks`">
              評價回饋
            </NuxtLink>
          </nav>
          <NuxtPage />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.room-page {
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
}

.room-header {
  text-align: center;
  margin-bottom: 40px;
}

.room-name {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.room-description {
  font-size: 1.1rem;
  color: #34495e;
  line-height: 1.6;
}

.room-gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

.room-main-image {
  width: 100%;
  max-width: 800px;
  height: auto;
  border-radius: 15px;
  margin-bottom: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.room-image-list {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.room-image-list img {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.room-image-list img:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.room-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.info-block {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.info-block:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.info-block h2 {
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

.info-block p,
.info-block ul {
  font-size: 1.1rem;
  color: #34495e;
  line-height: 1.6;
}

.info-block ul {
  list-style: none;
  padding-left: 0;
}

.info-block ul li {
  margin-bottom: 10px;
  position: relative;
  padding-left: 20px;
}

.info-block ul li::before {
  content: '•';
  color: #3498db;
  position: absolute;
  left: 0;
  top: 0;
}
a {
  color: $black;
}
</style>
