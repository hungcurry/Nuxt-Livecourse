type TRoomFeature = {
  title: string
  isProvide: boolean
}
type TUserRegister = {
  name: string
  email: string
  password: string
  phone: string
  birthday: string
  address: {
    zipcode: string
    detail: string
  }
}
type TBookingResult = {
  name: string
  user: {
    name: string
    phone: string
  }
  areaInfo: string
  bedInfo: string
  layoutInfo: {
    title: string
  }[]
  facilityInfo: {
    title: string
  }[]
}
// ===================
// ... API 回應型別 ...
// ===================
// 通用的 API 格式
type TApiResponse<T> = {
  data?: T // 例如 axios 的 { data }
  result?: T // 例如 $fetch 常見的 { result }
  status?: string // 可能的 API 狀態欄位
  message?: string // 可選的訊息欄位，用於錯誤信息等
  token?: string // 可選的 token 欄位，用於登入等
}
type TApiNewsItem = {
  _id: string
  title: string
  description: string
  image: string
  createdAt: string
  updatedAt: string
}
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
  status: number
  layoutInfo: TRoomFeature[]
  facilityInfo: TRoomFeature[]
  amenityInfo: TRoomFeature[]
  createdAt: string
  updatedAt: string
}
type TApiUser = {
  name: string
  email: string
  phone: string
  birthday?: string
  address: {
    zipcode: number
    county: string
    district: string
    detail: string
  }
}
type TApiAuth = {
  status: boolean
  token: string
}

export type { TApiAuth, TApiNewsItem, TApiResponse, TApiRoomItem, TApiUser, TBookingResult, TUserRegister }
