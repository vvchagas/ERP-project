<template>
  <div class="sync-container">
    <h1>Sincronização Nuvemshop</h1>
    
    <div class="sync-controls">
      <button @click="syncProducts" :disabled="loading">
        {{ loading ? 'Sincronizando...' : 'Sincronizar Produtos' }}
      </button>
      <button @click="syncOrders" :disabled="loading">
        {{ loading ? 'Sincronizando...' : 'Sincronizar Pedidos' }}
      </button>
    </div>

    <div v-if="status" :class="`status ${status.type}`">
      {{ status.message }}
    </div>

    <div class="sync-log">
      <h3>Último Sincronismo</h3>
      <p>Produtos: {{ lastSync.products }}</p>
      <p>Pedidos: {{ lastSync.orders }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSyncStore } from '@/stores/syncStore'

const syncStore = useSyncStore()
const loading = ref(false)
const status = ref<{ type: string; message: string } | null>(null)
const lastSync = ref({ products: '', orders: '' })

const syncProducts = async () => {
  loading.value = true
  try {
    const response = await fetch('/api/sync/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json()
    status.value = { type: 'success', message: `${data.count} produtos sincronizados` }
    lastSync.value.products = new Date().toLocaleString()
  } catch (error) {
    status.value = { type: 'error', message: 'Erro na sincronização' }
  } finally {
    loading.value = false
  }
}

const syncOrders = async () => {
  loading.value = true
  try {
    const response = await fetch('/api/sync/orders', { method: 'POST' })
    const data = await response.json()
    status.value = { type: 'success', message: `${data.count} pedidos sincronizados` }
    lastSync.value.orders = new Date().toLocaleString()
  } catch (error) {
    status.value = { type: 'error', message: 'Erro na sincronização' }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.sync-container { padding: 2rem; max-width: 600px; margin: 0 auto; }
.sync-controls { display: flex; gap: 1rem; margin: 1rem 0; }
button { padding: 0.75rem 1.5rem; cursor: pointer; border: none; border-radius: 4px; background: #3b82f6; color: white; }
button:disabled { opacity: 0.5; cursor: not-allowed; }
.status { padding: 1rem; border-radius: 4px; margin: 1rem 0; }
.status.success { background: #d1fae5; color: #065f46; }
.status.error { background: #fee2e2; color: #7f1d1d; }
</style>