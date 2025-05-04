<script setup lang="ts">
import { useBuildPathStore } from "@/stores/buildPath";
import Carousel from "./Carousel.vue";

const buildPathStore = useBuildPathStore();
const { newGame } = buildPathStore;
</script>

<template>
  <section
    class="relative flex flex-col items-center gap-10 lg:flex-row w-full justify-end pt-8 overflow-hidden"
  >
    <div
      class="z-10 sm:h-78 items-center lg:absolute order-2 sm:-translate-y-20 bottom-0 lg:translate-y-0 lg:left-0 flex flex-col gap-12 sm:justify-between lg:items-start"
    >
      <span class="text-center lg:text-start">
        <h1
          class="text-4xl sm:text-5xl text-white tracking-tighter font-semibold leading-tight"
        >
          Adivinhe o item <br />
          de League of Legends
        </h1>
        <p class="text-base sm:text-lg text-zinc-400 font-medium mt-2 sm:mt-4">
          Arraste e solte os itens nos
          <strong class="text-white">slots</strong> disponíveis <br />
          para <strong class="text-white">preencher</strong> a receita!
        </p>
      </span>
      <button
        type="button"
        class="w-fit px-6 py-3 rounded-full bg-blue-700 font-semibold text-white cursor-pointer hover:bg-blue-500"
        @click="() => newGame()"
      >
        Começar a jogar!
      </button>
    </div>
    <Carousel />
  </section>
</template>
