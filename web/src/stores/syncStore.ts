import { defineStore } from 'pinia'
import { ref } from 'vue'
import { syncOrders, syncProducts, type SyncResponse } from '@/api/syncApi'

export const useSyncStore = defineStore('sync', () => {
  const loading = ref(false)
  const status = ref<{ type: 'success' | 'error'; message: string } | null>(null)
  const lastSync = ref<{ products: string; orders: string }>({ products: '', orders: '' })

  async function run(fn: () => Promise<SyncResponse>, kind: 'products' | 'orders') {
    loading.value = true
    status.value = null

    try {
      const data = await fn()
      status.value = {
        type: 'success',
        message: `${data.count} ${kind === 'products' ? 'produtos' : 'pedidos'} sincronizados`,
      }
      lastSync.value[kind] = new Date().toLocaleString()
    } catch {
      status.value = { type: 'error', message: 'Erro na sincronização' }
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    status,
    lastSync,
    syncProducts: () => run(syncProducts, 'products'),
    syncOrders: () => run(syncOrders, 'orders'),
  }
})

