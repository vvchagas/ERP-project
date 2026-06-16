import { FastifyRequest, FastifyReply } from 'fastify'
import { syncProductsService } from '@/services/syncService'
import { syncOrdersService } from '@/services/syncService'

export const syncProductsController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const count = await syncProductsService()
    return reply.code(200).send({ count, success: true })
  } catch (error) {
    return reply.code(500).send({ error: 'Sync failed' })
  }
}

export const syncOrdersController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const count = await syncOrdersService()
    return reply.code(200).send({ count, success: true })
  } catch (error) {
    return reply.code(500).send({ error: 'Sync failed' })
  }
}