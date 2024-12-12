<script setup lang="ts">
import type { TApiResponse, TApiRoomItem } from '@/types/apiTypes'
import { useScreens } from 'vue-screen-utils'

const bookingStore = useBookingStore()
const router = useRouter()
const route = useRoute()
const roomId = route.params.id
const { setBookingInfo } = bookingStore
// SSR
// 串接 API 取得房型詳細資料
// API path : https://nuxr3.zeabur.app/api/v1/rooms/{id}
// 將資料渲染至下方的 div.room-page 區塊
const { data: room } = await useFetch(`/rooms/${roomId}`, {
  baseURL: 'https://nuxr3.zeabur.app/api/v1',
  transform: (response: TApiResponse<TApiRoomItem>) => {
    const { result } = response
    console.log('room', result)
    return result
  },
  onResponseError({ response }) {
    const { message } = response._data
    console.error('Error:', message)
    navigateTo('/')
  },
})
const roomPrice = computed(() => room.value ? room.value.price.toLocaleString() : 0)
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
// ===================
// ... VueDatePicker ...
// ===================
function generateLocaleDateRange() {
  const today = new Date()
  const startDate = today.toLocaleDateString('en-CA')

  // today 的下一天
  const tommorowDate = new Date(today)
  tommorowDate.setDate(tommorowDate.getDate() + 1)
  const tommorow = tommorowDate.toLocaleDateString('en-CA')

  // 明年的同一天
  const nextYearDate = new Date(today)
  nextYearDate.setDate(nextYearDate.getDate() + 365)
  const nextYear = nextYearDate.toLocaleDateString('en-CA')

  return {
    startDate,
    tommorow,
    nextYear,
  }
}
const { startDate, tommorow, nextYear } = generateLocaleDateRange()
const bookingPeople = ref(1)
const bookingDate = ref({
  start: startDate,
  end: tommorow,
})
// 最早/ 最晚 可選取的日期
const minDate = new Date(startDate)
const maxDate = new Date(nextYear)
// 標題
const masks = ref({
  title: 'YYYY 年 MM 月',
  modelValue: 'YYYY-MM-DD',
  input: 'YYYY-MM-DD',
})

const { mapCurrent } = useScreens({
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
})
const rows = mapCurrent({ md: 2, lg: 1 }, 2)
const columns = mapCurrent({ md: 1, lg: 2 }, 1)
const expanded = mapCurrent({ md: false }, true)
const titlePosition = mapCurrent({ md: 'center' }, 'left')

// 計算天數
function countDateDiffs({ start, end }: { start: string, end: string }) {
  const startDate = new Date(start)
  const endDate = new Date(end)
  return Number.parseInt(String(Math.abs(endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24))
}
function takeReservation() {
  const roomId = room.value?._id
  setBookingInfo({
    roomId,
    checkInDate: bookingDate.value.start,
    checkOutDate: bookingDate.value.end,
    bookingDays: countDateDiffs(bookingDate.value),
    peopleNum: bookingPeople.value,
  })
  console.log('bookingInfo', bookingStore.bookingInfo)
  handleReservation()
}
// 選取要預訂的房型
function handleReservation() {
  navigateTo(`/rooms/${roomId}/booking`)
}
</script>

<template>
  <main class="mt-3">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="mb-4">
            <h1 class="mb-4 fw-bold">
              {{ room?.name }}
            </h1>
            <p class="fw-medium">
              {{ room?.description }}
            </p>
          </div>

          <section class="mb-4">
            <h3 class="title-deco mb-4 fw-bold">
              房型基本資訊
            </h3>
            <ul class="d-flex gap-4 list-unstyled">
              <li class="border rounded-3 p-3">
                <p class="mb-0 fw-bold text-nowrap">
                  {{ room?.areaInfo }}
                </p>
              </li>
              <li class="border ounded-3 p-3">
                <p class="mb-0 fw-bold text-nowrap">
                  {{ room?.bedInfo }}
                </p>
              </li>
              <li class="border rounded-3 p-3">
                <p class="mb-0 fw-bold text-nowrap">
                  2-{{ room?.maxPeople }} 人
                </p>
              </li>
            </ul>
          </section>
        </div>
        <div class="col-md-6">
          <div class="d-flex flex-column gap-4">
            <h5 class="pb-4 mb-0 fw-bold border-bottom">
              預訂房型
            </h5>

            <div>
              <h2 class="fw-bold">
                {{ room?.name }}
              </h2>
              <p class="mb-0 fw-medium">
                {{ room?.description }}
              </p>
            </div>

            <div class="d-flex justify-center items-center gap-2">
              <div class="flex-grow-1 flex-shrink-1">
                <input
                  id="checkinInput"
                  readonly
                  type="date"
                  class="form-control fw-medium rounded-3"
                  placeholder="yyyy-mm-dd"
                  :value="bookingDate.start"
                >
                <label class="fw-medium" for="checkinInput">入住 </label>
              </div>
              <div class="flex-grow-1 flex-shrink-1">
                <input
                  id="checkoutInput"
                  readonly
                  type="date"
                  class="form-control fw-medium rounded-3"
                  placeholder="yyyy-mm-dd"
                  :value="bookingDate.end"
                >
                <label class="fw-medium" for="checkoutInput">退房 </label>
              </div>
            </div>
            <ClientOnly>
              <VueDatePicker
                v-model.range.string="bookingDate"
                :masks="masks"
                :first-day-of-week="1"
                :min-date="minDate"
                :max-date="maxDate"
                :rows="rows"
                :columns="columns"
                :expanded="expanded"
                :title-position="titlePosition"
              />
            </ClientOnly>

            <div class="d-flex justify-content-between align-items-center">
              <p class="mb-0">
                人數
              </p>
              <div class="d-flex align-items-center gap-4">
                <button
                  :class="{ 'disabled ': bookingPeople === 1 }"
                  class="btn p-2 border rounded-circle"
                  type="button"
                  @click="bookingPeople--"
                >
                  <Icon class="fs-5" icon="ic:baseline-minus" />
                </button>

                <h6 id="people" class="fw-bold mb-0" name="people">
                  {{ bookingPeople }}
                </h6>

                <button
                  :class="{
                    disabled: bookingPeople === room?.maxPeople,
                  }"
                  class="btn p-2 border rounded-circle"
                  type="button"
                  @click="bookingPeople++"
                >
                  <Icon class="fs-5" icon="ic:baseline-plus" />
                </button>
              </div>
            </div>
            <h5 class="mb-0 fw-bold">
              NT$ {{ roomPrice }}
            </h5>
            <button
              type="button"
              class="btn btn-primary py-3 fw-bold rounded-3"
              @click="takeReservation"
            >
              立即預訂
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
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
