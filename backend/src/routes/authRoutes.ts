import { FastifyInstance } from 'fastify'

import { loginController, meController } from './../controllers/authController'
import { requireAuth } from './../middleware/requireAuth'

export const authRoutes = async (app: FastifyInstance) => {
  app.post('/auth/login', loginController)
  app.get('/auth/me', { preHandler: [requireAuth] }, meController)
}

