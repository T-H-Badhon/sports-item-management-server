import { Types } from 'mongoose'
import { TProduct } from './products.interfaces'
import { Product } from './products.model'

const addProduct = async (productData: TProduct, id: Types.ObjectId) => {
  productData.addedBy = id

  const product = await Product.create(productData)

  return product
}

const getProducts = async (query: Record<string, unknown>) => {
  console.log(query)
}

const deleteOne = async (id: string) => {
  const result = await Product.findByIdAndDelete(id)

  return result
}

const deleteMarked = async (ids: { ids: [Types.ObjectId] }) => {
  const result = await Product.deleteMany({ _id: { $in: ids } })
  console.log(result)

  return result
}

export const productServices = {
  addProduct,
  getProducts,
  deleteOne,
  deleteMarked,
}
