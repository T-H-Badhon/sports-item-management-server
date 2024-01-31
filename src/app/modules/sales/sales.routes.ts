import { Router } from 'express'
import auth from '../../middlewares/auth'
import validate from '../../middlewares/ValidationFunction'
import { saleValidations } from './sales.validation'
import { saleControllers } from './sales.controllers'

const router = Router()

router.post(
  '/',
  auth(),
  validate(saleValidations.saleValidationSchema),
  saleControllers.saleProduct,
)

router.get('/', auth(), saleControllers.saleReport)

export const salesRoutes = router
