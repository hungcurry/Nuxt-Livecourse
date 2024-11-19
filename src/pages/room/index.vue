<script setup lang="ts">
import { TApiRoomItem } from '@/types/apiTypes'
const route = useRoute()
const router = useRouter()
const apiUrl = 'https://nuxr3.zeabur.app/api/v1/rooms'
const { data: roomsList, FetchInit } = useCustomFetch<TApiRoomItem[]>()

const handleClickRoom = (id: string) => {
  router.push({
    path: `/room/${id}`,
  })
}
onMounted(async () => {
  await FetchInit(apiUrl)
  console.log('roomsList', roomsList.value)
})
</script>

<template>
  <div>
    <h2>房型 index {{ route.fullPath }}</h2>
    <div class="container mt-4">
      <div class="row justify-content-center gy-3">
        <div class="col-8 col-md-6 col-lg-3" v-for="room in roomsList" :key="room._id">
          <div class="card h-100 shadow-sm" @click="handleClickRoom(room._id)">
            <img :src="room.imageUrl" class="card-img-top" alt="Room Image" />
            <div class="card-body d-flex flex-column">
              <h3 class="card-title">{{ room.name }}</h3>
              <p class="card-text flex-grow-1">{{ room.description }}</p>
              <ul class="list-unstyled">
                <li><strong>面積:</strong> {{ room.areaInfo }}</li>
                <li><strong>床型:</strong> {{ room.bedInfo }}</li>
                <li><strong>最大容納人數:</strong> {{ room.maxPeople }}</li>
                <li><strong>價格:</strong> {{ room.price }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
}

.card-img-top {
  object-fit: cover;
  height: 200px;
  max-width: 100%;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #2d3748;
}

.card-text {
  color: #4a5568;
  font-size: 0.875rem;
  line-height: 1.5;
}

.list-unstyled {
  li {
    margin-bottom: 0.5rem;
    color: #4a5568;
    font-size: 0.875rem;

    strong {
      color: #2d3748;
      margin-right: 0.25rem;
    }
  }
}
</style>
