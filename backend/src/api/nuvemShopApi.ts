export class nuvemshopAPI {
  static baseURL = 'https://api.nuvemshop.com.br/v1'

  // Esperado: NUVEMSHOP_TOKEN=seu_token (sem "Bearer ")
  static token = process.env.NUVEMSHOP_TOKEN

  private static authHeaders() {
    if (!nuvemshopAPI.token) {
      throw new Error('NUVEMSHOP_TOKEN não configurado no backend')
    }

    // Nuvemshop costuma aceitar Authorization: Bearer {token}.
    // Seu projeto atual usa header "Authentication" — mantemos compatibilidade.
    const bearer = `Bearer ${nuvemshopAPI.token}`

    return {
      'Content-Type': 'application/json',
      Authorization: bearer,
      Authentication: bearer,
    }
  }

  getProducts = async (): Promise<any[]> => {
    const response = await fetch(`${nuvemshopAPI.baseURL}/products`, {
      method: 'GET',
      headers: nuvemshopAPI.authHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`)
    }

    const data: unknown = await response.json()
    return (Array.isArray(data) ? data : []) as any[]
  }

  getOrders = async (): Promise<any[]> => {
    const response = await fetch(`${nuvemshopAPI.baseURL}/orders`, {
      method: 'GET',
      headers: nuvemshopAPI.authHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.status}`)
    }

    const data: unknown = await response.json()
    return (Array.isArray(data) ? data : []) as any[]
  }

  // Criação real de produto na Nuvemshop
  createProduct = async (input: {
    name: string
    price: number
    stock: number
    sku?: string
    // storeId é opcional no seu schema atual; mantemos como um campo externo.
    storeId?: string
  }): Promise<any> => {
    const body: Record<string, unknown> = {
      // Campos comuns do catálogo na Nuvemshop (ajuste se seu layout exigir campos adicionais)
      name: input.name,
      price: input.price,
      sku: input.sku,
    }

    // Muitos endpoints esperam estoque por variation/variant.
    // Como o seu projeto atual sincroniza por "quantity" via GET /products,
    // mapeamos stock para "quantity".
    body.quantity = input.stock

    const response = await fetch(`${nuvemshopAPI.baseURL}/products`, {
      method: 'POST',
      headers: nuvemshopAPI.authHeaders(),
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errText = await response.text().catch(() => '')
      throw new Error(`Failed to create product: ${response.status} ${errText}`)
    }

    return await response.json()
  }
}


