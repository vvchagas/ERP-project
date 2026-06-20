export type SyncResponse = {
  count: number
  success: boolean
}

const API_BASE = '/api'

export async function syncProducts(): Promise<SyncResponse> {
  const res = await fetch(`${API_BASE}/sync/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    throw new Error('Failed to sync products')
  }

  return (await res.json()) as SyncResponse
}

export async function syncOrders(): Promise<SyncResponse> {
  const res = await fetch(`${API_BASE}/sync/orders`, {
    method: 'POST',
  })

  if (!res.ok) {
    throw new Error('Failed to sync orders')
  }

  return (await res.json()) as SyncResponse
}

