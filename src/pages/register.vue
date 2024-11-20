<script setup lang="ts">
import type { TApiResponse, TApiUser } from '@/types/apiTypes'
import type { TUserRegister } from '@/types/dataTypes'

const { $swal } = useNuxtApp()
// 使用 sweetAlert2 套件顯示訊息
// $swal.fire({
//   position: "center",
//   icon: ...,
//   title: ...,
//   showConfirmButton: false,
//   timer: 1500,
// });

// 表單格式
// type TUserRegister = {
//   name: string
//   email: string
//   password: string
//   phone: string
//   birthday: string
//   address: {
//     zipcode: string
//     detail: string
//   }
// }

const userRegisteObject = ref<TUserRegister>({
  name: '',
  email: '',
  password: '',
  phone: '',
  birthday: '',
  address: {
    zipcode: '',
    detail: '',
  },
})
// 註冊 https://nuxr3.zeabur.app/api/v1/user/signup
async function register() {
  try {
    const response = await $fetch<TApiResponse<TApiUser>>('/v1/user/signup', {
      method: 'POST',
      body: userRegisteObject.value,
      baseURL: 'https://nuxr3.zeabur.app/api',
    })
    console.log('response', response)
    if (response.status) {
      ;($swal as any).fire({
        position: 'center',
        icon: 'success',
        title: '註冊成功',
        showConfirmButton: false,
        timer: 1500,
      })
      userRegisteObject.value = {
        name: '',
        email: '',
        password: '',
        phone: '',
        birthday: '',
        address: {
          zipcode: '',
          detail: '',
        },
      }
    }
  }
  catch (error: unknown) {
    ;($swal as any).fire({
      position: 'center',
      icon: 'error',
      title: (error as any).response?._data?.message || '註冊失敗',
      showConfirmButton: false,
      timer: 1500,
    })
  }
}
</script>

<template>
  <div class="bg-light py-3 py-md-5 h-full">
    <div class="container h-full">
      <div class="row justify-content-md-center">
        <div class="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
          <div class="bg-white p-4 p-md-5 rounded shadow-sm">
            <h2 class="mb-4">
              會員註冊
            </h2>
            <form>
              <div class="form-floating mb-4">
                <label for="firstName">姓名 <span class="text-danger">*</span></label>
                <input
                  id="firstName"
                  v-model="userRegisteObject.name"
                  type="text"
                  class="form-control"
                  placeholder="王小明"
                  required
                >
              </div>

              <div class="form-floating mb-4">
                <label for="email">信箱 <span class="text-danger">*</span></label>
                <input
                  id="email"
                  v-model="userRegisteObject.email"
                  type="email"
                  class="form-control"
                  placeholder="example@gmail.com"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  required
                >
              </div>

              <div class="form-floating mb-4">
                <label for="password">密碼 <span class="text-danger">*</span></label>
                <input
                  id="password"
                  v-model="userRegisteObject.password"
                  type="password"
                  class="form-control"
                  placeholder="請輸入 8 碼以上密碼"
                  pattern=".{8,}"
                  required
                >
              </div>

              <div class="form-floating mb-4">
                <label for="phone">電話</label>
                <input
                  id="phone"
                  v-model="userRegisteObject.phone"
                  type="tel"
                  class="form-control"
                  placeholder="0912345678"
                  pattern="(\+886|0)?9\d{8}|(\+886|0)?2\d{8}|\d{3}-\d{4}-\d{4}"
                  required
                >
              </div>

              <div class="form-floating mb-4">
                <label for="dateInput">出生年月日</label>
                <input
                  id="dateInput"
                  v-model="userRegisteObject.birthday"
                  type="date"
                  class="form-control"
                  required
                >
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-floating mb-4">
                    <label for="zipcode">郵遞區號</label>
                    <input
                      id="zipcode"
                      v-model="userRegisteObject.address.zipcode"
                      type="text"
                      class="form-control"
                      placeholder="100"
                      pattern="\d{3,}"
                      required
                    >
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-floating mb-4">
                    <label for="address">詳細地址</label>
                    <input
                      id="address"
                      v-model="userRegisteObject.address.detail"
                      type="text"
                      class="form-control"
                      placeholder="台北市中正區重慶南路一段"
                      required
                    >
                  </div>
                </div>
              </div>

              <button class="btn btn-lg btn-primary w-100" type="button" @click.prevent="register">
                註冊
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
