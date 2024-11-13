<script setup>
// import SlotBack from '@/components/Slots/SlotBack.vue'
const state = ref(0)
const message = ref('')
const props = defineProps({
  error: Object,
})
const { error } = toRefs(props)
// 打 http://localhost:3000/Nuxt-Livecourse/api/error 會觸發錯誤
console.log('全域error', error.value)

const errorCode = Number(error.value.statusCode)
const errorMessage = error.value.statusMessage

if (errorCode === 500) {
  state.value = errorCode
  message.value = errorMessage
}
if (errorCode === 400) {
  state.value = errorCode
  message.value = errorMessage
}
const handleError = () => clearError({ redirect: '/' })
</script>
<template>
  <NuxtLayout>
    <!-- 錯誤處理 -->
    <h1>錯誤處理</h1>
    <ErrorMessage :code="state" :message="message" />
    <!-- <slot-back @click="handleError">回首頁</slot-back> -->
  </NuxtLayout>
</template>
<style lang="scss" scoped></style>
