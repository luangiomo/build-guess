<script setup lang="ts">
import IconBuildGuess from "@/components/IconBuildGuess.vue";
import { useBuildPathStore } from "@/stores/buildPath";

const buildPathStore = useBuildPathStore();
const { resetGame } = buildPathStore;
</script>

<template>
  <header class="w-full border-b border-zinc-800">
    <div class="mx-auto max-w-5xl h-14 flex items-center gap-6 px-4 sm:px-6">
      <div
        class="h-full cursor-pointer flex items-center"
        @click="() => resetGame()"
      >
        <IconBuildGuess class="w-fit h-5 sm:h-6 fill-blue-600" />
      </div>
    </div>
  </header>
</template>
