import mongoose, { Schema } from 'mongoose'
import { TUser } from './users.interfaces'

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

export const User = mongoose.model('user', userSchema)
