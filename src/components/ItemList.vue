<script setup lang="ts">
import { getItemImageURL } from "@/api/items";
import { useDndStore } from "@/stores/dnd";
import type { Item } from "@/types/ItemType";
const { items } = defineProps<{
  items: Item[];
}>();
const { onDragStart, onDragEnd } = useDndStore();
</script>
<template>
  <ul class="grid grid-cols-6 gap-1.5 select-none">
    <li
      v-for="item in items"
      class="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-800 hover:border-white select-none"
    >
      <img
        :src="getItemImageURL(item)"
        :alt="item.name"
        :key="item.id"
        class="w-10 h-10 cursor-grab active:cursor-grabbing"
        draggable="true"
        @dragstart="onDragStart($event, { id: item.id, position: null })"
        @dragend="onDragEnd($event)"
      />
    </li>
  </ul>
</template>
