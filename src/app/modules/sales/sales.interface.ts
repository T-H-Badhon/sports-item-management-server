import { Types } from 'mongoose'

export type TSale = {
  sellQuantity: number
  buyerName: string
  productId: Types.ObjectId
  saleBy: Types.ObjectId
  date: Date
}
