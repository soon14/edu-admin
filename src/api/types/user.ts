export interface ILoginResponse {
  token: string
}

export interface IMenu {
  id: number
  access_id: number
  name: string
  hidden: boolean
  title: string
  children: IMenu[]
}
export interface IUserinfoResponse {
  avatar: string
  name: string
  introduction: string
  roles: string[]
  menus: IMenu[]
  accesses: string[]
  isplatform: boolean
}
