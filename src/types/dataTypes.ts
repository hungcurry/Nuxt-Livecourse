// 房間特徵類型
type TRoomFeature = {
  title: string
  isProvide: boolean
}
// 預訂結果類型
type TBookingResult = {
  name: string
  user: {
    name: string
    phone: string
  }
  areaInfo: string
  bedInfo: string
  layoutInfo: TRoomFeature[]
  facilityInfo: TRoomFeature[]
  amenityInfo: TRoomFeature[]
}
// 用戶註冊類型
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
// 選單項目類型
type TMenuItem = {
  label: string
  path: string
}
export type {
  TBookingResult,
  TMenuItem,
  TRoomFeature,
  TUserRegister,
}
