import { FastifyInstance } from 'fastify'
import { syncProductsController, syncOrdersController } from '../controllers/SyncController'

export const syncRoutes = async (app: FastifyInstance) => {
  app.post('/sync/products', syncProductsController)
  app.post('/sync/orders', syncOrdersController)
}