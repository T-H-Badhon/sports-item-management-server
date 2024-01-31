import { Request, Response } from 'express'
import catchAsync from '../../utilities/catchAsync'
import { saleServices } from './sales.services'
import response from '../../utilities/response'

const saleProduct = catchAsync(async (req: Request, res: Response) => {
  const { currentQuantity, ...payload } = req.body

  const userId = req.user._id

  const result = await saleServices.saleProduct(
    payload,
    userId,
    currentQuantity,
  )

  response(res, {
    success: true,
    statusCode: 201,
    message: 'Product sold successfully',
    data: result,
  })
})

const saleReport = catchAsync(async (req: Request, res: Response) => {
  const query = req.query

  const result = await saleServices.saleReport(query)

  response(res, {
    success: true,
    statusCode: 201,
    message: 'sale report fetch successfully',
    data: result,
  })
})

export const saleControllers = {
  saleProduct,
  saleReport,
}
