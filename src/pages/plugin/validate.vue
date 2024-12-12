<script setup lang="ts">
const { successAlert } = useAlert()
const submitButtonRef = ref<HTMLButtonElement | null>(null)
const formRef = ref<HTMLFormElement | null>(null)

function confirmReservation() {
  console.log(submitButtonRef.value)
  // <button type="submit" disabled=""> 確認訂房 </button>
  if (submitButtonRef.value) {
    submitButtonRef.value.click()
  }
}

function onSubmit(value = {}, { resetForm }: { resetForm: () => void }) {
  console.log('送出的值:', value)
  successAlert('送出訂房!')
  // 改成用 VeeValidate  的 resetForm 方法將表單重置
  // formRef.value.reset();
  resetForm()
}
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-7">
        <section>
          <h2 class="mb-4 fw-bold">
            訂房人資訊
          </h2>

          <VForm v-slot="{ errors, meta }" ref="formRef" @submit="onSubmit">
            <div class="mb-4">
              <label for="name" class="form-label fw-bold">姓名</label>
              <VField
                id="name"
                name="name"
                type="text"
                class="form-control p-3 rounded-3"
                :class="{ 'is-invalid': errors.name }"
                placeholder="請輸入姓名"
                rules="required|username"
              />
              <VErrorMessage class="invalid-feedback" name="name" />
              <!-- <span name="姓名" class="invalid-feedback">姓名 不能小於 2 個字元</span> -->
            </div>

            <div class="mb-4">
              <label for="phone" class="form-label fw-bold">手機號碼</label>
              <VField
                id="phone"
                name="phone"
                type="tel"
                class="form-control p-3 rounded-3"
                :class="{ 'is-invalid': errors.phone }"
                placeholder="請輸入手機號碼"
                rules="required|phone"
              />
              <VErrorMessage class="invalid-feedback" name="phone" />
              <!-- <span class="invalid-feedback">需要正確的電話號碼</span> -->
            </div>

            <div class="mb-4">
              <label for="email" class="form-label fw-bold">電子信箱</label>
              <VField
                id="email"
                name="email"
                type="email"
                class="form-control p-3 rounded-3"
                :class="{ 'is-invalid': errors.email }"
                placeholder="請輸入電子信箱"
                rules="required|email"
              />
              <VErrorMessage class="invalid-feedback" name="email" />
              <!-- <span class="invalid-feedback">電子信箱 須為有效的電子信箱</span> -->
            </div>

            <div class="mb-4">
              <label for="road" class="form-label fw-bold">地址</label>
              <div class="d-flex justify-content-center gap-2 mb-4">
                <div class="w-100">
                  <VField
                    name="city"
                    class="form-select w-50 p-3 fw-medium rounded-3"
                    :class="{ 'is-invalid': errors.city }"
                    as="select"
                    rules="required"
                  >
                    <option selected disabled value="">
                      請選擇縣市
                    </option>
                    <option value="高雄市">
                      高雄市
                    </option>
                  </VField>
                  <VErrorMessage class="invalid-feedback" name="city" />
                </div>
                <div class="w-100">
                  <VField
                    name="county"
                    class="form-select w-50 p-3 fw-medium rounded-3"
                    :class="{ 'is-invalid': errors.county }"
                    as="select"
                    rules="required"
                  >
                    <option selected disabled value="">
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
                  </VField>
                  <VErrorMessage class="invalid-feedback" name="county" />
                </div>
              </div>
              <div>
                <VField
                  id="road"
                  name="road"
                  type="text"
                  class="form-control p-3 rounded-3"
                  :class="{ 'is-invalid': errors.road }"
                  placeholder="請輸入詳細地址"
                  rules="required"
                />
                <VErrorMessage class="invalid-feedback" name="road">
                  <span class="invalid-feedback">地址 為必填</span>
                </VErrorMessage>
              </div>
            </div>
            <button
              ref="submitButtonRef"
              type="submit"
              style="display: none;"
              :disabled="!meta.valid"
            >
              確認訂房
            </button>
          </VForm>
        </section>
      </div>
      <div class="col-md-5">
        <img
          class="img-fluid rounded-3"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/room2-1.png"
          alt="尊爵雙人房"
        >
        <div class="my-5">
          <h2 className="mb-3 fw-bold">
            價格詳情
          </h2>
          <div
            class="d-flex justify-content-between align-items-center mb-3 fw-medium"
          >
            <span>NT$ 10,000 X 2 晚 </span>
            <span>NT$ 20,000</span>
          </div>
          <div
            class="d-flex justify-content-between align-items-center fw-medium"
          >
            <p class="mb-0">
              住宿折扣
            </p>
            <span class="text-info">-NT$ 1,000</span>
          </div>
          <hr class="my-3">
          <div
            class="d-flex justify-content-between align-items-center fw-bold"
          >
            <p class="mb-0">
              總價
            </p>
            <span>NT$ 19,000</span>
          </div>
        </div>

        <button
          class="btn btn-lg btn-primary w-100 fw-bold rounded-3"
          type="button"
          @click="confirmReservation"
        >
          確認訂房
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
