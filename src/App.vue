<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBuildPathStore } from "./stores/buildPath";

const buildPathStore = useBuildPathStore();
const { gameState } = storeToRefs(buildPathStore);
</script>
<template>
  <div class="h-screen bg-zinc-950 overflow-auto">
    <header class="h-14 border-b border-zinc-800 flex gap-6">
      <span class="text-white">{{ gameState.status }}</span>
      <span class="text-white">{{ gameState.drawnItem?.id }}</span>
      <span class="text-white">{{ gameState.drawnItem?.name }}</span>
      <span class="text-white">{{ gameState.remainingAttempts }}</span>
    </header>
    <main class="max-w-5xl pt-8 mx-auto px-6">
      <RouterView />
    </main>
  </div>
</template>
