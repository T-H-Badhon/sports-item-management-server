import { Types } from 'mongoose'

export type TUser = {
  name: string
  username: string
  email: string
  password: string
}

export type TLoginUser = {
  username: string
  password: string
}

export type TtokenInfo = {
  _id: Types.ObjectId
  username: string
}
