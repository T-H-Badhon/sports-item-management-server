import { Types } from 'mongoose'

export type TSale = {
  quantity: number
  buyerName: string
  productId: Types.ObjectId
  saleBy: Types.ObjectId
  date: Date
  productAfterSaleQuantity: number
}
