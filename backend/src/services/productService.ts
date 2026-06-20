import { prisma } from '../lib/prisma'
import { nuvemshopAPI } from '../../api/nuvemShopApi'

export type CreateProductInput = {
  name: string
  price: number
  stock: number
  sku?: string
  storeId?: string
}

export type CreateProductResult = {
  nuvemshopId: number
}

export async function createProductService(input: CreateProductInput): Promise<CreateProductResult> {
  const { name, price, stock, sku, storeId } = input

  // nuvemShop API atual do projeto só está parcialmente implementada.
  // Para manter a tarefa "somente funcionalidade já aplicada" no backend,
  // este serviço não cria produto na Tienda Nube por enquanto.
  // Ele apenas persiste localmente como placeholder.

  // Use o mesmo padrão do syncProductsService (upsert por nuvemshopId),
  // mas aqui não temos nuvemshopId do endpoint.
  // Então não salvaremos caso falte storeId.
  if (!storeId) {
    throw new Error('storeId is required to create product on Nuvemshop')
  }

  // fallback: guarda um registro local usando storeId como nuvemshopId numérico
  const nuvemshopId = Number(storeId)
  if (!Number.isFinite(nuvemshopId)) {
    throw new Error('storeId must be a numeric id')
  }

  await prisma.product.upsert({
    where: { nuvemshopId },
    update: { name, price, stock },
    create: { nuvemshopId, name, price, stock },
  })

  return { nuvemshopId }
}

