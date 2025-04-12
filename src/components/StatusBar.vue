<script setup lang="ts">
import type { BuildNode } from "@/types/BuildPathType";

defineProps<{
  steps: BuildNode["status"][] | undefined;
}>();

function getStepClassesByItemStatus(status: BuildNode["status"]) {
  return {
    "bg-zinc-600": status === "empty",
    "bg-white": status === "pending",
    "bg-rose-600": status === "invalid",
    "bg-green-600": status === "valid",
  };
}
</script>

<template>
  <div class="w-full flex gap-2">
    <div
      v-for="(step, index) in steps"
      :key="index"
      class="w-full h-2 rounded-full transition-all duration-300"
      :class="getStepClassesByItemStatus(step)"
    />
  </div>
</template>
