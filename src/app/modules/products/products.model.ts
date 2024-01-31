import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  sportsType: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
  },
  material: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  condition: {
    enum: ['new', 'used'],
  },
  weight: {
    type: Number,
    required: true,
  },
  addedBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
})

export const Product = mongoose.model('product', productSchema)
