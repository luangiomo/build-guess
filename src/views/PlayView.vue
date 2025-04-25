<script setup lang="ts">
import { getItemImageURL, getItemsByRarity } from "@/api/items";
import BuildPath from "@/components/BuildPath.vue";
import EndScreen from "@/components/EndScreen.vue";
import ItemList from "@/components/ItemList.vue";
import ProgressBar from "@/components/StatusBar.vue";
import { useBuildPathStore } from "@/stores/buildPath";
import type { Item } from "@/types/ItemType";
import { Icon } from "@iconify/vue";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const basicItems = ref<Item[]>();
const epicItems = ref<Item[]>();

const buildPathStore = useBuildPathStore();
const { statusBar, gameState } = storeToRefs(buildPathStore);
const { validateItem, resetGame } = buildPathStore;

onMounted(async () => {
  basicItems.value = await getItemsByRarity("basic");
  epicItems.value = await getItemsByRarity("epic");
});
</script>

<template>
  <header class="flex items-center pb-8">
    <button class="py-3 pr-6 cursor-pointer" type="button" @click="resetGame()">
      <span
        class="flex items-center gap-1 text-zinc-500 hover:text-zinc-200 border border-transparent hover:border-zinc-200 rounded"
      >
        <Icon icon="ic:baseline-close" class="w-6 h-6" />
      </span>
    </button>
    <ProgressBar v-if="statusBar" :steps="statusBar" />
    <button class="py-3 pl-6">
      <span class="flex items-center gap-1 text-rose-600">
        <Icon icon="ic:baseline-favorite" class="w-6 h-6" />
        <p class="font-bold text-lg">{{ gameState.remainingAttempts }}</p>
      </span>
    </button>
  </header>
  <main class="flex justify-between items-center">
    <div class="flex flex-col gap-6">
      <ItemList v-if="basicItems" :items="basicItems" />
      <ItemList v-if="epicItems" :items="epicItems" />
    </div>
    <div
      class="flex flex-col justify-center items-center"
      v-if="gameState.drawnItem"
    >
      <div
        class="w-fit h-fit cursor-pointer border-2 border-zinc-500 bg-zinc-950 p-1.5"
      >
        <div class="border border-zinc-950 overflow-hidden">
          <img
            draggable="false"
            :src="getItemImageURL(gameState.drawnItem)"
            loading="lazy"
            role="presentation"
            @contextmenu.prevent
            class="select-none h-20 w-20 border border-zinc-950 rotate-90 saturate-0 blur-xs overflow-hidden"
          />
        </div>
      </div>
      <BuildPath :item="gameState.drawnItem" :just-to-show="false" />
    </div>
  </main>
  <footer class="pt-8 flex justify-between">
    <button
      type="button"
      class="w-fit px-6 py-3 rounded-full border border-zinc-500 font-semibold text-zinc-500 cursor-pointer hover:bg-zinc-500 hover:text-white"
      @click="resetGame()"
    >
      Desistir
    </button>
    <button
      type="button"
      class="w-fit px-6 py-3 rounded-full bg-blue-700 font-semibold text-white cursor-pointer hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed"
      :disabled="
        statusBar?.every((status) => status === 'empty') ||
        gameState.remainingAttempts === 0
      "
      @click="validateItem()"
    >
      Verificar receita
    </button>
  </footer>
  <EndScreen v-if="gameState.drawnItem" />
</template>
