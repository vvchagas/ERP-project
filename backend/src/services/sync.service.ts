import { prisma } from '../lib/prisma'
import { nuvemshopAPI } from '../api/nuvemShopApi'
import { productSchema, orderSchema } from '../schemas/syncSchemas'

export const syncProductsService = async (): Promise<number> => {
  const products = (await nuvemshopAPI.getProducts()) ?? []
  let synced = 0

  for (const rawProduct of products) {
    try {
      const validated = productSchema.parse(rawProduct)

      await prisma.product.upsert({
        where: { nuvemshopId: validated.id },
        update: {
          name: validated.name,
          price: validated.price,
          stock: validated.quantity
        },
        create: {
          nuvemshopId: validated.id,
          name: validated.name,
          price: validated.price,
          stock: validated.quantity
        }
      })
      
      synced++
    } catch (error) {
      console.error(`Falha ao sincronizar produto:`, error)
    }
  }

  return synced
}

export const syncOrdersService = async (): Promise<number> => {
  const orders = (await nuvemshopAPI.getOrders()) ?? []
  let synced = 0

  for (const rawOrder of orders) {
    try {
      const validated = orderSchema.parse(rawOrder)

      await prisma.order.upsert({
        where: { nuvemshopId: validated.id },
        update: {
          status: validated.status
        },
        create: {
          nuvemshopId: validated.id,
          customerId: validated.customerId,
          total: validated.total,
          status: validated.status
        }
      })
      
      synced++
    } catch (error) {
      console.error(`Falha ao sincronizar pedido:`, error)
    }
  }

  return synced
}