import { Types } from 'mongoose'

export type TProduct = {
  name: string
  price: number
  quantity: number
  sportsType: string
  brand: string
  size?: number
  material: string
  color: string
  condition: 'new' | 'used'
  weight: number
  addedBy: Types.ObjectId
}
