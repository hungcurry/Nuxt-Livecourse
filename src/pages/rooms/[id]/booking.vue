<script setup lang="ts">
import type { TApiResponse, TApiRoomItem, TApiUser } from '@/types/apiTypes'
import { cityList, ZipCodeMap } from '@/utils/zipcodes'

definePageMeta({
  middleware: ['account-auth'],
})
const submitButtonRef = ref<HTMLButtonElement | null>(null)
const bookingStore = useBookingStore()
const route = useRoute()
const roomId = route.params.id
const userInfo = ref<TApiUser>({
  address: {
    zipcode: '',
    county: '',
    district: '',
    detail: '',
  },
  name: '',
  phone: '',
  email: '',
})

const { formatDateWeekday } = useFormatWeek()
const { setBookingResult } = bookingStore
const { bookingInfo } = storeToRefs(bookingStore)

if (!bookingInfo.value) {
  navigateTo('/')
}
// SSR useFetch
// #region
// SSR useFetch
// https://nuxr3.zeabur.app/api/v1/rooms/
//

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
//
// #endregion
const { data: room } = await useFetch(`/rooms/${roomId}`, {
  baseURL: 'https://nuxr3.zeabur.app/api/v1',
  transform: (response: TApiResponse<TApiRoomItem>) => {
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
const discountPrice = computed(() => {
  const price = room.value?.price
  if (!price || price === 0)
    return 0
  return price / 10
})
const districtList = computed(() => {
  const city = ZipCodeMap.find(city => city.name === userInfo.value.address.county)
  return city?.districts
})
const totalPrice = computed(() => {
  return (room.value?.price || 0) * (bookingInfo.value?.bookingDays || 0) - discountPrice.value
})

function resetUserForm() {
  userInfo.value = {
    address: {
      zipcode: '',
      county: '',
      district: '',
      detail: '',
    },
    name: '',
    phone: '',
    email: '',
  }
}
function submitOrder() {
  if (submitButtonRef.value) {
    submitButtonRef.value.click()
  }
}
// 建立訂單
// #region
// 登入帳號
// ooopp42+5@gmail.com
// Zx26473564

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

// #endregion
async function createOrder(roomInfo: TApiRoomItem, userInfo: TApiUser) {
  try {
    // 取得認證 cookie
    const cookie = useCookie('Freyja-auth')
    // 設定郵遞區號
    if (districtList.value?.length) {
      userInfo.address.zipcode = districtList.value[0].zip
    }
    if (totalPrice.value) {
      roomInfo.totalPrice = totalPrice.value
    }

    // 組合地址
    const fullAddress = `${userInfo.address.county}${userInfo.address.district}${userInfo.address.detail}`

    // 設定訂房結果
    const bookingResultData = {
      ...roomInfo,
      userInfo: {
        name: userInfo.name,
        phone: userInfo.phone,
        email: userInfo.email,
        address: {
          zipcode: String(userInfo.address.zipcode),
          detail: fullAddress,
        },
      },
    }
    console.log('bookingResultData', bookingResultData)
    setBookingResult(bookingResultData)

    // 建立訂單資料
    const orderData = {
      roomId: roomInfo._id,
      checkInDate: bookingInfo.value?.checkInDate,
      checkOutDate: bookingInfo.value?.checkOutDate,
      peopleNum: bookingInfo.value?.peopleNum,
      userInfo: {
        name: userInfo.name,
        phone: userInfo.phone,
        email: userInfo.email,
        address: {
          zipcode: String(userInfo.address.zipcode),
          detail: fullAddress,
        },
      },
    }
    const { result } = await $fetch<TApiResponse<any>>('/api/v1/orders/', {
      baseURL: 'https://nuxr3.zeabur.app',
      method: 'POST',
      body: orderData,
      headers: cookie.value ? { Authorization: cookie.value } : undefined,
    })
    // 清空表單並導向確認頁
    resetUserForm()
    navigateTo('/confirm')
    return result._id
  }
  catch (error) {
    console.error('建立訂單失敗:', error)
    throw error
  }
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
                入住：{{ formatDateWeekday(bookingInfo?.checkInDate || '') }}
              </p>
              <p class="card-text">
                退房：{{ formatDateWeekday(bookingInfo?.checkOutDate || '') }}
              </p>
              <p class="card-text d-flex justify-content-between">
                <strong>房客人數:{{ bookingInfo?.peopleNum }}</strong>
              </p>
            </div>

            <hr>
            <!-- 訂房人資訊 -->
            <section class="mb-5">
              <h3>訂房人資訊</h3>
              <VForm v-slot="{ errors, meta }" class="d-flex flex-column gap-6" @submit="createOrder(room, userInfo)">
                <div class="mb-3">
                  <label for="name" class="form-label fs-8 fs-md-7 fw-bold">姓名</label>
                  <VField
                    id="name"
                    v-model="userInfo.name"
                    name="姓名"
                    rules="required|min:2"
                    type="text"
                    class="form-control rounded-3"
                    :class="{ 'is-invalid': errors['姓名'] }"
                    placeholder="請輸入姓名"
                  />
                  <VErrorMessage name="姓名" class="invalid-feedback" />
                </div>
                <div class="mb-3">
                  <label for="phone" class="form-label fs-8 fs-md-7 fw-bold">手機號碼</label>
                  <VField
                    id="phone"
                    v-model="userInfo.phone"
                    name="手機號碼"
                    rules="required|phone"
                    type="tel"
                    class="form-control rounded-3"
                    :class="{ 'is-invalid': errors['手機號碼'] }"
                    placeholder="請輸入手機號碼"
                  />
                  <VErrorMessage name="手機號碼" class="invalid-feedback" />
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label fs-8 fs-md-7 fw-bold">電子信箱</label>
                  <VField
                    id="email"
                    v-model="userInfo.email"
                    name="電子信箱"
                    rules="required|email"
                    type="email"
                    class="form-control rounded-3"
                    :class="{ 'is-invalid': errors['電子信箱'] }"
                    placeholder="請輸入電子信箱"
                  />
                  <VErrorMessage name="電子信箱" class="invalid-feedback" />
                </div>
                <div class="mb-3">
                  <label for="road" class="form-label fs-8 fs-md-7 fw-bold">地址</label>
                  <div class="d-flex gap-2 mb-4">
                    <VField
                      v-model="userInfo.address.county"
                      name="縣市"
                      rules="required"
                      as="select"
                      class="form-select"
                      :class="{ 'is-invalid': errors['縣市'] }"
                    >
                      <option selected disabled>
                        請選擇縣市
                      </option>
                      <option v-for="city in cityList" :key="city" :value="city">
                        {{ city }}
                      </option>
                    </VField>
                    <VField
                      v-model="userInfo.address.district"
                      name="行政區"
                      rules="required"
                      as="select"
                      class="form-select"
                      :class="{ 'is-invalid': errors['行政區'] }"
                    >
                      <option selected disabled>
                        請選擇行政區
                      </option>
                      <option
                        v-for="district in districtList"
                        :key="district.zip"
                        :value="district.name"
                      >
                        {{ district.name }}
                      </option>
                    </VField>
                  </div>
                  <VField
                    id="road"
                    v-model="userInfo.address.detail"
                    name="詳細地址"
                    rules="required"
                    type="text"
                    class="form-control rounded-3"
                    :class="{ 'is-invalid': errors['詳細地址'] }"
                    placeholder="請輸入詳細地址"
                  />
                  <VErrorMessage name="詳細地址" class="invalid-feedback" />
                </div>
                <button
                  ref="submitButtonRef"
                  type="submit"
                  class="d-none"
                  :disabled="!meta.valid"
                />
              </VForm>
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
          <!-- 價格 -->
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
                  <span>NT${{ totalPrice }}</span>
                </div>
              </div>

              <button
                class="btn btn-lg btn-primary w-100 fw-bold rounded-3"
                type="button"
                @click="submitOrder"
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
