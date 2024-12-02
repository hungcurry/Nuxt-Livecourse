<script setup lang="ts">
import type { TApiResponse, TApiRoomItem, TApiUser } from '@/types/apiTypes'

const bookingStore = useBookingStore()
const route = useRoute()
const roomId = route.params.id
const userInfo = ref({
  address: {
    zipcode: 802,
    county: '',
    district: '',
    detail: '',
  },
  name: '',
  phone: '',
  email: '',
})

const { setBookingInfo } = bookingStore

// SSR useFetch
// https://nuxr3.zeabur.app/api/v1/rooms/
const { data: room } = await useFetch(`/rooms/${roomId}`, {
  baseURL: 'https://nuxr3.zeabur.app/api/v1',
  transform: (response: TApiResponse<TApiRoomItem>) => {
    console.log('response', response)
    const { result } = response
    return result
  },
  onResponseError({ response }) {
    const { message } = response._data
    console.error('Error:', message)
    navigateTo('/')
  },
})
console.log('booking', room.value)

// SSR useAsyncData
// https://nuxr3.zeabur.app/api/v1/rooms/
// const { data: room } = await useAsyncData('room-data', async () => {
//   const response = await $fetch<TApiResponse<TApiRoomItem>>(`/rooms/${roomId}`, {
//     baseURL: 'https://nuxr3.zeabur.app/api/v1',
//   })
//   const { result } = response
//   console.log('response', response)
//   return result
// })
// console.log('booking', room.value)

// CSR
// const apiUrl = `https://nuxr3.zeabur.app/api/v1/rooms/${roomId}`
// const { data: room, FetchInit } = useCustomFetch<TApiRoomItem>()
// onMounted(async () => {
//   await FetchInit(apiUrl)
//   console.log('booking', room.value)
// })

// 清空訂房人資料
function resetUserForm() {
  userInfo.value = {
    address: {
      zipcode: 802,
      county: '',
      district: '',
      detail: '',
    },
    name: '',
    phone: '',
    email: '',
  }
}
// 建立訂單
function createOrder(roomInfo: TApiRoomItem, userInfo: TApiUser) {
  setBookingInfo({
    ...roomInfo,
    user: {
      ...userInfo,
    },
  })
  resetUserForm()
  console.log('bookingResult', bookingStore.bookingResult)
  navigateTo('/confirm')
}
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div
        v-if="room"
        :key="room._id"
        class="card mb-3 border-0"
      >
        <div class="row align-items-center">
          <div class="col-md-6">
            <img
              :src="room.imageUrl"
              class="card-img-top w-100"
              :alt="room.name"
            >
            <div class="card-body px-3 py-0">
              <h2 class="card-title">
                {{ room.name }}
              </h2>
              <p class="card-text">
                {{ room.description }}
              </p>
              <p class="card-text d-flex justify-content-between">
                <strong>價格:{{ room.price }}</strong>
              </p>
            </div>

            <hr>
            <section class="mb-5">
              <h3>房型基本資訊</h3>
              <ul class="list-unstyled d-flex">
                <li>
                  <div class="badge bg-light text-dark fs-5">
                    {{ room?.areaInfo }}
                  </div>
                </li>
                <li>
                  <div class="badge bg-light text-dark fs-5">
                    {{ room?.bedInfo }}
                  </div>
                </li>
                <li>
                  <div class="badge bg-light text-dark fs-5">
                    {{ room?.bedInfo }}
                  </div>
                </li>
              </ul>
            </section>
            <section class="mb-5">
              <h3>房間格局</h3>
              <ul class="list-unstyled d-flex">
                <li
                  v-for="layout in room.layoutInfo"
                  :id="layout.title"
                  :key="layout.title"
                  class="mx-1"
                >
                  <div class="badge bg-light text-dark fs-5">
                    {{ layout.title }}
                  </div>
                </li>
              </ul>
            </section>
            <section class="mb-5">
              <h3>房內設備</h3>
              <ul class="list-unstyled d-flex flex-wrap">
                <li
                  v-for="layout in room.facilityInfo"
                  :id="layout.title"
                  :key="layout.title"
                  class="mx-1"
                >
                  <div class="badge bg-light text-dark fs-5">
                    {{ layout.title }}
                  </div>
                </li>
              </ul>
            </section>
          </div>
          <div class="col-md-6">
            <section class="mb-5">
              <h3>訂房人資訊</h3>
              <form class="d-flex flex-column gap-6">
                <div class="mb-3">
                  <label
                    for="name"
                    class="form-label fs-8 fs-md-7 fw-bold"
                  >姓名</label><input
                    id="name"
                    v-model="userInfo.name"
                    type="text"
                    class="form-control rounded-3"
                    placeholder="請輸入姓名"
                    name="name"
                  >
                </div>
                <div class="mb-3">
                  <label
                    for="phone"
                    class="form-label fs-8 fs-md-7 fw-bold"
                  >手機號碼</label><input
                    id="phone"
                    v-model="userInfo.phone"
                    type="tel"
                    class="form-control rounded-3"
                    placeholder="請輸入手機號碼"
                    name="phone"
                  >
                </div>
                <div class="mb-3">
                  <label
                    for="email"
                    class="form-label fs-8 fs-md-7 fw-bold"
                  >電子信箱</label><input
                    id="email"
                    v-model="userInfo.email"
                    type="email"
                    class="form-control rounded-3"
                    placeholder="請輸入電子信箱"
                    name="email"
                  >
                </div>
                <div data-v-a22825e2="" class="mb-3">
                  <label
                    for="road"
                    class="form-label fs-8 fs-md-7 fw-bold"
                  >地址</label>
                  <div class="d-flex gap-2 mb-4">
                    <select
                      v-model="userInfo.address.county"
                      class="form-select"
                      name="county"
                    >
                      <option selected disabled>
                        請選擇縣市
                      </option>
                      <option value="高雄市">
                        高雄市
                      </option>
                    </select><select
                      v-model="userInfo.address.district"
                      class="form-select"
                      name="district"
                    >
                      <option selected disabled>
                        請選擇行政區
                      </option>
                      <option value="前金區">
                        前金區
                      </option>
                      <option value="鹽埕區">
                        鹽埕區
                      </option>
                      <option value="新興區">
                        新興區
                      </option>
                    </select>
                  </div>
                  <input
                    id="road"
                    v-model="userInfo.address.detail"
                    type="text"
                    class="form-control rounded-3"
                    placeholder="請輸入詳細地址"
                    name="road"
                  >
                </div>
              </form>
            </section>
            <button
              class="btn btn-secondary btn-lg w-100"
              @click="createOrder(room, userInfo)"
            >
              確認訂房
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.primary {
  color: $primary;
}
.title {
  color: #e38d28;
  font-size: $font-base;
}
.card-img-top {
  max-width: 100%;
}
</style>
