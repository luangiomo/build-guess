<script setup lang="ts"></script>

<template>
  <div class="h-screen bg-zinc-950 overflow-auto">
    <header class="h-14 border-b border-zinc-800"></header>
    <main class="max-w-5xl pt-8 mx-auto px-6">
      <Suspense>
        <RouterView />
        <template #fallback>
          <p>Loading...</p>
        </template>
      </Suspense>
    </main>
  </div>
</template>
