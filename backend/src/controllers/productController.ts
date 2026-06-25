import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { createProductService } from '../services/productService'

const createProductBodySchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  sku: z.string().min(1).optional(),
  storeId: z.string().optional(),
})

export const createProductController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const rawBody = request.body as unknown
    const body = createProductBodySchema.parse(rawBody)

    const result = await createProductService(body)

    return reply.code(201).send({ ...result, success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return reply.code(400).send({ error: 'Invalid request body', details: err.flatten() })
    }

    return reply.code(500).send({ error: 'Create product failed', details: (err as any)?.message ?? String(err) })
  }
}


