// /api/error
export default defineEventHandler(() => {
  throw createError({
    statusCode: 500,
    statusMessage: '測試伺服器錯誤',
  })
})
