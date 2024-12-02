<script setup lang="ts">
import type { TFrameworks } from '@/types/dataTypes'

const route = useRoute()
const countStore = useCountStore()
const voteStore = useVoteStore()
const { setVoteList } = voteStore

const { data } = await useFetch<TFrameworks>('https://vue-lessons-api.vercel.app/vote/list')
console.log('useFetch', data.value)
if (data.value) {
  setVoteList(data.value)
}

// const { data: voteData } = await useAsyncData('getVote', () =>
//   $fetch('https://vue-lessons-api.vercel.app/vote/list'))
// console.log('useAsyncData', voteData.value)
// setVoteList(voteData.value)
</script>

<template>
  <div class="container">
    <p>目前路由的路徑 - route.fullPath為 : {{ route.fullPath }}</p>
    <h1 class="primary">
      Page: Store
    </h1>
    <h2 class="title">
      前台Store
    </h2>
    <hr>

    <p>countStore.num: {{ countStore.num }}</p>
    <button @click="countStore.addCount">
      addCount
    </button>

    <!-- 投票列表 -->
    <div class="vote_app">
      <h1>投票列表</h1>
      <div class="box_list">
        <client-only>
          <Vote />
        </client-only>
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
.vote_app {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  > h1 {
    font-size: 30px;
    margin-bottom: 50px;
  }
}
.box_list {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card {
  width: 140px;
  height: 200px;
  border: 1px solid #999;
  padding: 10px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .card_info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      width: 100px;
    }
  }
}
</style>
