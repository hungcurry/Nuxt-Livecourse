/* eslint-disable no-console */
import type { TApiAuth, TApiResponse } from '@/types/apiTypes'

export default defineNuxtRouteMiddleware(async (to, from) => {
  // console.log('auth=>', { to, from })
  const { $swal, isHydration, payload } = useNuxtApp()

  // 避免 重複發出 API 請求
  // 如果是在 client 端，且是 hydration 階段，且是 serverRendered，則返回
  if (import.meta.client && isHydration && payload.serverRendered) {
    return
  }

  const token = useCookie('Freyja-auth')
  if (!token.value)
    return navigateTo('/account/login')

  try {
    const authStatus = await $fetch<TApiResponse<TApiAuth>>('/v1/user/check', {
      baseURL: 'https://nuxr3.zeabur.app/api',
      method: 'GET',
      headers: {
        Authorization: token.value,
      },
    })
    console.log('驗證token成功', authStatus.status)
  }
  catch (error) {
    token.value = null
    return navigateTo('/account/login')
  }
})
