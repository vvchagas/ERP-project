import { prisma } from '@/lib/prisma'
import { nuvemshopAPI } from '/api/nuvemShopApi'
import { productSchema, orderSchema } from '@/schemas/syncSchemas'

export const syncProductsService = async (): Promise<number> => {
  const products = await nuvemshopAPI.getProducts()
  
  let synced = 0
  for (const product of products) {
    const validated = productSchema.parse(product)
    
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
  }
  
  return synced
}

export const syncOrdersService = async (): Promise<number> => {
  const orders = await nuvemshopAPI.getOrders()
  
  let synced = 0
  for (const order of orders) {
    const validated = orderSchema.parse(order)
    
    await prisma.order.upsert({
      where: { nuvemshopId: validated.id },
      update: { status: validated.status },
      create: {
        nuvemshopId: validated.id,
        customerId: validated.customerId,
        total: validated.total,
        status: validated.status
      }
    })
    synced++
  }
  
  return synced
}