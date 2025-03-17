<script setup lang="ts">
import { getItemImageURL } from "@/api/items";
import type { Item } from "@/types/ItemType";
defineProps<{ item: Item }>();
</script>

<template>
  <img
    :src="getItemImageURL(item)"
    :alt="item.name"
    class="border border-zinc-950 w-10 h-10 cursor-grab rounded-lg hover:border-white"
  />
</template>
