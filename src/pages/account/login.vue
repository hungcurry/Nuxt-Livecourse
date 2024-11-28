<script setup lang="ts">
import type { TApiResponse, TApiUser } from '@/types/apiTypes'

// #region 串接旅館的
// 1. 串接旅館的 登入 API
// 2. 登入成功後，使用 useCookie() 將 token 寫入名稱為 "auth" 的 cookie
// 3. 需使用 try catch 處理請求
// 4. 請求成功與失敗皆使用 sweetAlert2 套件顯示訊息
// #endregion
const { successAlert, errorAlert } = useAlert()
const isEnabled = ref(false)
const userLoginObject = ref({
  email: '',
  password: '',
})
async function handelLogin() {
  // 登入 https://nuxr3.zeabur.app/api/v1/user/login
  // ooopp42+5@gmail.com
  // Zx26473564

  isEnabled.value = true
  try {
    const response = await $fetch<TApiResponse<TApiUser>>('/v1/user/login', {
      baseURL: 'https://nuxr3.zeabur.app/api',
      method: 'POST',
      body: userLoginObject.value,
    })
    console.log('登入-response', response)

    if (response.status) {
      const { status, token } = response
      const auth = useCookie('Freyja-auth', { maxAge: 600 })
      auth.value = token
      await successAlert('登入成功')
    }
  }
  catch (error: unknown) {
    console.log('error', (error as any).response?._data)
    const errorMessage = (error as any).response?._data?.message || '登入失敗'
    errorAlert(errorMessage)
  }
  finally {
    isEnabled.value = false // 解鎖按鈕
    // userLoginObject.value = {
    //   email: '',
    //   password: '',
    // }
  }
}
</script>

<template>
  <div class="py-3 py-md-5">
    <div class="container h-full">
      <div class="row justify-content-md-center">
        <div class="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
          <div class="bg-white p-4 p-md-5 rounded shadow-sm">
            <h2 class="mb-4">
              登入
            </h2>
            <form>
              <div class="input-group mb-4">
                <label for="email">信箱 <span class="text-danger">*</span></label>
                <input
                  id="email"
                  v-model="userLoginObject.email"
                  type="email"
                  class="form-control"
                  placeholder="example@gmail.com"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  required
                >
              </div>

              <div class="input-group mb-4">
                <label for="password">密碼 <span class="text-danger">*</span></label>
                <input
                  id="password"
                  v-model="userLoginObject.password"
                  type="password"
                  class="form-control"
                  placeholder="請輸入 8 碼以上密碼"
                  pattern=".{8,}"
                  required
                >
              </div>
              <button
                class="btn btn-lg btn-primary w-100"
                :disabled="isEnabled"
                type="button"
                @click.prevent="handelLogin"
              >
                登入
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-control {
  &:focus {
    border-color: $primary;
    box-shadow: 0 0 0 0.25rem rgba($primary, 0.25);
  }
}

.register-btn {
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
}

h2 {
  color: $primary;
  font-weight: bold;
}

.bg-white {
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
</style>
