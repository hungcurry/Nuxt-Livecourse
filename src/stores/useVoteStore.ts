import type { TFrameworks } from '@/types/dataTypes'

export const VoteStore = defineStore('vote', () => {
  const { successAlert, errorAlert } = useAlert()

  // 是否送出投票
  const isLoad = ref(false)

  // 儲存投票列表
  const voteList = ref<TFrameworks>({})

  // 寫入 | 更新投票列表
  const setVoteList = (list: TFrameworks) => {
    voteList.value = list
  }

  // 送出投票
  const voteSend = async (type: string) => {
    if (isLoad.value)
      return
    isLoad.value = true
    try {
      const res = await $fetch<TFrameworks> ('https://vue-lessons-api.vercel.app/vote/add', {
        method: 'POST',
        body: { type },
      })
      // eslint-disable-next-line no-console
      console.log('voteSend', res)
      setVoteList(res)
      successAlert('投票完成')
    }
    catch (error) {
      errorAlert('暫時無法投票')
    }
    finally {
      isLoad.value = false
    }
  }

  return { isLoad, voteList, setVoteList, voteSend }
})
