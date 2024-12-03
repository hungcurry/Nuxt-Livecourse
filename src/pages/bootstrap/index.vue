<script setup lang="ts">
const route = useRoute()
const { $showModal, $showOffcanvas } = useNuxtApp()

// modal
const modalRef = ref(null)
let modal: { show: () => void, hide: () => void }
function showModal() {
  // 開啟 modal
  modal.show()
}
function closeModal() {
  // 關閉 modal
  modal.hide()
}

// offcanvas

const offcanvasRef = ref(null)
let offcanvas: { show: () => void, hide: () => void }
function showOffcanvas() {
  // 開啟 offcanvas
  offcanvas.show()
}
function closeOffcanvas() {
  // 關閉 offcanvas
  offcanvas.hide()
}

onMounted(() => {
  // 初始化 modal 與 offcanvas 元件
  modal = $showModal(modalRef.value, { keyboard: false })
  offcanvas = $showOffcanvas(offcanvasRef.value, { keyboard: false })
})
</script>

<template>
  <div class="container">
    <p>目前路由的路徑 - route.fullPath為 : {{ route.fullPath }}</p>
    <h1 class="primary">
      Page: bootstrap
    </h1>
    <h2 class="title">
      前台bootstrap
    </h2>
    <hr>

    <div class="d-flex gap-2">
      <button type="button" class="btn btn-primary">
        Primary
      </button>
      <button type="button" class="btn btn-secondary">
        Secondary
      </button>
      <button type="button" class="btn btn-success">
        Success
      </button>
      <button type="button" class="btn btn-danger">
        Danger
      </button>
      <button type="button" class="btn btn-warning">
        Warning
      </button>
      <button type="button" class="btn btn-info">
        Info
      </button>
      <button type="button" class="btn btn-light">
        Light
      </button>
      <button type="button" class="btn btn-dark">
        Dark
      </button>
      <button type="button" class="btn btn-link">
        Link
      </button>
    </div>
    <hr>

    <div class="container mb-5">
      <button type="button" class="btn btn-primary" @click="showModal">
        開啟 Modal
      </button>
    </div>
    <!-- modal 元件 -->
    <div
      id="staticBackdrop"
      ref="modalRef"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 id="staticBackdropLabel" class="modal-title fs-5">
              Modal title
            </h1>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              @click="closeModal"
            />
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <button type="button" class="btn btn-secondary" @click="showOffcanvas">
        開啟 Offcanvas
      </button>
    </div>
    <!-- Offcanvas  元件 -->
    <div
      id="offcanvasRight"
      ref="offcanvasRef"
      class="offcanvas offcanvas-end"
      tabindex="-1"
      aria-labelledby="offcanvasRightLabel"
    >
      <div class="offcanvas-header">
        <h5 id="offcanvasRightLabel" class="offcanvas-title">
          Offcanvas right
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          @click="closeOffcanvas"
        />
      </div>
      <div class="offcanvas-body">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, eius
        perferendis illum cum vero cumque totam repudiandae accusantium facere est
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
</style>
