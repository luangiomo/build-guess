<script setup lang="ts">
import { getItemImageURL, getItemsByRarity } from "@/api/items";
import { getRandomNumber } from "@/utils/getRandomNumber";
import type { Item } from "@/types/ItemType";
import { computed, ref, watchEffect } from "vue";
import BuildPath from "./BuildPath.vue";

const legendaryItems = await getItemsByRarity("legendary");
const carouselItems = ref<Item[]>(getInitialCarouselItems());

function getInitialCarouselItems(): Item[] {
  const carouselItems: Item[] = [];
  for (let index = 0; index < 5; index++) {
    carouselItems.push(getRandomLegendaryItemId());
  }
  return carouselItems;
}

function getRandomLegendaryItemId() {
  const randomNumber = getRandomNumber(legendaryItems.length);
  return legendaryItems[randomNumber];
}

const middleItem = computed(() => {
  const middleIndex = Math.trunc(carouselItems.value.length / 2);
  return carouselItems.value[middleIndex];
});

watchEffect(() => {
  const interval = setInterval(() => {
    carouselItems.value.push(getRandomLegendaryItemId());
    carouselItems.value.shift();
  }, 1500);
  return () => clearInterval(interval);
});
</script>

<template>
  <div class="flex flex-col items-center w-[592px]">
    <ul class="w-fit flex gap-2 relative">
      <li
        class="cursor-pointer border border-zinc-500 bg-zinc-950 p-1"
        v-for="item in carouselItems"
      >
        <img
          draggable="false"
          :src="getItemImageURL(item)"
          :alt="item.name"
          :key="item.id"
          class="select-none h-14 w-14 border border-zinc-950"
        />
      </li>
      <li
        class="absolute z-10 cursor-pointer border-4 border-zinc-950 bg-linear-to-t from-blue-400 to-blue-700 p-1.5 left-1/2 top-1/2 -translate-1/2"
      >
        <img
          draggable="false"
          :src="getItemImageURL(middleItem)"
          :alt="middleItem.name"
          class="select-none h-20 w-20 border border-zinc-950"
        />
      </li>
    </ul>
    <BuildPath :item="middleItem" :just-to-show="true" />
  </div>
</template>
