// 通用的 API 回應型別
type TApiResponse<T> = {
  data?: T // 例如 axios 的 { data }
  result?: T // 例如 $fetch 常見的 { result }
  status?: string // 可能的 API 狀態欄位
  message?: string // 可選的訊息欄位，用於錯誤信息等
}

type TNewsItem = {
  _id: string
  title: string
  description: string
  image: string
  createdAt: string
  updatedAt: string
}

type TRoomFeature = {
  title: string
  isProvide: boolean
}

type TRoomItem = {
  // 基本資訊
  _id: string
  name: string
  description: string

  // 房間規格
  areaInfo: string
  bedInfo: string
  maxPeople: number
  price: number

  // 圖片資源
  imageUrl: string
  imageUrlList: string[]

  // 房間配置與設施
  layoutInfo: TRoomFeature[]
  facilityInfo: TRoomFeature[]
  amenityInfo: TRoomFeature[]
}
export type { TNewsItem, TApiResponse, TRoomItem }
