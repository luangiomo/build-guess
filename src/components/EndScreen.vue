<script setup lang="ts">
import { getItemImageURL } from "@/api/items";
import BuildPath from "@/components/BuildPath.vue";
import { useBuildPathStore } from "@/stores/buildPath";
import { storeToRefs } from "pinia";

const buildPathStore = useBuildPathStore();
const { gameState } = storeToRefs(buildPathStore);
const { newGame, resetGame } = buildPathStore;
</script>

<template>
  <article
    class="border border-zinc-500 rounded-lg w-fit"
    v-if="
      gameState.drawnItem &&
      (gameState.status === 'win' || gameState.status === 'lose')
    "
  >
    <header class="flex gap-4 p-6">
      <div
        class="w-fit h-fit cursor-pointer border-2 bg-zinc-950 p-1.5"
        :class="{
          'border-green-600': gameState.status === 'win',
          'border-rose-600': gameState.status === 'lose',
        }"
      >
        <img
          draggable="false"
          :src="getItemImageURL(gameState.drawnItem)"
          loading="lazy"
          role="presentation"
          @contextmenu.prevent
          class="select-none h-14 w-14 border border-zinc-950 overflow-hidden"
        />
      </div>
      <span class="text-center lg:text-start">
        <h1
          class="text-2xl sm:text-4xl tracking-tighter font-semibold leading-tight"
          :class="{
            'text-green-600': gameState.status === 'win',
            'text-rose-600': gameState.status === 'lose',
          }"
        >
          {{ gameState.status === "win" ? "Vitória" : "Derrota" }}
        </h1>
        <p class="text-xs sm:text-lg text-zinc-400 font-medium">
          O seu item {{ gameState.status === "win" ? "é" : "era" }}
          <strong class="text-white">{{
            `"${gameState.drawnItem.name}"`
          }}</strong>
        </p>
      </span>
    </header>
    <main class="border-y border-zinc-500 p-6">
      <div class="flex flex-col justify-center items-center">
        <div class="w-[592px] flex justify-center">
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
                class="select-none h-20 w-20 border border-zinc-950 overflow-hidden"
              />
            </div>
          </div>
        </div>
        <BuildPath :item="gameState.drawnItem" :just-to-show="true" />
      </div>
    </main>
    <footer class="p-6 flex justify-between">
      <button
        type="button"
        class="w-fit px-6 py-3 rounded-full border border-zinc-500 font-semibold text-zinc-500 cursor-pointer hover:bg-zinc-500 hover:text-white"
        @click="() => resetGame()"
      >
        Sair
      </button>
      <button
        type="button"
        class="w-fit px-6 py-3 rounded-full bg-blue-700 font-semibold text-white cursor-pointer hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed"
        @click="() => newGame()"
      >
        Jogar Novamente
      </button>
    </footer>
  </article>
  <p class="" v-else>Item não encontrado</p>
</template>
