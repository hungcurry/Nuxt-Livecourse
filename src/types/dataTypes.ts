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
type TMenuItem = {
  label: string
  path: string
}
export type { TMenuItem, TUserRegister }
