<script setup lang="ts">
import type { TApiResponse, TApiRoomItem } from '@/types/apiTypes'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

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


const swiperOptions = ref({
  modules: [Navigation, Pagination, Autoplay],
  autoplay: { delay: 5000 },
  loop: true,
  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
    992: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets' as const,
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})
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
  <main>
    <div class="container mt-5">
      <h2 class="fs-1 fw-bold">
        各種房型，任您挑選
      </h2>
      <ul class="list-unstyled">
        <li
          v-for="room in roomsList"
          :key="room._id"
          class="card mb-3"
        >
          <div class="row">
            <div class="col-lg-6">
              <Swiper
                class="h-100"
                v-bind="swiperOptions"
              >
                <SwiperSlide
                  v-for="(image, index) in room.imageUrlList"
                  :key="index"
                >
                  <img
                    class="w-100 h-100 object-fit-cover"
                    :src="image"
                    :alt="`room-${index}`"
                    loading="lazy"
                  >
                </SwiperSlide>
              </Swiper>
            </div>
            <div class="col-lg-6">
              <div class="card-body">
                <h3 class="card-title fs-2 fw-bold">
                  {{ room.name }}
                </h3>
                <p class="card-text fw-medium">
                  {{ room.description }}
                </p>
                <ul class="d-flex gap-4 list-unstyled mb-5">
                  <li class="border rounded-3 p-3">
                    <p class="mb-0 fw-bold text-nowrap">
                      {{ room.areaInfo }}
                    </p>
                  </li>
                  <li class="border rounded-3 p-3">
                    <p class="mb-0 fw-bold">
                      {{ room.bedInfo }}
                    </p>
                  </li>
                  <li class="border rounded-3 p-3">
                    <p class="mb-0 fw-bold">
                      2-{{ room.maxPeople }} 人
                    </p>
                  </li>
                </ul>
                <hr>
                <div class="d-flex justify-content-between align-items-center">
                  <p class="mb-0 fw-bold">
                    NT$ {{ room.price }}
                  </p>
                  <NuxtLink
                    :to="`/rooms/${room._id}`"
                    class="icon-link icon-link-hover"
                  >
                    <Icon class="bi fs-5" icon="mdi:arrow-right" />
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </main>
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
.icon-link {
  color: $primary;
}
</style>
