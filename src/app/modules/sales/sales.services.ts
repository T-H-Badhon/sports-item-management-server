import mongoose, { Types } from 'mongoose'
import { TSale } from './sales.interface'
import { Sale } from './sales.model'
import { AppError } from '../../errors/AppError'
import httpStatus from 'http-status'
import { Product } from '../products/products.model'

const saleProduct = async (
  saleData: TSale,
  userId: Types.ObjectId,
  currentQuantity: number,
) => {
  saleData.saleBy = userId

  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    const sale = await Sale.create([saleData], { session })

    if (!sale.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'sale Failed!')
    }

    if (currentQuantity > 0) {
      const newInventory = await Product.findByIdAndUpdate(
        saleData.productId,
        { quantity: currentQuantity },
        { new: true, session },
      )

      if (!newInventory?.quantity) {
        throw new AppError(httpStatus.BAD_REQUEST, 'sale failed!')
      }
    } else {
      const deletedProduct = await Product.findByIdAndDelete(
        saleData.productId,
        { session },
      )
      console.log(deletedProduct)
    }
    await session.commitTransaction()
    await session.endSession()
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to review course')
  }
}

const saleReport = async (query: Record<string, unknown>) => {
  console.log(query)
}

export const saleServices = {
  saleProduct,
  saleReport,
}
