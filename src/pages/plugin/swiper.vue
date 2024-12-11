<script setup lang="ts">
import type { TApiResponse, TApiRoomItem } from '@/types/apiTypes'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

const { data: rooms } = await useFetch<TApiResponse<TApiRoomItem[]>>('/api/v1/rooms', {
  baseURL: 'https://nuxr3.zeabur.app',
})
// 將所有屬性整合成一個物件
const swiperOptions = ref({
  modules: [Navigation, Pagination, Autoplay],
  autoplay: { delay: 5000 },
  // 開啟循環模式
  loop: true,
  // 設定輪播的寬度
  slidesPerView: 1, // 根據容器寬度自適應,
  spaceBetween: 10,
  breakpoints: {
    // 在寬度 992px 以上顯示 2 個輪播
    992: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
  },
  // 設定頁碼模組的功能 ( 需要搭配 Pagination 模組使用 )
  pagination: {
    el: '.swiper-pagination', // 頁碼操作的元素
    type: 'bullets' as const, //  頁碼的外觀
    clickable: true,
  },
  // 設定導航模組的功能 ( 需要搭配 Navigation 模組使用 )
  navigation: {
    nextEl: '.swiper-button-next', // 下一個按鈕操作的元素
    prevEl: '.swiper-button-prev', // 上一個按鈕操作的元素
  },
})
</script>

<template>
  <div class="container mt-5">
    <ul class="list-unstyled">
      <li
        v-for="room in rooms?.result"
        :key="room._id"
        class="card mb-3"
      >
        <div class="row">
          <div class="col-lg-6">
            <Swiper
              class="h-100 my-swiper"
              v-bind="swiperOptions"
            >
              <SwiperSlide
                v-for="(image, index) in room.imageUrlList"
                :key="index"
              >
                <img
                  :src="image"
                  class="img-fluid"
                  alt="room image"
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
                <li class="card-info border rounded-3 p-3">
                  <Icon
                    class="mb-2 fs-5 text-primary-100"
                    icon="fluent:slide-size-24-filled"
                  />
                  <p class="mb-0 fw-bold text-neutral-80 text-nowrap">
                    {{ room.areaInfo }}
                  </p>
                </li>
                <li class="card-info border rounded-3 p-3">
                  <Icon class="mb-2" icon="material-symbols:king-bed" />
                  <p class="mb-0 fw-bold">
                    {{ room.bedInfo }}
                  </p>
                </li>
                <li class="card-info border rounded-3 p-3">
                  <Icon class="mb-2" icon="ic:baseline-person" />
                  <p class="mb-0 fw-bold">
                    2-{{ room.maxPeople }} 人
                  </p>
                </li>
              </ul>
              <p class="mb-0 fw-bold">
                NT$ {{ room.price }}
              </p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.my-swiper {
  width: 100%;
  height: 300px;
}
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  text-align: center;
  background: #fff;
}
.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
