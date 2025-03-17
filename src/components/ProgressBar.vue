<script setup lang="ts">
import type { BuildNode } from "@/types/BuildPathType";

defineProps<{
  steps: BuildNode["status"][] | undefined;
}>();

const getStepClasses = (status: BuildNode["status"]) => {
  return {
    "bg-gray-600": status === "empty",
    "bg-white": status === "pending",
    "bg-green-600": status === "valid",
    "bg-red-600": status === "invalid",
  };
};
</script>

<template>
  <div class="w-full flex gap-2">
    <div
      v-for="(step, index) in steps"
      :key="index"
      class="w-full h-2 rounded-full transition-all duration-300"
      :class="getStepClasses(step)"
    ></div>
  </div>
</template>
