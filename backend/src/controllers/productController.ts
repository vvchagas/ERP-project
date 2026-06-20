import { FastifyRequest, FastifyReply } from 'fastify'
import { createProductService } from '../services/productService'


export const createProductController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const body = request.body as any
    const { name, price, stock, sku, storeId } = body ?? {}

    const result = await createProductService({
      name,
      price,
      stock,
      sku,
      storeId,
    })

    return reply.code(201).send({ ...result, success: true })
  } catch (err) {
    return reply.code(500).send({ error: 'Create product failed' })
  }
}

