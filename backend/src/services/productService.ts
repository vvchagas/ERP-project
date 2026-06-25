import { prisma } from '../lib/prisma'
import { nuvemshopAPI } from '../api/nuvemShopApi'

export type CreateProductInput = {
  name: string
  price: number
  stock: number
  sku?: string
  // opcional: pode ser usado como referência externa; NÃO é necessário para criar na Nuvemshop.
  storeId?: string
}

export type CreateProductResult = {
  nuvemshopId: number
}

const toSafeNumber = (value: unknown): number => {
  const n = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(n)) throw new Error(`Invalid number: ${String(value)}`)
  return n
}

export async function createProductService(input: CreateProductInput): Promise<CreateProductResult> {
  const { name, price, stock, sku } = input

  // 1) Cria produto na Nuvemshop
  const api = new nuvemshopAPI()
  const created = await api.createProduct({ name, price, stock, sku })

  // 2) Extrai id real retornado pela Nuvemshop
  const nuvemshopIdRaw = (created as any)?.id
  const nuvemshopId = nuvemshopIdRaw === undefined ? toSafeNumber((created as any)?.product?.id) : toSafeNumber(nuvemshopIdRaw)

  // 3) Persiste no banco local (cache/controle)
  await prisma.product.upsert({
    where: { nuvemshopId },
    update: {
      name,
      price,
      stock,
    },
    create: {
      nuvemshopId,
      name,
      price,
      stock,
    },
  })

  return { nuvemshopId }
}


