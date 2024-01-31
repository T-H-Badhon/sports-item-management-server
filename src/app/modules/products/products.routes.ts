import { Router } from 'express'
import validate from '../../middlewares/ValidationFunction'
import { productValidations } from './products.validation'
import { productControllers } from './products.controllers'
import auth from '../../middlewares/auth'

const router = Router()

router.post(
  '/add-product',
  auth(),
  validate(productValidations.productValidationSchema),
  productControllers.addProduct,
)

router.get('/', auth(), productControllers.getProduct)
router.delete('/delete-marked', auth(), productControllers.deleteMarked) // user just marks products and seleted products ids are added to deleteIdsArray automatically . So , I feel no need to validate this array
router.delete('/:productId', auth(), productControllers.deleteOne)
export const productRoutes = router
