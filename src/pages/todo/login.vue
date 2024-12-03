<script setup lang="ts">
import type { TLoginForm } from '@/types/dataTypes'
import { useAlert } from '@/composables/useAlert'

const { successAlert, errorAlert } = useAlert()
const router = useRouter()
const loginFormData = ref<TLoginForm>({
  email: '',
  password: '',
})
// curry
// ooopp42@gmail.com
// 12345678
const isEnabled = ref(false)
function signInUser(body: TLoginForm) {
  isEnabled.value = true

  $fetch('https://todolist-api.hexschool.io/users/sign_in', {
    method: 'POST',
    body,
  })
    .then((res: unknown) => {
      const { token, exp } = res as { token: string, exp: number }
      // 設定 cookie，儲存 token 及其過期時間
      const cookie = useCookie('todoAuth', {
        expires: new Date(exp * 1000),
        path: '/',
      })
      cookie.value = token
      successAlert('登入成功')
      router.push('/todo/todos')
    })
    .catch((error) => {
      console.dir(error)
      const { message } = error.response._data
      // message 有 陣列 [] 和字串 "" 兩種回應格式
      if (Array.isArray(message)) {
        errorAlert(message.join('、'))
        return
      }
      errorAlert(message)
    })
    .finally(() => {
      loginFormData.value = {
        email: '',
        password: '',
      }
      isEnabled.value = false
    })
}
</script>

<template>
  <div class="container py-5">
    <div class="col-6 mx-auto">
      <h2 class="h3 mb-4">
        登入
      </h2>
      <form @submit.prevent="signInUser(loginFormData)">
        <div class="mb-4">
          <label for="loginemail">信箱 <span class="text-danger">*</span></label>
          <input
            id="loginemail"
            v-model="loginFormData.email"
            type="email"
            class="form-control"
            placeholder="example@gmail.com"
            required
          >
        </div>
        <div class="mb-4">
          <label for="loginpassword">密碼 <span class="text-danger">*</span></label>
          <input
            id="loginpassword"
            v-model="loginFormData.password"
            type="password"
            class="form-control"
            placeholder="請輸入密碼"
            required
          >
        </div>
        <button
          class="btn btn-secondary w-100"
          :disabled="isEnabled"
          type="submit"
        >
          登入
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
