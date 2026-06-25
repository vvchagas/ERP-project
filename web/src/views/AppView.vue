<script setup lang="ts">
import { computed, ref } from 'vue'

type Category = 'celulares' | 'notebooks' | 'tablets' | 'acessorios'

type Product = {
  id: string
  name: string
  price: number
  stockLevel: number
  category: Category
}

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

// UX placeholder (carrinho persistente será ligado no próximo passo)
const cartCount = computed(() => products.value.length)

function addToCart() {
  // placeholder de UX (não há carrinho ainda)
}
</script>


<template class="body">
  <div class="min-h-screen bg-gradient-to-b from-blue-50/60 via-white to-white text-slate-900">
    <!-- Header (sem abas / só elementos essenciais) -->
    <header class="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-200">
      <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-10 h-10 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center shrink-0">T</div>
          <div class="min-w-0">
            <h1 class="text-lg md:text-xl font-bold text-slate-900 leading-tight">Tech Flow</h1>
            <p class="text-xs text-slate-600">Loja • Nuvemshop</p>
          </div>
        </div>

        <nav class="hidden lg:flex items-center gap-2 text-sm text-slate-700">
          <a href="#catalog" class="px-3 py-2 rounded-lg hover:bg-slate-100">Catálogo</a>
          <a href="#filters" class="px-3 py-2 rounded-lg hover:bg-slate-100">Filtros</a>
          <a href="#footer" class="px-3 py-2 rounded-lg hover:bg-slate-100">Contato</a>
        </nav>

        <div class="flex items-center gap-2">
          <div class="hidden sm:block">
            <label class="sr-only" for="search">Buscar</label>
            <input
              id="search"
              v-model="query"
              class="w-[18rem] lg:w-[22rem] px-4 py-2 rounded-xl border border-slate-200 bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Buscar (ex: notebook, celular...)"
            />
          </div>

          <button class="p-2 rounded-xl hover:bg-slate-100" aria-label="Conta">
              <span class="material-symbols-outlined text-lg">person</span>          </button>
          <button class="p-2 rounded-xl hover:bg-slate-100 relative" aria-label="Carrinho">
            <span class="material-symbols-outlined text-lg">shopping_cart</span>
            <span class="absolute -top-1 -right-1 text-[10px] bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center">{{ cartCount }}</span>
          </button>
        </div>
      </div>

      <!-- Mobile search -->
      <div class="lg:hidden px-4 pb-3">
        <input
          v-model="query"
          class="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Buscar (ex: notebook, celular...)"
        />
      </div>
    </header>

    <!-- Promo banner -->
    <div class="bg-red-600 text-white">
      <div class="max-w-6xl mx-auto px-4 py-2 flex items-center justify-center text-sm font-semibold">
        <span>Frete grátis acima de R$ 299 — condições no checkout</span>
      </div>
    </div>

    <!-- Hero -->
    <section class="max-w-6xl mx-auto px-4 pt-6 pb-4">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div class="md:col-span-7">
          <p class="inline-flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-3 py-1">
            <span class="material-symbols-outlined">rocket</span>
            Integração com Nuvemshop
          </p>
          <h2 class="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
            Catálogo rápido, checkout e estoque sincronizados
          </h2>
          <p class="mt-3 text-slate-700">
            Estrutura premium, sem abas, pronta para lista de produtos e criação na Nuvemshop.
          </p>
          <div class="mt-5 flex flex-col sm:flex-row gap-3">
            <a href="#catalog" class="px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors font-semibold text-center">Ver produtos</a>
            <a href="#footer" class="px-5 py-3 rounded-xl bg-white/90 border border-slate-200 hover:bg-white transition-colors font-semibold text-center">Falar com suporte</a>
          </div>
        </div>

       
      </div>
    </section>

    <!-- Content -->
    <main id="catalog" class="max-w-6xl mx-auto px-4 pb-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside id="filters" class="lg:col-span-3">
          <section class="bg-white/90 border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 class="text-lg font-extrabold text-slate-900">Filtros</h2>
            <p class="text-sm text-slate-600 mt-1">Categoria e busca por nome.</p>

            <div class="mt-5">
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="c in categories"
                  :key="c.key"
                  class="px-3 py-2 rounded-xl border transition-colors font-medium text-sm"
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
            </div>

            <div class="mt-6">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-slate-700">Ordenar</span>
                <span class="text-xs text-slate-500">(placeholder UX)</span>
              </div>
              <div class="mt-3 h-10 rounded-xl bg-slate-50 border border-slate-200"></div>
            </div>
          </section>

          <section class="mt-6 bg-white/90 border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 class="text-md font-bold text-slate-900">Destaques</h3>
            <ul class="mt-3 space-y-2 text-sm text-slate-700">
              <li class="flex gap-2 items-start"><span class="material-symbols-outlined text-green-600">check</span><span>Stock sincronizado</span></li>
              <li class="flex gap-2 items-start"><span class="material-symbols-outlined">lock</span><span>Checkout com múltiplos pagamentos</span></li>
              <li class="flex gap-2 items-start"><span class="material-symbols-outlined">mobile_3</span><span>Catálogo responsivo</span></li>
            </ul>
          </section>
        </aside>

        <section class="lg:col-span-9">
          <div class="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900">Catálogo</h2>
              <p class="text-slate-700 mt-1">Grid responsivo: 1–4 colunas.</p>
            </div>
          </div>

          <section class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6" aria-label="Lista de produtos">
            <article
              v-for="p in filtered"
              :key="p.id"
              class="p-5 bg-white/90 backdrop-blur border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div class="flex items-start justify-between gap-3">
                <h3 class="text-base md:text-lg font-bold text-slate-900 line-clamp-2">{{ p.name }}</h3>
                <span class="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 whitespace-nowrap">{{ p.category }}</span>
              </div>

              <div class="mt-3">
                <p class="text-sm text-slate-600">
                  Estoque: <span class="font-semibold text-slate-900">{{ p.stockLevel }}</span>
                </p>
              </div>

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
        </section>
      </div>
    </main>

    <!-- Footer sem abas -->
    <footer id="footer" class="border-t border-slate-200">
      <div class="max-w-6xl mx-auto px-4 py-10">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div class="md:col-span-5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center">T</div>
              <div>
                <div class="font-bold text-slate-900">Tech Flow</div>
                <div class="text-sm text-slate-600">E-commerce integrado à Nuvemshop</div>
              </div>
            </div>
            <p class="mt-4 text-sm text-slate-600 max-w-md">
              Estrutura semântica: header, banner, hero, aside, main e footer. Responsivo para todos os dispositivos.
            </p>
          </div>

          <div class="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <div class="font-semibold text-slate-900">Links</div>
              <ul class="mt-3 space-y-2 text-sm text-slate-600">
                <li><a href="#catalog" class="hover:text-slate-900">Catálogo</a></li>
                <li><a href="#filters" class="hover:text-slate-900">Filtros</a></li>
                <li><a href="#footer" class="hover:text-slate-900">Suporte</a></li>
              </ul>
            </div>
            <div>
              <div class="font-semibold text-slate-900">Social</div>
              <ul class="mt-3 space-y-2 text-sm text-slate-600">
                <li><font-awesome-icon icon="Instagram"/><a href="https://www.instagram.com/" class="hover:text-slate-900">Instagram</a></li>
                <li><font-awesome-icon icon="Tiktok"/><a href="https://www.tiktok.com/" class="hover:text-slate-900">TikTok</a></li>
              </ul>
            </div>
            <div class="sm:col-span-1 col-span-1">
              <div class="font-semibold text-slate-900">Newsletter</div>
              <p class="mt-3 text-sm text-slate-600">Receba promoções e novidades.</p>
              <form class="mt-3 flex gap-2" @submit.prevent>
                <input
                  class="flex-1 px-4 py-2 rounded-xl border border-slate-200 bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Seu e-mail"
                />
                <button class="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-semibold">OK</button>
              </form>
            </div>
          </div>
        </div>

        <div class="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-600 border-t border-slate-200 pt-6">
          <p>© {{ new Date().getFullYear() }} Tech Flow</p>
          <p>Vue 3 + Tailwind</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.body{
  transition: transform 0.3s ease-in-out, opacity 0.3s ease;}
</style>