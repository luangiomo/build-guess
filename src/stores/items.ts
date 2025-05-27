import { getItemsByRarity } from "@/api/items";
import type { Item } from "@/types/ItemType";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useItemStore = defineStore("item", () => {
  const basicItems = ref<Item[]>();
  const epicItems = ref<Item[]>();
  const legendaryItems = ref<Item[]>();

  async function loadItems() {
    basicItems.value = await getItemsByRarity("basic");
    epicItems.value = await getItemsByRarity("epic");
    legendaryItems.value = await getItemsByRarity("legendary");
  }

  return {
    basicItems,
    epicItems,
    legendaryItems,
    loadItems,
  };
});
