<script setup lang="ts">
import type { TApiResponse, TApiRoomItem, TApiUser } from '@/types/apiTypes'

// definePageMeta({
//   middleware: ['account-auth'],
// })
const submitButtonRef = ref(null)
const bookingStore = useBookingStore()
const route = useRoute()
const roomId = route.params.id
const discountPrice = 1000
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
const { setBookingResult } = bookingStore
const { bookingInfo } = storeToRefs(bookingStore)

// SSR useFetch
// https://nuxr3.zeabur.app/api/v1/rooms/
const { data: room } = await useFetch(`/rooms/${roomId}`, {
  baseURL: 'https://nuxr3.zeabur.app/api/v1',
  transform: (response: TApiResponse<TApiRoomItem>) => {
    // console.log('response', response)
    const { result } = response
    console.log('booking', result)
    return result
  },
  onResponseError({ response }) {
    const { message } = response._data
    console.error('Error:', message)
    navigateTo('/')
  },
})
// #region
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
// #endregion

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
// #region 建立訂單
// {
//   "roomId": "65251f6095429cd58654bf12",
//   "checkInDate": "2023/06/18",
//   "checkOutDate": "2023/06/19",
//   "peopleNum": 2,
//   "userInfo": {
//     "address": {
//       "zipcode": 802,
//       "detail": "文山路23號"
//     },
//     "name": "Joanne Chen",
//     "phone": "0912345678",
//     "email": "example@gmail.com"
//   }
// }
// ooopp42+5@gmail.com
// Zx26473564
// #endregion
async function createOrder(roomInfo: TApiRoomItem, userInfo: TApiUser) {
  const cookie = useCookie('Freyja-auth')

  setBookingResult({
    ...roomInfo,
    userInfo: {
      name: userInfo.name,
      phone: userInfo.phone,
      email: userInfo.email,
      address: {
        zipcode: String(userInfo.address.zipcode),
        detail: userInfo.address.detail,
      },
    },
  })

  const orderData = {
    roomId: roomInfo._id,
    checkInDate: bookingInfo.value?.checkInDate,
    checkOutDate: bookingInfo.value?.checkOutDate,
    peopleNum: bookingInfo.value?.peopleNum,
    userInfo: {
      address: {
        zipcode: String(userInfo.address.zipcode),
        detail: userInfo.address.detail,
      },
      name: userInfo.name,
      phone: userInfo.phone,
      email: userInfo.email,
    },
  }
  const { result } = await $fetch<TApiResponse<any>>('/api/v1/orders/', {
    baseURL: 'https://nuxr3.zeabur.app',
    method: 'POST',
    body: { ...orderData },
    headers: cookie.value
      ? {
          Authorization: cookie.value,
        }
      : undefined,
  })
  console.log('訂單成功result', result)
  const orderId = result._id

  resetUserForm()
  console.log('bookingResult', bookingStore.bookingResult)
  navigateTo('/confirm')
  // navigateTo(`/confirm/${orderId}`)
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
            <!-- 訂房資訊 -->
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
            <!-- 訂房人資訊 -->
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
                <button
                  ref="submitButtonRef"
                  type="submit"
                  class="d-none"
                />
              </form>
            </section>

            <!-- 房間資訊 -->
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
              <img
                class="img-fluid rounded-3"
                :src="room.imageUrl"
                :alt="room.name"
              >
              <div class="my-5">
                <h2 className="mb-3 fw-bold">
                  價格詳情
                </h2>
                <div
                  class="d-flex justify-content-between align-items-center mb-3 fw-medium"
                >
                  <span>NT$ {{ room.price }} X {{ bookingInfo?.bookingDays || 0 }}晚
                  </span>
                  <span>NT$ {{ room.price * (bookingInfo?.bookingDays || 0) }}</span>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center fw-medium"
                >
                  <p class="mb-0">
                    住宿折扣
                  </p>
                  <span class="text-info">-NT$ {{ discountPrice }}</span>
                </div>
                <hr class="my-3">
                <div
                  class="d-flex justify-content-between align-items-center fw-bold"
                >
                  <p class="mb-0">
                    總價
                  </p>
                  <span>NT$
                    {{
                      room.price * (bookingInfo?.bookingDays || 0) - discountPrice
                    }}</span>
                </div>
              </div>

              <button
                class="btn btn-lg btn-primary w-100 fw-bold rounded-3"
                type="button"
                @click="createOrder(room, userInfo)"
              >
                確認訂房
              </button>
            </section>
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
