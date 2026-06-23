import {syncProductsService, syncOrdersService} from '../services/sync.service'
export class nuvemshopAPI {
  static baseURL = "https://api.nuvemshop.com.br/v1";

  // Esperado: NUVEMSHOP_TOKEN=/BearerToken
  static token = process.env.NUVEMSHOP_TOKEN;

  getProducts = async (): Promise<any[]> => {
    const response = await fetch(`${nuvemshopAPI.baseURL}/products`, {
      headers: {
        "Content-Type": "application/json",
        Authentication: `Bearer ${nuvemshopAPI.token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`)
    }

    const data: unknown = await response.json()
    return (Array.isArray(data) ? data : []) as any[]
  };

  getOrders = async (): Promise<any[]> => {
    const response = await fetch(`${nuvemshopAPI.baseURL}/orders`, {
      headers: {
        "Content-Type": "application/json",
        Authentication: `Bearer ${nuvemshopAPI.token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.status}`)
    }

    const data: unknown = await response.json()
    return (Array.isArray(data) ? data : []) as any[]
  };
}

