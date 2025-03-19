import { getItemsByRarity } from "@/api/items";
import type { Item } from "@/types/ItemType";
import { getRandomNumber } from "@/utils/getRandomNumber";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useItemStore = defineStore("item", () => {
  const selectedItem = ref<Item | undefined>(undefined);

  async function drawItem() {
    const legendaryItems = await getItemsByRarity("legendary");
    const randomIndex = getRandomNumber(legendaryItems.length);
    const item = legendaryItems[randomIndex];
    selectedItem.value = item;
  }

  return { selectedItem, drawItem };
});
