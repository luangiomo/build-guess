<script setup lang="ts">
import { getItemImageURL, getItemsByRarity } from "@/api/items";
import { getRandomNumber } from "@/utils/getRandomNumber";
import type { Item } from "@/types/ItemType";
import { computed, onMounted, ref, watchEffect } from "vue";
import BuildPath from "./BuildPath.vue";

const legendaryItems = ref<Item[]>([]);
const carouselItems = ref<Item[]>([]);

onMounted(async () => {
  legendaryItems.value = await getItemsByRarity("legendary");
  carouselItems.value = getInitialCarouselItems();
});

function getInitialCarouselItems(): Item[] {
  const carouselItems: Item[] = [];
  for (let index = 0; index < 5; index++) {
    carouselItems.push(getRandomLegendaryItem());
  }
  return carouselItems;
}

function getRandomLegendaryItem(): Item {
  const randomNumber = getRandomNumber(legendaryItems.value.length);
  return legendaryItems.value[randomNumber];
}

const middleItem = computed(() => {
  const middleIndex = Math.trunc(carouselItems.value.length / 2);
  return carouselItems.value[middleIndex];
});

watchEffect(() => {
  const interval = setInterval(() => {
    carouselItems.value.shift();
    carouselItems.value.push(getRandomLegendaryItem());
  }, 1500);
  return () => clearInterval(interval);
});
</script>

<template>
  <div class="flex flex-col items-center w-[592px]">
    <ul class="w-fit flex gap-2 relative">
      <li
        v-if="carouselItems"
        v-for="item in carouselItems"
        class="cursor-pointer border border-zinc-500 bg-zinc-950 p-1"
      >
        <img
          draggable="false"
          @contextmenu.prevent
          :src="getItemImageURL(item)"
          loading="lazy"
          role="presentation"
          :key="item.id"
          class="select-none h-14 w-14 border border-zinc-950"
        />
      </li>
      <li
        class="absolute z-10 cursor-pointer border-4 border-zinc-950 bg-linear-to-t from-blue-400 to-blue-700 p-1.5 left-1/2 top-1/2 -translate-1/2 shadow-lg shadow-blue-400/50"
      >
        <img
          v-if="middleItem"
          draggable="false"
          @contextmenu.prevent
          :src="getItemImageURL(middleItem)"
          loading="lazy"
          role="presentation"
          class="select-none h-20 w-20 border border-zinc-950"
        />
      </li>
    </ul>
    <BuildPath v-if="middleItem" :item="middleItem" :just-to-show="true" />
  </div>
</template>
