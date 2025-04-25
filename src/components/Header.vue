<script setup lang="ts">
import IconBuildGuess from "@/components/IconBuildGuess.vue";
import { useBuildPathStore } from "@/stores/buildPath";
import { storeToRefs } from "pinia";

const buildPathStore = useBuildPathStore();
const { gameState } = storeToRefs(buildPathStore);
const { resetGame } = buildPathStore;
</script>

<template>
  <header class="w-full border-b border-zinc-800">
    <div class="mx-auto max-w-5xl h-14 flex items-center gap-6 px-6">
      <div
        class="h-full cursor-pointer flex items-center"
        @click="() => resetGame()"
      >
        <IconBuildGuess class="w-fit h-6 fill-blue-600" />
      </div>
      <span class="text-white">{{ gameState.status }}</span>
      <span class="text-white">{{ gameState.drawnItem?.id }}</span>
      <span class="text-white">{{ gameState.drawnItem?.name }}</span>
      <span class="text-white">{{ gameState.remainingAttempts }}</span>
    </div>
  </header>
</template>
