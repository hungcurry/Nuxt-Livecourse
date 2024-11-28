export default defineNuxtRouteMiddleware((to, from) => {
  // 3.全域的middleware
  // console.log('全域的middleware', { to, from })

  // 取得 cookie
  // const auth = useCookie('auth')
  // // 需要驗證的頁面
  // const isNeedAuth = ['/about']

  // // 如果需要驗證的頁面，且 cookie 不存在，則導航到 /address
  // if (isNeedAuth.includes(to.path)) {
  //   // 如果 cookie 不存在，則導航到 /address
  //   if (!auth.value) {
  //     return navigateTo('/address')
  //   }
  // }
})
