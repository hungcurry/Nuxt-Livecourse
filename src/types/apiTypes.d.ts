import type { TRoomFeature } from '@/types/dataTypes'
// API 回應類型
type TApiResponse<T> = {
  data?: T
  result?: T
  newTodo?: T
  status?: string
  message?: string
  token?: string
}
// 新聞項目類型
type TApiNewsItem = {
  _id: string
  title: string
  description: string
  image: string
  createdAt: string
  updatedAt: string
}
// 房間項目類型
type TApiRoomItem = {
  _id: string
  name: string
  description: string
  imageUrl: string
  imageUrlList: string[]
  areaInfo: string
  bedInfo: string
  maxPeople: number
  price: number
  totalPrice?: number
  status: number
  layoutInfo: TRoomFeature[]
  facilityInfo: TRoomFeature[]
  amenityInfo: TRoomFeature[]
  createdAt: string
  updatedAt: string
}
// 用戶類型
type TApiUser = {
  address: {
    zipcode: string | number
    county: string
    district: string
    detail: string
  }
  name: string
  email: string
  phone: string
}
// 認證類型
type TApiAuth = {
  status: boolean
  token: string
}
export type {
  TApiAuth,
  TApiNewsItem,
  TApiResponse,
  TApiRoomItem,
  TApiUser,
}
