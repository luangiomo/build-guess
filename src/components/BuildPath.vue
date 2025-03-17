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
const { isDraggin } = storeToRefs(dndStore);

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

function getClassByBuildPathStatus(status: BuildNode["status"]): string {
  switch (status) {
    case "empty":
      return "border-zinc-600";
    case "pending":
      return "border-white";
    case "invalid":
      return "border-rose-600";
    case "valid":
      return "border-green-600";
    default:
      return "border-zinc-600";
  }
}
</script>
<template>
  <div
    class="flex flex-col items-center mt-1.5 select-none min-h-60"
    @contextmenu.prevent
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
        class="w-full flex flex-col items-center min-w-44"
        v-for="{ id, selectedId, position, status, from } in buildPath.from"
      >
        <div class="w-0.5 h-4 bg-zinc-500" />
        <div
          class="w-16 h-16 border-2"
          :class="[
            getClassByBuildPathStatus(status),
            {
              'border-blue-600!': isDraggin && status != 'valid',
            },
          ]"
          @drop="
            status !== 'valid' &&
              onDrop($event, { id: selectedId, position: position })
          "
          @dragend="onDragEnd($event)"
          @dragenter.prevent
          @dragover.prevent
        >
          <div
            v-if="id"
            class="text-white w-full h-full bg-zinc-900 flex items-center justify-center select-none"
          >
            <img
              v-if="justToShow"
              draggable="false"
              class="select-none"
              :src="getItemImageURLById(id)"
              :alt="id"
            />
            <img
              v-else-if="selectedId"
              class="cursor-grab active:cursor-grabbing"
              :draggable="status !== 'valid' ? true : false"
              @contextmenu.prevent="status !== 'valid' && deleteItem(position)"
              :src="getItemImageURLById(selectedId)"
              :alt="selectedId"
              @dragstart="
                onDragStart($event, { id: selectedId, position: position })
              "
            />
            <img
              v-else
              draggable="false"
              class="select-none"
              src="/src/assets/unknow-item.png"
              alt="unknown item"
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
              class="w-full flex flex-col items-center"
              v-for="{ id, selectedId, position, status } in from"
            >
              <div class="w-0.5 h-4 bg-zinc-500" />
              <div
                class="w-12 h-12 border-2"
                :class="[
                  getClassByBuildPathStatus(status),
                  {
                    'border-blue-600!': isDraggin && status != 'valid',
                  },
                ]"
                @drop="
                  status !== 'valid' &&
                    onDrop($event, { id: selectedId, position: position })
                "
                @dragend="onDragEnd($event)"
                @dragenter.prevent
                @dragover.prevent
              >
                <div
                  v-if="id"
                  class="text-white w-full h-full bg-zinc-900 flex items-center justify-center select-none"
                >
                  <img
                    v-if="justToShow"
                    draggable="false"
                    class="select-none"
                    :src="getItemImageURLById(id)"
                    :alt="id"
                  />
                  <img
                    v-else-if="selectedId"
                    class="cursor-grab active:cursor-grabbing"
                    :draggable="status !== 'valid' ? true : false"
                    @contextmenu.prevent="
                      status !== 'valid' && deleteItem(position)
                    "
                    :src="getItemImageURLById(selectedId)"
                    :alt="selectedId"
                    @dragstart="
                      onDragStart($event, {
                        id: selectedId,
                        position: position,
                      })
                    "
                  />
                  <img
                    v-else
                    draggable="false"
                    class="select-none"
                    src="/src/assets/unknow-item.png"
                    alt="unknown item"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  </div>
  <!-- <pre class="text-white">{{ buildPath }}</pre> -->
</template>
