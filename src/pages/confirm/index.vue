<script setup lang="ts">
// 1. 從 useBookingStore 取出資料 bookingResult
const bookingStore = useBookingStore()
const { bookingResult } = storeToRefs(bookingStore)
</script>

<template>
  <div class="container mt-5">
    <template v-if="bookingResult">
      <!-- 2. 渲染至 HTML 模板 -->
      <div class="row">
        <div class="col-lg-4">
          <h2 class="mb-3 title">
            預訂成功 !
          </h2>
          <h3 class="mb-3 subtitle">
            訂房人資訊
          </h3>
          <h4 class="info-title">
            姓名
          </h4>
          <p class="info-content">
            {{ bookingResult.user.name }}
          </p>
          <h4 class="info-title">
            手機號碼
          </h4>
          <p class="info-content">
            {{ bookingResult.user.phone }}
          </p>
        </div>
        <div class="col-lg-8">
          <h3 class="mb-3 subtitle">
            房型資訊
          </h3>
          <p class="fs-1 room-name">
            {{ bookingResult.name }}
          </p>
          <hr class="divider">
          <section class="mb-5">
            <h3 class="section-title">
              房型基本資訊
            </h3>
            <ul class="list-unstyled d-flex">
              <li>
                <div class="badge bg-light text-dark fs-5 info-badge">
                  {{ bookingResult?.areaInfo }}
                </div>
              </li>
              <li>
                <div class="badge bg-light text-dark fs-5 info-badge">
                  {{ bookingResult?.bedInfo }}
                </div>
              </li>
              <li>
                <div class="badge bg-light text-dark fs-5 info-badge">
                  {{ bookingResult?.bedInfo }}
                </div>
              </li>
            </ul>
          </section>
          <section class="mb-5">
            <h3 class="section-title">
              房間格局
            </h3>
            <ul class="list-unstyled d-flex">
              <li
                v-for="layout in bookingResult.layoutInfo"
                :id="layout.title"
                :key="layout.title"
                class="mx-1"
              >
                <div class="badge bg-light text-dark fs-5 info-badge">
                  {{ layout.title }}
                </div>
              </li>
            </ul>
          </section>
          <section class="mb-5">
            <h3 class="section-title">
              房內設備
            </h3>
            <ul class="list-unstyled d-flex flex-wrap">
              <li
                v-for="layout in bookingResult.facilityInfo"
                :id="layout.title"
                :key="layout.title"
                class="mx-1"
              >
                <div class="badge bg-light text-dark fs-5 info-badge">
                  {{ layout.title }}
                </div>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </template>
    <template v-else>
      <h1 class="no-info">
        目前沒有預訂資訊
      </h1>
    </template>
    <NuxtLink to="/" class="btn btn-primary back-btn block mx-auto">
      回上一頁
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.title {
  color: #2c3e50;
  font-weight: bold;
}

.subtitle {
  color: #34495e;
  border-bottom: 2px solid #3498db;
  padding-bottom: 5px;
}

.info-title {
  color: #7f8c8d;
  margin-top: 15px;
}

.info-content {
  font-size: 18px;
  color: #2c3e50;
}

.room-name {
  color: #e74c3c;
  font-weight: bold;
}

.divider {
  border-top: 1px solid #bdc3c7;
  margin: 20px 0;
}

.section-title {
  color: #16a085;
  margin-bottom: 10px;
}

.info-badge {
  background-color: #ecf0f1 !important;
  color: #2c3e50 !important;
  margin-right: 10px;
  padding: 8px 12px;
  border-radius: 20px;
}

.no-info {
  color: #e74c3c;
  text-align: center;
  margin-top: 50px;
}

.back-btn {
  margin-top: 30px;
  background-color: #3498db;
  border: none;
  &:hover {
    background-color: #2980b9;
  }
}
</style>
