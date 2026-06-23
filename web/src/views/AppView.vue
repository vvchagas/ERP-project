<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSyncStore } from '@/stores/syncStore'



type Category = 'celulares' | 'notebooks' | 'tablets' | 'acessorios'
type Product = {
  id: string
  name: string
  price: number
  stockLevel: number
  category: Category
}

const syncStore = useSyncStore()


const products = ref<Product[]>([
  { id: '1', name: 'Smartphone Galaxy S24', price: 2799.0, stockLevel: 8, category: 'celulares' },
  { id: '2', name: 'iPhone 15 128GB', price: 6299.0, stockLevel: 5, category: 'celulares' },
  { id: '3', name: 'Notebook Gamer RTX 4050', price: 4999.0, stockLevel: 3, category: 'notebooks' },
  { id: '4', name: 'Notebook Ultrabook 14”', price: 3699.0, stockLevel: 6, category: 'notebooks' },
  { id: '5', name: 'Tablet Android 10"', price: 1299.0, stockLevel: 12, category: 'tablets' },
  { id: '6', name: 'Fone Bluetooth TWS', price: 149.9, stockLevel: 25, category: 'acessorios' },
  { id: '7', name: 'Capa + Película', price: 39.9, stockLevel: 40, category: 'acessorios' },
])

const categories: { key: Category | 'tudo'; label: string }[] = [
  { key: 'tudo', label: 'Tudo' },
  { key: 'celulares', label: 'Celulares' },
  { key: 'notebooks', label: 'Notebooks' },
  { key: 'tablets', label: 'Tablets' },
  { key: 'acessorios', label: 'Acessórios' },
]

const activeCategory = ref<Category | 'tudo'>('tudo')
const query = ref('')

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()

  return products.value.filter((p) => {
    const matchesCategory = activeCategory.value === 'tudo' ? true : p.category === activeCategory.value
    const matchesQuery = q.length === 0 ? true : p.name.toLowerCase().includes(q)
    return matchesCategory && matchesQuery
  })
})

const cartCount = computed(() => products.value.length)

async function syncNow() {
  // funcionalidade já existente no backend: sync de produtos
  await syncStore.syncProducts()
}

function addToCart() {
  // placeholder de UX (não há carrinho ainda)
}
</script>

<template>
  <AppShell>

    <template #header-right>
      <div class="flex items-center gap-3">
        <button
          class="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors font-semibold"
          @click="syncNow"
          :disabled="syncStore.loading"
        >
          {{ syncStore.loading ? 'Sincronizando...' : 'Sincronizar Produtos' }}
        </button>

        <div class="hidden sm:block px-3 py-2 rounded-xl bg-slate-100 text-slate-800">
          Carrinho: <span class="font-semibold">{{ cartCount }}</span>
        </div>
      </div>
    </template>

    <main class="max-w-6xl mx-auto px-4 py-8">
      <section class="mb-6">

        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900">Catálogo</h2>
            <p class="text-slate-700 mt-1">Filtre por categoria e busque por nome.</p>
          </div>

          <div class="flex items-center gap-3">
            <input
              v-model="query"
              class="w-full md:w-72 px-4 py-2 rounded-xl border border-slate-200 bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Buscar (ex: notebook, celular...)"
            />
          </div>
        </div>

        <div class="mt-4 flex flex-wrap gap-2">
          <button
            v-for="c in categories"
            :key="c.key"
            class="px-3 py-2 rounded-xl border transition-colors font-medium"
            :class="
              activeCategory === c.key
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white/80 text-slate-800 border-slate-200 hover:bg-white'
            "
            @click="activeCategory = c.key"
          >
            {{ c.label }}
          </button>
        </div>

        <div
          v-if="syncStore.status"
          class="mt-4 p-4 rounded-xl border"
          :class="
            syncStore.status.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-900'
              : 'bg-red-50 border-red-200 text-red-900'
          "
        >
          {{ syncStore.status.message }}
        </div>
      </section>

      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="p in filtered"
          :key="p.id"
          class="p-6 bg-white/90 backdrop-blur border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="flex items-start justify-between gap-3">
            <h3 class="text-base md:text-lg font-bold text-slate-900 line-clamp-2">{{ p.name }}</h3>
            <span class="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 whitespace-nowrap">{{ p.category }}</span>
          </div>

          <p class="text-sm text-slate-600 mt-2">
            Estoque: <span class="font-semibold text-slate-900">{{ p.stockLevel }}</span>
          </p>

          <div class="mt-5 flex items-center justify-between gap-3">
            <span class="text-lg font-semibold text-blue-700">R$ {{ p.price }}</span>
            <button
              class="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="p.stockLevel <= 0"
              @click="addToCart"
            >
              {{ p.stockLevel <= 0 ? 'Indisponível' : 'Adicionar' }}
            </button>
          </div>
        </article>
      </section>

      <div v-if="filtered.length === 0" class="mt-10 text-center text-slate-700 bg-white/70 border border-slate-200 rounded-2xl py-10">
        Nenhum produto encontrado para os filtros atuais.
      </div>
    </main>

    <footer class="border-t border-slate-200">
      <div class="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between gap-4">
        <p class="text-sm text-slate-600">© {{ new Date().getFullYear() }} Tech Flow</p>
        <div class="text-sm text-slate-600">Frontend • Vue + Tailwind</div>
      </div>
    </footer>
  </AppShell>
</template>

<style scoped>
</style>

