<template>
  <div class="min-h-screen bg-slate-50">
    <header class="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-200">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center">
            E
          </div>
          <div>
            <h1 class="text-lg font-bold text-slate-900">Tech Flow</h1>
            <p class="text-xs text-slate-600">E-commerce ERP</p>
          </div>
        </div>

        <nav class="hidden sm:flex items-center gap-2 text-sm text-slate-700">
          <router-link to="/home" class="px-3 py-2 rounded-lg hover:bg-slate-100">Loja</router-link>
          <router-link to="/sync" class="px-3 py-2 rounded-lg hover:bg-slate-100">Sincronização</router-link>
        </nav>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-4 py-10">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section class="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 class="text-2xl font-extrabold text-slate-900">Feito para vender, pensado para sincronizar</h2>
          <p class="mt-3 text-slate-700 leading-relaxed">
            Um frontend moderno (sem exageros) com estilo de mercado para catálogo e rotas de sincronização.
            O backend sincroniza produtos e pedidos via Nuvemshop.
          </p>

          <div class="mt-6 flex flex-wrap gap-2">
            <span class="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm border border-blue-100">Vue 3</span>
            <span class="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm border border-blue-100">Pinia</span>
            <span class="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm border border-blue-100">Tailwind</span>
            <span class="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm border border-blue-100">Fastify</span>
          </div>
        </section>

        <section class="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-6">
          <h3 class="text-lg font-bold text-slate-900">Próximo passo</h3>
          <p class="mt-2 text-slate-700 leading-relaxed">
            Futuramente dá para integrar carrinho real, checkout e painel admin.
            Por enquanto, o foco é catálogo e sincronização com visual premium.
          </p>

          <div class="mt-6">
            <router-link
              to="/sync"
              class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Ir para Sincronização
              <span aria-hidden="true">→</span>
            </router-link>
          </div>
        </section>
      </div>

      <section class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-white border border-slate-200 rounded-2xl p-5">
          <div class="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">✓</div>
          <h4 class="mt-3 font-bold text-slate-900">UI limpa</h4>
          <p class="mt-1 text-sm text-slate-700">Layout padrão, moderno e legível.</p>
        </div>
        <div class="bg-white border border-slate-200 rounded-2xl p-5">
          <div class="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">⟳</div>
          <h4 class="mt-3 font-bold text-slate-900">Sync confiável</h4>
          <p class="mt-1 text-sm text-slate-700">Tratamento de dados numéricos e erros.</p>
        </div>
        <div class="bg-white border border-slate-200 rounded-2xl p-5">
          <div class="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">⚡</div>
          <h4 class="mt-3 font-bold text-slate-900">Rápido</h4>
          <p class="mt-1 text-sm text-slate-700">Componentes leves e responsivos.</p>
        </div>
      </section>
    </main>

    <footer class="border-t border-slate-200">
      <div class="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between gap-4">
        <p class="text-sm text-slate-600">© {{ new Date().getFullYear() }} Tech Flow. Todos os direitos reservados.</p>
        <p class="text-sm text-slate-600">ERP Project</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// no-op
</script>

