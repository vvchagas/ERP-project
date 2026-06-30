export class NuvemshopAPI {
  private baseURL = 'https://api.nuvemshop.com.br/v1'
  private token = process.env.NUVEMSHOP_TOKEN

  private authHeaders() {
    if (!this.token) {
      throw new Error('NUVEMSHOP_TOKEN não configurado no backend')
    }

    const bearer = `Bearer ${this.token}`

    return {
      'Content-Type': 'application/json',
      Authorization: bearer,
      Authentication: bearer,
    }
  }

  getProducts = async (): Promise<any[]> => {
    const response = await fetch(`${this.baseURL}/products`, {
      method: 'GET',
      headers: this.authHeaders(), // Usando 'this' em vez do nome da classe
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`)
    }

    const data: unknown = await response.json()
    return (Array.isArray(data) ? data : []) as any[]
  }

  getOrders = async (): Promise<any[]> => {
    const response = await fetch(`${this.baseURL}/orders`, {
      method: 'GET',
      headers: this.authHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.status}`)
    }

    const data: unknown = await response.json()
    return (Array.isArray(data) ? data : []) as any[]
  }

  createProduct = async (input: {
    name: string
    price: number
    stock: number
    sku?: string
    storeId?: string
  }): Promise<any> => {
    const body: Record<string, unknown> = {
      name: input.name,
      price: input.price,
      sku: input.sku,
      quantity: input.stock // Mapeamento
    }

    const response = await fetch(`${this.baseURL}/products`, {
      method: 'POST',
      headers: this.authHeaders(),
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errText = await response.text().catch(() => '')
      throw new Error(`Failed to create product: ${response.status} ${errText}`)
    }

    return await response.json()
  }
}

export const nuvemshopAPI = new NuvemshopAPI()