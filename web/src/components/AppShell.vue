<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50/60 via-white to-white">
    <header class="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-200">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center">T</div>
          <div>
            <h1 class="text-lg md:text-xl font-bold text-slate-900">Tech Flow</h1>
            <p class="text-xs text-slate-600">E-commerce ERP</p>
          </div>
        </div>

        <nav class="hidden md:flex items-center gap-2 text-sm text-slate-700">
          <router-link to="/" class="px-3 py-2 rounded-lg hover:bg-slate-100">Loja</router-link>
          <router-link to="/sync" class="px-3 py-2 rounded-lg hover:bg-slate-100">Sincronização</router-link>
          <router-link to="/about" class="px-3 py-2 rounded-lg hover:bg-slate-100">Sobre</router-link>
        </nav>

        <slot name="header-right" />
      </div>
    </header>

    <slot />

    <footer class="border-t border-slate-200">
      <div class="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between gap-4">
        <p class="text-sm text-slate-600">© {{ new Date().getFullYear() }} Tech Flow</p>
        <div class="text-sm text-slate-600">Frontend • Vue + Tailwind</div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// no-op
</script>

