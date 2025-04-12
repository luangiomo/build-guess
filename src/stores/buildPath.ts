import { getItemsByRarity } from "@/api/items";
import type { BuildPathType } from "@/types/BuildPathType";
import type { GameState } from "@/types/GameStateType";
import { createBuildPath } from "@/utils/createBuildPath";
import { getRandomNumber } from "@/utils/getRandomNumber";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useBuildPathStore = defineStore("buildPath", () => {
  const buildPath = ref<BuildPathType | undefined>(undefined);

  const statusBar = computed(() => {
    return buildPath.value?.from.flatMap((child) => [
      child.status,
      ...child.from.map((grandChild) => grandChild.status),
    ]);
  });

  const gameState = ref<GameState>({
    buildPath: buildPath.value,
    remainingAttempts: 5,
    status: "standby",
  });

  async function drawItem() {
    const legendaryItems = await getItemsByRarity("legendary");
    const randomIndex = getRandomNumber(legendaryItems.length);
    const item = legendaryItems[randomIndex];
    gameState.value.buildPath = await createBuildPath(item);
  }

  function addItem(id: string, position: number) {
    if (!buildPath.value) return;
    buildPath.value.from.forEach((child) => {
      if (child.position === position) {
        child.selectedId = id;
        child.status = "pending";
        return;
      }
      child.from.forEach((grandChild) => {
        if (grandChild.position === position) {
          grandChild.selectedId = id;
          grandChild.status = "pending";
          return;
        }
      });
    });
  }

  function switchItem(
    from: { id: string; position: number },
    to: { id: string; position: number }
  ) {
    if (!buildPath.value) return;
    buildPath.value.from.forEach((child) => {
      if (child.position === from.position) {
        child.selectedId = to.id;
        child.status = child.selectedId.length > 0 ? "pending" : "empty";
      }
      child.from.forEach((grandChild) => {
        if (grandChild.position === from.position) {
          grandChild.selectedId = to.id;
          grandChild.status =
            grandChild.selectedId.length > 0 ? "pending" : "empty";
        }
      });
      if (child.position === to.position) {
        child.selectedId = from.id;
        child.status = child.selectedId.length > 0 ? "pending" : "empty";
      }
      child.from.forEach((grandChild) => {
        if (grandChild.position === to.position) {
          grandChild.selectedId = from.id;
          grandChild.status =
            grandChild.selectedId.length > 0 ? "pending" : "empty";
        }
      });
    });
  }

  function deleteItem(position: number) {
    if (!buildPath.value) return;
    buildPath.value.from.forEach((child) => {
      if (child.position === position) {
        child.selectedId = "";
        child.status = "empty";
        return;
      }
      child.from.forEach((grandChild) => {
        if (grandChild.position === position) {
          grandChild.selectedId = "";
          grandChild.status = "empty";
          return;
        }
      });
    });
  }

  function validateItem() {
    if (!buildPath.value) return;
    buildPath.value.from.forEach((child) => {
      if (child.selectedId.length > 0) {
        child.id === child.selectedId
          ? (child.status = "valid")
          : (child.status = "invalid");
      }
      child.from.forEach((grandChild) => {
        if (grandChild.selectedId.length > 0) {
          grandChild.id === grandChild.selectedId
            ? (grandChild.status = "valid")
            : (grandChild.status = "invalid");
        }
      });
    });
  }

  return {
    buildPath,
    statusBar,
    gameState,
    drawItem,
    addItem,
    switchItem,
    deleteItem,
    validateItem,
  };
});
