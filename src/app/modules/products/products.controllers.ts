import { Request, Response } from 'express'
import catchAsync from '../../utilities/catchAsync'
import response from '../../utilities/response'
import { productServices } from './products.services'

const addProduct = catchAsync(async (req: Request, res: Response) => {
  const productData = req.body
  const id = req.user._id
  const result = await productServices.addProduct(productData, id)
  response(res, {
    success: true,
    statusCode: 201,
    message: 'Product added successfully',
    data: result,
  })
})

const getProduct = catchAsync(async (req: Request, res: Response) => {
  const query = req.query
  const result = await productServices.getProducts(query)
  response(res, {
    success: true,
    statusCode: 201,
    message: 'Products fetched successfully',
    data: result,
  })
})
const deleteOne = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.productId
  const result = await productServices.deleteOne(productId)
  response(res, {
    success: true,
    statusCode: 201,
    message: 'Product deleted successfully',
    data: result,
  })
})
const deleteProducts = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.body

  const result = await productServices.deleteProducts(id)
  response(res, {
    success: true,
    statusCode: 201,
    message: 'Products deleted successfully',
    data: result,
  })
})

export const productControllers = {
  addProduct,
  getProduct,
  deleteOne,
  deleteProducts,
}
