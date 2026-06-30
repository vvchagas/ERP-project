import { z } from 'zod'

export const productSchema = z.object({
  id: z.coerce.number(),
  name: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().int().min(0)
})

export const orderSchema = z.object({
  id: z.number(),
  customerId: z.number(),
  total: z.number().positive(),
  status: z.enum(['pending', 'completed', 'cancelled'])
})

export type Product = z.infer<typeof productSchema>
export type Order = z.infer<typeof orderSchema>