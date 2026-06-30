import 'dotenv/config'
import fastify from 'fastify'

import { syncRoutes } from './routes/syncRoutes'
import { authRoutes } from './routes/authRoutes'
import { productRoutes } from './routes/productRoutes'

const app = fastify({ logger: false })

app.get('/health', async () => {
  return { status: 'ERP Backend Online' }
})

app.register(syncRoutes, { prefix: '/api' })
app.register(authRoutes, { prefix: '/api' })
app.register(productRoutes, { prefix: '/api' })


app.listen({ port: 3333 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`🚀 ERP Server rodando em ${address}`)
})

