import { prisma } from '../lib/prisma'
import { nuvemshopAPI } from '../api/nuvemShopApi'
import { productSchema, orderSchema } from '../schemas/syncSchemas'

const toSafeNumber = (value: unknown): number => {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim() !== '') {
    const n = Number(value)
    if (Number.isFinite(n)) return n
  }
  throw new Error(`Invalid number: ${String(value)}`)
}

export const syncProductsService = async (): Promise<number> => {
  const products = (await nuvemshopAPI.getProducts()) ?? []

  const validatedProducts = [] as Array<ReturnType<typeof productSchema.parse>>
  for (const product of products) {
    // Normalize potential API inconsistencies (e.g. numeric fields as strings)
    const normalized = {
      ...product,
      id: toSafeNumber((product as any)?.id),
      price: toSafeNumber((product as any)?.price),
      quantity: toSafeNumber((product as any)?.quantity)
    }

    validatedProducts.push(productSchema.parse(normalized))
  }

  // Upsert sequentially (safer for DB load). Can be optimized later with batching.
  let synced = 0
  for (const validated of validatedProducts) {
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
  const orders = (await nuvemshopAPI.getOrders()) ?? []

  const validatedOrders = [] as Array<ReturnType<typeof orderSchema.parse>>
  for (const order of orders) {
    const normalized = {
      ...order,
      id: toSafeNumber((order as any)?.id),
      customerId: toSafeNumber((order as any)?.customerId),
      total: toSafeNumber((order as any)?.total)
    }

    validatedOrders.push(orderSchema.parse(normalized))
  }

  let synced = 0
  for (const validated of validatedOrders) {
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
  }

  return synced
}