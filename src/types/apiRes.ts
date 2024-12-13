/** API 基礎回應結構 */
export type ApiBaseResponse = {
  status: boolean
  message?: string
  code?: number
  details?: unknown
}

/** 通用失敗回應結構 */
export type ApiFailureResponse = ApiBaseResponse & {
  status: false
  message: string
}

/** 通用成功回應結構 */
export type ApiSuccessResponse<T = unknown> = ApiBaseResponse & {
  status: true
  data?: T
  result?: T
  token?: string
  [key: string]: unknown
}

/** API 通用回應 */
export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiFailureResponse
