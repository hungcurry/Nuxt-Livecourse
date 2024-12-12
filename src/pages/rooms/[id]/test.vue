<script setup>
definePageMeta({
  middleware: ['account-auth'],
})
const submitButtonRef = ref(null)
const bookingStore = useBookingStore()
const { getRoomInfo, getBookingInfo } = storeToRefs(bookingStore)

const router = useRouter()

const roomInfo = ref({})
const bookingInfo = ref({})
const userInfo = ref({})

const discountPrice = 1000

async function createOrder() {
  const cookie = useCookie('accountToken')
  const generateZipcode = (codeName) => {
    switch (codeName) {
      case '前金區':
        return 801
      case '鹽埕區':
        return 803
      case '新興區':
        return 800
      default:
        return 802
    }
  }

  const orderData = {
    roomId: roomInfo.value._id,
    checkInDate: bookingInfo.value.checkInDate,
    checkOutDate: bookingInfo.value.checkOutDate,
    peopleNum: bookingInfo.value.bookingPeople,
    userInfo: {
      address: {
        zipcode: generateZipcode(userInfo.value.region),
        detail:
          userInfo.value.city + userInfo.value.region + userInfo.value.address,
      },
      name: userInfo.value.name,
      phone: userInfo.value.phone,
      email: userInfo.value.email,
    },
  }
  const { result } = await $fetch('/api/v1/orders/', {
    baseURL: 'https://nuxr3.zeabur.app',
    method: 'POST',
    body: { ...orderData },
    headers: {
      Authorization: cookie.value,
    },
  })
  const orderId = result._id

  router.push(`/booking/${orderId}`)
}

function submitOrder() {
  submitButtonRef.value.click()
}

onMounted(() => {
  roomInfo.value = getRoomInfo()
  bookingInfo.value = getBookingInfo()
})
</script>

<template>
  <main>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-7">
          <section>
            <h2 class="mb-4 fw-bold">
              訂房人資訊
            </h2>
            <Form v-slot="{ errors }" @submit="createOrder">
              <div class="mb-4">
                <label for="name" class="form-label fw-bold">姓名</label>
                <Field
                  id="name"
                  v-model="userInfo.name"
                  name="姓名"
                  rules="required|min:2"
                  type="text"
                  class="form-control p-3 rounded-3"
                  :class="{ 'is-invalid': errors['姓名'] }"
                  placeholder="請輸入姓名"
                />
                <ErrorMessage name="姓名" class="invalid-feedback" />
              </div>

              <div class="mb-4">
                <label for="phone" class="form-label fw-bold">手機號碼</label>
                <Field
                  id="phone"
                  v-model="userInfo.phone"
                  name="手機號碼"
                  rules="required|isPhone"
                  type="tel"
                  class="form-control p-3 rounded-3"
                  :class="{ 'is-invalid': errors['手機號碼'] }"
                  placeholder="請輸入手機號碼"
                />
                <ErrorMessage name="手機號碼" class="invalid-feedback" />
              </div>

              <div class="mb-4">
                <label for="email" class="form-label fw-bold">電子信箱</label>
                <Field
                  id="email"
                  v-model="userInfo.email"
                  name="電子信箱"
                  rules="required|email"
                  type="email"
                  class="form-control p-3 rounded-3"
                  :class="{ 'is-invalid': errors['電子信箱'] }"
                  placeholder="請輸入電子信箱"
                />
                <ErrorMessage name="電子信箱" class="invalid-feedback" />
              </div>

              <div class="mb-4">
                <label for="road" class="form-label fw-bold">地址</label>
                <div className="d-flex gap-2 mb-4">
                  <Field
                    v-model="userInfo.city"
                    as="select"
                    name="縣市"
                    rules="required"
                    class="form-select w-50 p-3 fw-medium rounded-3"
                    :class="{ 'is-invalid': errors['縣市'] }"
                  >
                    <option selected disabled value="">
                      請選擇縣市
                    </option>
                    <option value="高雄市">
                      高雄市
                    </option>
                  </Field>
                  <Field
                    v-model="userInfo.region"
                    as="select"
                    name="行政區"
                    rules="required"
                    class="form-select w-50 p-3 fw-medium rounded-3"
                    :class="{ 'is-invalid': errors['行政區'] }"
                  >
                    <option selected disabled value="">
                      請選擇行政區
                    </option>
                    <option value="前金區" data-zipcode="801">
                      前金區
                    </option>
                    <option value="鹽埕區" data-zipcode="803">
                      鹽埕區
                    </option>
                    <option value="新興區" data-zipcode="800">
                      新興區
                    </option>
                  </Field>
                </div>
                <Field
                  id="road"
                  v-model="userInfo.address"
                  name="地址"
                  rules="required"
                  type="text"
                  class="form-control p-3 rounded-3"
                  :class="{ 'is-invalid': errors['地址'] }"
                  placeholder="請輸入詳細地址"
                />
                <ErrorMessage name="地址" class="invalid-feedback" />
              </div>
              <button
                ref="submitButtonRef"
                type="submit"
                class="d-none"
              />
            </Form>
          </section>
        </div>
        <div class="col-md-5">
          <img
            class="img-fluid rounded-3"
            :src="roomInfo.imageUrl"
            :alt="roomInfo.name"
          >
          <div class="my-5">
            <h2 className="mb-3 fw-bold">
              價格詳情
            </h2>
            <div
              class="d-flex justify-content-between align-items-center mb-3 fw-medium"
            >
              <span>NT$ {{ roomInfo.price }} X {{ bookingInfo.bookingDays }}晚
              </span>
              <span>NT$ {{ roomInfo.price * bookingInfo.bookingDays }}</span>
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
                  roomInfo.price * bookingInfo.bookingDays - discountPrice
                }}</span>
            </div>
          </div>

          <button
            class="btn btn-lg btn-primary w-100 fw-bold rounded-3"
            type="button"
            @click="submitOrder"
          >
            確認訂房
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
