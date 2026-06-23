<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50/60 via-white to-white">
    <header class="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-200">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center">T</div>
          <div>
            <h1 class="text-lg md:text-xl font-bold text-slate-900">Sincronização</h1>
            <p class="text-xs text-slate-600">Nuvemshop • Produtos e Pedidos</p>
          </div>
        </div>

        <nav class="hidden md:flex items-center gap-2 text-sm text-slate-700">
          <router-link to="/home" class="px-3 py-2 rounded-lg hover:bg-slate-100">Loja</router-link>
          <router-link to="/sync" class="px-3 py-2 rounded-lg hover:bg-slate-100">Sincronização</router-link>
          <router-link to="/about" class="px-3 py-2 rounded-lg hover:bg-slate-100">Sobre</router-link>
        </nav>

        <div class="sm:hidden px-3 py-2 rounded-xl bg-slate-100 text-slate-800 text-sm">ERP Sync</div>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-4 py-10">
      <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <div class="bg-white/90 border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 class="text-2xl font-extrabold text-slate-900">Executar Sync</h2>
            <p class="text-slate-700 mt-1">Clique para sincronizar dados do seu marketplace para o ERP.</p>

            <div class="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                class="px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                @click="syncProducts"
                :disabled="loading"
              >
                {{ loading ? 'Sincronizando...' : 'Sincronizar Produtos' }}
              </button>

              <button
                class="px-5 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                @click="syncOrders"
                :disabled="loading"
              >
                {{ loading ? 'Sincronizando...' : 'Sincronizar Pedidos' }}
              </button>
            </div>

            <div v-if="status" class="mt-5 p-4 rounded-xl border" :class="status.type === 'success' ? 'bg-green-50 border-green-200 text-green-900' : 'bg-red-50 border-red-200 text-red-900'">
              {{ status.message }}
            </div>
          </div>

          <div class="mt-6 bg-white/90 border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 class="text-lg font-bold text-slate-900">Resumo do Sync</h3>
            <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div class="text-xs font-medium text-slate-600">Último Sync de Produtos</div>
                <div class="mt-2 text-sm font-semibold text-slate-900">{{ lastSync.products || '—' }}</div>
              </div>
              <div class="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div class="text-xs font-medium text-slate-600">Último Sync de Pedidos</div>
                <div class="mt-2 text-sm font-semibold text-slate-900">{{ lastSync.orders || '—' }}</div>
              </div>
            </div>
          </div>
        </div>

        <aside class="bg-white/90 border border-slate-200 rounded-2xl p-6 shadow-sm h-fit">
          <h3 class="text-lg font-bold text-slate-900">Boas práticas</h3>
          <ul class="mt-3 space-y-3 text-sm text-slate-700">
            <li class="flex gap-3">
              <span class="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center font-bold">1</span>
              <span>Configure corretamente o token da Nuvemshop no backend.</span>
            </li>
            <li class="flex gap-3">
              <span class="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center font-bold">2</span>
              <span>Sincronize produtos antes de pedidos para consistência.</span>
            </li>
            <li class="flex gap-3">
              <span class="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center font-bold">3</span>
              <span>Evite sincronizar em excesso; use com agendamento no futuro.</span>
            </li>
          </ul>

          <div class="mt-6 text-xs text-slate-500 leading-relaxed">
            Este painel é apenas demonstrativo (sem carrinho/checkout). O objetivo é manter o visual premium e a integração funcional.
          </div>
        </aside>
      </section>
    </main>

    <footer class="border-t border-slate-200">
      <div class="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between gap-4">
        <p class="text-sm text-slate-600">© {{ new Date().getFullYear() }} Tech Flow</p>
        <div class="text-sm text-slate-600">Fastify + Prisma</div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useSyncStore } from '@/stores/syncStore'

const syncStore = useSyncStore()

const loading = syncStore.loading
const status = syncStore.status
const lastSync = syncStore.lastSync

const syncProducts = () => syncStore.syncProducts()
const syncOrders = () => syncStore.syncOrders()
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