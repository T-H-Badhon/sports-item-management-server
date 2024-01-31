import mongoose, { Schema } from 'mongoose'
import { TSale } from './sales.interface'

const saleSchema = new Schema<TSale>({
  quantity: {
    type: Number,
    required: true,
  },
  buyerName: {
    type: String,
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  saleBy: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
  },
  productAfterSaleQuantity: {
    type: Number,
    required: true,
  },
})

export const Sale = mongoose.model('sale', saleSchema)
