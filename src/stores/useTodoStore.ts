import type { TApiResponse } from '@/types/apiTypes'
import type { TTodo } from '@/types/dataTypes'
import { useAlert } from '@/composables/useAlert'

export const TodoStore = defineStore('todo', () => {
  const { successAlert, errorAlert } = useAlert()
  const todoList = ref<TTodo[]>([])
  const isFetch = ref(false)

  const setTodoList = (data: TTodo[]) => {
    todoList.value = data
  }

  // 新增待辦事項 ( 客戶端操作 )
  const handleAddTodo = async (content: string, token: string) => {
    isFetch.value = true
    try {
      const response = await $fetch<TApiResponse<TTodo>>(
        'https://todolist-api.hexschool.io/todos/',
        {
          method: 'POST',
          headers: { Authorization: token },
          body: { content },
        },
      )
      // newTodo 為新增的待辦事項 ，格式如下
      // {
      //   "id",
      //   "createTime,
      //   "content",
      //   "status",
      // }

      // 將新增的待辦事項存入 pinia
      const { newTodo } = response
      if (newTodo) {
        todoList.value.push(newTodo)
      }
    }
    catch (error: any) {
      errorAlert(error)
    }
    finally {
      isFetch.value = false
    }
  }
  // 刪除待辦事項 ( 客戶端操作 )
  const handleRemoveTodo = async (id: number, cookie: string) => {
    const todoIndex = todoList.value.findIndex(todo => todo.id === id)
    isFetch.value = true
    try {
      await $fetch(`https://todolist-api.hexschool.io/todos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: cookie },
      })
      todoList.value.splice(todoIndex, 1)
    }
    catch (error: any) {
      errorAlert(error)
    }
    finally {
      isFetch.value = false
    }
  }

  // 定義 getters
  const todoQuantity = computed(() => {
    return `總共有 ${todoList.value.length} 個待辦事項`
  },
  )
  return {
    todoList,
    setTodoList,
    handleAddTodo,
    handleRemoveTodo,
    todoQuantity,
    isFetch,
  }
})
