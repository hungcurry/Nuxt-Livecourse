<script setup lang="ts">
import type { TApiResponse, TApiRoomItem } from '@/types/apiTypes'

// const apiUrl = 'https://nuxr3.zeabur.app/api/v1/rooms'
// const { data: roomsList, FetchInit } = useCustomFetch<TApiRoomItem[]>()
// #region 房型資料列表
// const roomsList = ref([
//   {
//     _id: '66b0909bafe4327b9a563797',
//     name: '尊爵雙人房',
//     description:
//       '享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。',
//     imageUrl:
//       'https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/room2-1.png',
//     imageUrlList: [
//       'https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/room2-2.png',
//       'https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/room2-3.png',
//       'https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/room2-4.png',
//       'https://github.com/hexschool/2022-web-layout-training/blob/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/room2-5.png?raw=true',
//     ],
//     areaInfo: '24坪',
//     bedInfo: '一張大床',
//     maxPeople: 4,
//     price: 10000,
//     status: 1,
//     layoutInfo: [
//       {
//         title: '市景',
//         isProvide: true,
//       },
//       {
//         title: '獨立衛浴',
//         isProvide: true,
//       },
//       {
//         title: '樓層電梯',
//         isProvide: true,
//       },
//     ],
//     facilityInfo: [
//       {
//         title: '平面電視',
//         isProvide: true,
//       },
//       {
//         title: '吹風機',
//         isProvide: true,
//       },
//       {
//         title: '冰箱',
//         isProvide: true,
//       },
//       {
//         title: '熱水壺',
//         isProvide: true,
//       },
//       {
//         title: '檯燈',
//         isProvide: true,
//       },
//       {
//         title: '衣櫥',
//         isProvide: true,
//       },
//       {
//         title: '書桌',
//         isProvide: true,
//       },
//     ],
//     amenityInfo: [
//       {
//         title: '衛生紙',
//         isProvide: true,
//       },
//       {
//         title: '拖鞋',
//         isProvide: true,
//       },
//       {
//         title: '沐浴用品',
//         isProvide: true,
//       },
//       {
//         title: '刮鬍刀',
//         isProvide: true,
//       },
//       {
//         title: '刷牙用品',
//         isProvide: true,
//       },
//       {
//         title: '罐裝水',
//         isProvide: true,
//       },
//       {
//         title: '梳子',
//         isProvide: true,
//       },
//     ],
//     createdAt: '2024-08-05T08:43:07.276Z',
//     updatedAt: '2024-08-14T06:31:08.477Z',
//   },
// ])
// #endregion

const route = useRoute()
// SSR
const { data: roomsList } = await useFetch('/rooms/', {
  baseURL: 'https://nuxr3.zeabur.app/api/v1',
  transform: (response: TApiResponse<TApiRoomItem[]>) => {
    const { result } = response
    console.log('roomsList', result)
    return result
  },
  onResponseError({ response }) {
    const { message } = response._data
    console.error('Error:', message)
    navigateTo('/')
  },
})
function handleClickRoom(id: string) {
  navigateTo(`/rooms/${id}`)
}
</script>

<template>
  <div>
    <h2>房型 index {{ route.fullPath }}</h2>
    <div class="container mt-4">
      <div class="row justify-content-center gy-3">
        <div v-for="room in roomsList" :key="room._id" class="col-12 col-md-6 col-lg-3">
          <div class="card h-100 shadow-sm" @click="handleClickRoom(room._id)">
            <img :src="room.imageUrl" class="card-img-top" alt="Room Image">
            <div class="card-body d-flex flex-column">
              <h3 class="card-title">
                {{ room.name }}
              </h3>
              <p class="card-text flex-grow-1">
                {{ room.description }}
              </p>
              <ul class="list-unstyled">
                <li><strong>面積:</strong> {{ room.areaInfo }}</li>
                <li><strong>床型:</strong> {{ room.bedInfo }}</li>
                <li><strong>最大容納人數:</strong> {{ room.maxPeople }}</li>
                <li class="card-text d-flex justify-content-between">
                  <strong class="text-primary">價格:</strong>
                  <span class="text-end font-size-22px">{{ room.price }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  cursor: pointer;
}
.card-img-top {
  object-fit: cover;
  height: 200px;
  max-width: 100%;
}
</style>
