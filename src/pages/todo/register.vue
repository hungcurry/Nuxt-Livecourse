<script setup lang="ts">
import type { TRegistrationForm } from '@/types/dataTypes'
import { useAlert } from '@/composables/useAlert'

const { successAlert, errorAlert } = useAlert()
const router = useRouter()
const registrationFormData = ref<TRegistrationForm>({
  email: '',
  password: '',
  nickname: '',
})
// curry
// ooopp42@gmail.com
// 12345678
const isEnabled = ref(false)
function createUserAccount(body: TRegistrationForm) {
  isEnabled.value = true

  $fetch('https://todolist-api.hexschool.io/users/sign_up', {
    method: 'POST',
    body,
  })
    .then(() => {
      successAlert('註冊成功')
      router.push('/todo/login')
    })
    .catch((error) => {
      const { message } = error.response._data
      // message 有陣列 [] 和字串 "" 兩種回應格式
      if (Array.isArray(message)) {
        successAlert(message.join('、'))
        return
      }
      errorAlert(message)
    })
    .finally(() => {
      registrationFormData.value = {
        email: '',
        password: '',
        nickname: '',
      } // 清空註冊表單
      isEnabled.value = false // 解鎖按鈕
    })
}
</script>

<template>
  <div class="container py-5">
    <div class="col-8 mx-auto">
      <h2 class="h3 mb-4">
        註冊
      </h2>
      <form @submit.prevent="createUserAccount(registrationFormData)">
        <div class="mb-4">
          <label for="nickName">暱稱<span class="text-danger">*</span></label>
          <input
            id="nickName"
            v-model="registrationFormData.nickname"
            type="text"
            class="form-control"
            placeholder="請輸入您的暱稱"
            required
          >
        </div>
        <div class="mb-4">
          <label for="email">信箱 <span class="text-danger">*</span></label>
          <input
            id="email"
            v-model="registrationFormData.email"
            type="email"
            class="form-control"
            placeholder="example@gmail.com"
            required
          >
        </div>

        <div class="mb-4">
          <label for="password">密碼 <span class="text-danger">*</span></label>
          <input
            id="password"
            v-model="registrationFormData.password"
            type="password"
            class="form-control"
            placeholder="請輸入密碼"
            required
          >
        </div>
        <div class="d-flex gap-3">
          <button
            class="btn btn-primary w-50"
            type="submit"
            :disabled="isEnabled"
          >
            註冊
          </button>
          <NuxtLink
            to="/todo/login"
            class="btn btn-outline-primary w-50"
            :class="{ disabled: isEnabled }"
          >
            已經有帳號
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
