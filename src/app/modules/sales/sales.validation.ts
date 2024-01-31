import { z } from 'zod'

const saleValidationSchema = z.object({
  body: z.object({
    quantity: z.number(),
    buyerName: z.string(),
    date: z.date(),
  }),
})

export const saleValidations = {
  saleValidationSchema,
}
