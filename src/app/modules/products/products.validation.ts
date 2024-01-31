import { z } from 'zod'

const productValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required!' }),
    price: z.number({
      required_error: 'price is required!',
      invalid_type_error: 'price must be in number!',
    }),
    quantity: z.number({ required_error: 'quantity is required!' }),
    sportsType: z.string({ required_error: 'sports type is required!' }),
    brand: z.string({ required_error: 'brand is required!' }),
    size: z
      .number({ invalid_type_error: 'size must be in number!' })
      .optional(), // this is optional because its not applicable for every products.
    material: z.string({ required_error: 'material is required!' }),
    color: z.string({ required_error: 'color is required!' }),
    condition: z.enum(['new', 'used']),
    weight: z
      .number({ invalid_type_error: 'weight must be in number!' })
      .optional(), // it's an additional information not  mandatory
  }),
})

export const productValidations = {
  productValidationSchema,
}
