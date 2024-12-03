<script setup lang="ts">
import type { TApiResponse } from '@/types/apiTypes'
import type { TTodo } from '@/types/dataTypes'

definePageMeta({
  middleware: async () => {
    // 檢查 token 是否有值
    const cookie = useCookie('todoAuth')
    if (!cookie.value)
      return navigateTo('/')

    const { error } = await useFetch('/users/checkout', {
      baseURL: 'https://todolist-api.hexschool.io',
      headers: { Authorization: cookie.value },
    })

    if (error.value)
      return navigateTo('/')
  },
})
const cookie = useCookie<string>('todoAuth')
const newTodo = ref('')
const todoStore = useTodoStore()
// 資料reactive 和 方法 可以直接解構
const { setTodoList, handleAddTodo, handleRemoveTodo } = todoStore
// 資料ref 和 computed 具有響應性，需經過 storeToRefs 解構
const { isFetch, todoList, todoQuantity } = storeToRefs(todoStore)

// 在伺服器端請求資料，傳遞給客戶端。
// https://todolist-api.hexschool.io/todos/
const { data: todoData } = await useAsyncData('getTodoList', async () => {
  isFetch.value = true
  try {
    const response = await $fetch<TApiResponse<TTodo[]>>('/todos/', {
      baseURL: 'https://todolist-api.hexschool.io',
      headers: { Authorization: cookie.value },
    })
    const { data } = response
    console.log('TodoList', data)
    // 將數據存入 pinia
    if (data) {
      setTodoList(data)
    }
    return data || []
  }
  catch (err) {
    console.error('Error todo list:', err)
    throw err // 繼續拋出錯誤
  }
  finally {
    isFetch.value = false
  }
})
console.log('todo', todoData.value)

// 點擊後，透過 todoStore 的 addTodo 方法將新增代辦事項
function addNewTodo() {
  if (newTodo.value && cookie.value) {
    handleAddTodo(newTodo.value, cookie.value)
    newTodo.value = ''
  }
}
// 移除 Todo
function deleteTodo(id: number) {
  if (cookie.value) {
    handleRemoveTodo(id, cookie.value)
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <h1 class="text-center mb-4">
          Todo List
        </h1>
        <div class="input-group mb-3">
          <input
            v-model.trim="newTodo"
            class="form-control"
            placeholder="新增待辦事項"
          >
          <button
            class="btn btn-primary"
            :disabled="!newTodo.length || isFetch"
            @click="addNewTodo"
          >
            新增 Todo
          </button>
        </div>
        <ul class="list-group">
          <li
            v-for="item in todoList"
            :key="item.id"
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              {{ item.content }}
            </span>
            <button
              class="btn btn-danger btn-sm"
              :disabled="isFetch"
              @click="deleteTodo(item.id)"
            >
              刪除
            </button>
          </li>
        </ul>
        <p class="mt-3">
          {{ todoQuantity }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
