<script setup lang="ts">
import { TUserRegister } from '@/types/dataTypes'
import { TApiResponse, TApiUser } from '@/types/apiTypes'
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
const register = async () => {
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
  } catch (error: any) {
    ;($swal as any).fire({
      position: 'center',
      icon: 'error',
      title: error.response?._data?.message || '註冊失敗',
      showConfirmButton: false,
      timer: 1500,
    })
  }
}
</script>

<template>
  <div class="bg-light py-3 py-md-5 vh-100">
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
          <div class="bg-white p-4 p-md-5 rounded shadow-sm">
            <h2 class="h3 mb-4">會員註冊</h2>
            <form>
              <div class="form-floating mb-4">
                <label for="firstName">姓名 <span class="text-danger">*</span></label>
                <input
                  type="text"
                  class="form-control"
                  id="firstName"
                  placeholder="王小明"
                  required
                  v-model="userRegisteObject.name"
                />
              </div>

              <div class="form-floating mb-4">
                <label for="email">信箱 <span class="text-danger">*</span></label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="example@gmail.com"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  required
                  v-model="userRegisteObject.email"
                />
              </div>

              <div class="form-floating mb-4">
                <label for="password">密碼 <span class="text-danger">*</span></label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="請輸入 8 碼以上密碼"
                  pattern=".{8,}"
                  required
                  v-model="userRegisteObject.password"
                />
              </div>

              <div class="form-floating mb-4">
                <label for="phone">電話</label>
                <input
                  type="tel"
                  class="form-control"
                  id="phone"
                  placeholder="0912345678"
                  pattern="(\+886|0)?9\d{8}|(\+886|0)?2\d{8}|\d{3}-\d{4}-\d{4}"
                  required
                  v-model="userRegisteObject.phone"
                />
              </div>

              <div class="form-floating mb-4">
                <label for="dateInput">出生年月日</label>
                <input type="date" class="form-control" id="dateInput" required v-model="userRegisteObject.birthday" />
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-floating mb-4">
                    <label for="zipcode">郵遞區號</label>
                    <input
                      type="text"
                      class="form-control"
                      id="zipcode"
                      placeholder="100"
                      pattern="\d{3,}"
                      required
                      v-model="userRegisteObject.address.zipcode"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-floating mb-4">
                    <label for="address">詳細地址</label>
                    <input
                      type="text"
                      class="form-control"
                      id="address"
                      placeholder="台北市中正區重慶南路一段"
                      required
                      v-model="userRegisteObject.address.detail"
                    />
                  </div>
                </div>
              </div>

              <button class="btn btn-lg btn-primary w-100" type="button" @click.prevent="register">註冊</button>
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
