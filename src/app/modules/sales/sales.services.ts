import mongoose, { Types } from 'mongoose'
import { TSale } from './sales.interface'
import { Sale } from './sales.model'
import { AppError } from '../../errors/AppError'
import httpStatus from 'http-status'
import { Product } from '../products/products.model'
import { filterGenerator } from './sales.utilities'

const saleProduct = async (
  saleData: TSale,
  userId: Types.ObjectId,
  currentQuantity: number,
) => {
  saleData.saleBy = userId
  saleData.date = new Date(saleData.date)

  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    saleData.date = new Date(saleData.date)

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
      await Product.findByIdAndDelete(saleData.productId, { session })
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
  const filter = filterGenerator(query)

  const result = await Sale.aggregate([
    {
      $match: filter,
    },
    {
      $lookup: {
        from: 'products', // The name of the Product collection
        localField: 'productId', // Field from the Sale collection
        foreignField: '_id', // Field from the Product collection
        as: 'productDetails', // The alias for the joined data
      },
    },
    {
      $unwind: '$productDetails',
    },
    {
      $group: {
        _id: null,
        sales: {
          $push: {
            productName: '$productDetails.name',
            buyer: '$buyerName',
            date: '$date',
          },
        },
        totalSaleValue: {
          $sum: { $multiply: ['$sellQuantity', '$productDetails.price'] },
        },
        totalQuantity: { $sum: '$sellQuantity' },
      },
    },
  ])

  return result[0]
}

export const saleServices = {
  saleProduct,
  saleReport,
}
