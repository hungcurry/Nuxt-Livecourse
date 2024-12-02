<script setup lang="ts">
import VoteBtn from '@components/Vote/Btn.vue'

const voteStore = useVoteStore()
const { voteSend } = voteStore
</script>

<template>
  <div class="vote-list">
    <div v-for="card in voteStore.voteList" :key="card.path" class="card">
      <div class="card_info">
        <img :src="card?.path" :alt="card?.name">
        <h1>
          {{ card?.name }}
        </h1>
      </div>
      <VoteBtn @click="voteSend(card?.name)">
        {{ voteStore.isLoad ? "重新計算中..." : card?.count }}
      </VoteBtn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  width: 170px;
  height: 220px;
  margin: 10px;
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
