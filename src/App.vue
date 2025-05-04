<script setup lang="ts">
import Header from "./components/Header.vue";
</script>

<template>
  <div class="h-screen bg-zinc-950 overflow-auto">
    <Header />
    <main class="h-[calc(100vh-57px)] max-w-5xl mx-auto p-4 sm:py-8 sm:px-6">
      <RouterView />
    </main>
  </div>
</template>
