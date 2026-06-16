<script setup lang="ts">
interface Product {
  id: string;
  name: string;
  price: number;
  stockLevel: number;
}

defineProps<{ product: Product }>();

// const editProduct = () => {
//   console.log("Abrindo modal de edição...");
// };
</script>

<template>
  <div class="min-h-screen ">
    <h1 class="text-4xl font-bold text-center text-blue-900 py-8">Tech Flow</h1>
    <p class="text-center text-gray-600">This is the main application page.</p>
  </div>

  <!-- <div
    class="p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
  >
    <h2 class="text-xl font-bold text-gray-800">{{ product.name }}</h2>
    <p class="text-sm text-gray-500 mt-2">Estoque: {{ product.stockLevel }}</p>

    <div class="mt-4 flex items-center justify-between">
      <span class="text-lg font-semibold text-blue-600">R$ {{ product.price }}</span>
      <button
        @click="editProduct"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Editar
      </button>
    </div>
  </div> -->
</template>

<style scoped>

  template{
    background:url('/web/public/background.png') no-repeat center center fixed;
    background-size: cover;
  }
</style>
