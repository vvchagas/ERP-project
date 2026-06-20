import { FastifyInstance } from 'fastify'
import { createProductController } from '../controllers/productController'
import { requireAuth } from '../middleware/requireAuth'

export const productRoutes = async (app: FastifyInstance) => {
  app.post('/products', { preHandler: [requireAuth] }, createProductController)
}


