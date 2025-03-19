<script setup lang="ts">
import { getItemImageURLById } from "@/api/items";
import { useBuildPathStore } from "@/stores/buildPath";
import { useDndStore } from "@/stores/dnd";
import type { BuildNode } from "@/types/BuildPathType";
import type { Item } from "@/types/ItemType";
import { createBuildPath } from "@/utils/createBuildPath";
import { storeToRefs } from "pinia";
import { onMounted, watch } from "vue";

const { item, justToShow } = defineProps<{
  item: Item;
  justToShow: boolean;
}>();

const dndStore = useDndStore();
const { onDragStart, onDragEnd, onDrop } = dndStore;
const { isDragging } = storeToRefs(dndStore);

const buildPathStore = useBuildPathStore();
const { deleteItem } = buildPathStore;
const { buildPath } = storeToRefs(buildPathStore);

onMounted(async () => {
  buildPath.value = await createBuildPath(item);
});

watch(
  () => item,
  async (newValue) => {
    const newItem = await createBuildPath(newValue);
    buildPath.value = newItem;
  }
);

function getBorderClassesByItemStatus(status: BuildNode["status"]) {
  return {
    "border-zinc-600": status === "empty",
    "border-white": status === "pending",
    "border-rose-600": status === "invalid",
    "border-green-600": status === "valid",
  };
}
</script>
<template>
  <div
    @contextmenu.prevent
    class="flex flex-col items-center mt-1.5 select-none min-h-60"
    :class="{
      'before:absolute before:w-[592px] before:h-60 before:bg-linear-to-t before:from-zinc-950 before:to-zinc-950/0':
        justToShow,
    }"
  >
    <section class="w-full flex flex-col items-center px-22">
      <span class="w-0.5 h-16 bg-zinc-500" />
      <span class="w-full h-0.5 bg-zinc-500" />
    </section>
    <div class="flex justify-between gap-8">
      <section
        v-if="buildPath"
        v-for="{ id, selectedId, position, status, from } in buildPath.from"
        class="w-full flex flex-col items-center min-w-44"
      >
        <div class="w-0.5 h-4 bg-zinc-500" />
        <div
          @dragenter.prevent
          @dragover.prevent
          @dragend="onDragEnd($event)"
          @drop="
            status !== 'valid' &&
              onDrop($event, { id: selectedId, position: position })
          "
          class="w-16 h-16 border-2 cursor-pointer"
          :class="[
            getBorderClassesByItemStatus(status),
            {
              'border-blue-600!': isDragging && status != 'valid',
            },
          ]"
        >
          <div
            v-if="id"
            class="text-white w-full h-full bg-zinc-900 flex items-center justify-center select-none"
          >
            <img
              v-if="justToShow"
              draggable="false"
              :src="getItemImageURLById(id)"
              loading="lazy"
              role="presentation"
              class="select-none"
            />
            <img
              v-else-if="selectedId"
              @contextmenu.prevent="status !== 'valid' && deleteItem(position)"
              :draggable="status !== 'valid' ? true : false"
              @dragstart="
                onDragStart($event, { id: selectedId, position: position })
              "
              :src="getItemImageURLById(selectedId)"
              loading="lazy"
              role="presentation"
              class="cursor-grab active:cursor-grabbing"
            />
            <img
              v-else
              draggable="false"
              src="/src/assets/unknow-item.png"
              role="presentation"
              class="select-none"
            />
          </div>
        </div>
        <div v-if="from.length">
          <section class="w-full flex flex-col items-center px-6">
            <span class="w-0.5 h-7 bg-zinc-500" />
            <span class="h-0.5 w-full bg-zinc-500" />
          </section>
          <div class="flex justify-between gap-4">
            <section
              v-for="{ id, selectedId, position, status } in from"
              class="w-full flex flex-col items-center"
            >
              <div class="w-0.5 h-4 bg-zinc-500" />
              <div
                @dragenter.prevent
                @dragover.prevent
                @drop="
                  status !== 'valid' &&
                    onDrop($event, { id: selectedId, position: position })
                "
                @dragend="onDragEnd($event)"
                class="w-12 h-12 border-2"
                :class="[
                  getBorderClassesByItemStatus(status),
                  {
                    'border-blue-600!': isDragging && status != 'valid',
                  },
                ]"
              >
                <div
                  v-if="id"
                  class="text-white w-full h-full bg-zinc-900 flex items-center justify-center select-none"
                >
                  <img
                    v-if="justToShow"
                    draggable="false"
                    :src="getItemImageURLById(id)"
                    loading="lazy"
                    role="presentation"
                    class="select-none"
                  />
                  <img
                    v-else-if="selectedId"
                    :draggable="status !== 'valid' ? true : false"
                    @contextmenu.prevent="
                      status !== 'valid' && deleteItem(position)
                    "
                    @dragstart="
                      onDragStart($event, {
                        id: selectedId,
                        position: position,
                      })
                    "
                    :src="getItemImageURLById(selectedId)"
                    loading="lazy"
                    role="presentation"
                    class="cursor-grab active:cursor-grabbing"
                  />
                  <img
                    v-else
                    draggable="false"
                    src="/src/assets/unknow-item.png"
                    role="presentation"
                    class="select-none"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
