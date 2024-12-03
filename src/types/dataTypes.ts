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
type Framework = {
  path: string
  name: string
  count: number
}
// 投票類型
type TFrameworks = {
  [key: string]: Framework
}
// todo list
type TRegistrationForm = {
  email: string
  password: string
  nickname: string
}
type TLoginForm = {
  email: string
  password: string
}
type TTodo = {
  id: number
  createTime: string
  content: string
  status: boolean
}
export type {
  TBookingResult,
  TFrameworks,
  TLoginForm,
  TMenuItem,
  TRegistrationForm,
  TRoomFeature,
  TTodo,
  TUserRegister,
}
