<script setup lang="ts">
import { getItemImageURL, getItemsByRarity } from "@/api/items";
import BuildPath from "@/components/BuildPath.vue";
import EndScreen from "@/components/EndScreen.vue";
import ItemList from "@/components/ItemList.vue";
import Modal from "@/components/Modal.vue";
import StatusBar from "@/components/StatusBar.vue";
import { useBuildPathStore } from "@/stores/buildPath";
import { useItemStore } from "@/stores/items";
import type { Item } from "@/types/ItemType";
import { Icon } from "@iconify/vue";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const buildPathStore = useBuildPathStore();
const itemStore = useItemStore();
const { basicItems, epicItems } = storeToRefs(itemStore);

const { statusBar, gameState } = storeToRefs(buildPathStore);
const { validateItem, resetGame, newGame } = buildPathStore;

onMounted(() => {
  if (gameState.value.buildPath === null) {
    newGame();
  }
});
</script>

<template>
  <div class="flex flex-col h-full justify-between">
    <header class="flex items-center">
      <button class="cursor-pointer" type="button" @click="resetGame()">
        <span
          class="flex items-center gap-1 text-zinc-500 hover:text-zinc-200 border border-transparent hover:border-zinc-200 rounded"
        >
          <Icon icon="ic:baseline-close" class="w-6 h-6" />
        </span>
      </button>
      <StatusBar class="px-4" v-if="statusBar" :steps="statusBar" />
      <button class="cursor-pointer" type="button">
        <span class="flex items-center gap-1 text-rose-600">
          <Icon icon="ic:baseline-favorite" class="w-6 h-6" />
          <p class="font-bold text-lg">{{ gameState.remainingAttempts }}</p>
        </span>
      </button>
    </header>
    <main
      class="flex flex-col-reverse md:flex-row justify-between items-center py-6"
    >
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
    <footer class="flex justify-between">
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
  </div>
  <Modal
    v-if="
      (gameState.drawnItem && gameState.status === 'win') ||
      gameState.status === 'lose'
    "
  >
    <EndScreen />
  </Modal>
</template>
