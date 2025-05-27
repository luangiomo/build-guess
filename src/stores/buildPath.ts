import router from "@/router";
import type { GameState } from "@/types/GameStateType";
import { createBuildPath } from "@/utils/createBuildPath";
import { drawItem } from "@/utils/drawItem";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed } from "vue";

export const useBuildPathStore = defineStore("buildPath", () => {
  const defaultAttemps: number = 5;

  const gameState = useStorage<GameState>("gameState", {
    drawnItem: null,
    buildPath: null,
    remainingAttempts: defaultAttemps,
    status: "standby",
  });

  const statusBar = computed(() => {
    return gameState.value.buildPath?.from.flatMap((child) => [
      child.status,
      ...child.from.map((grandChild) => grandChild.status),
    ]);
  });

  async function newGame() {
    const item = await drawItem();
    gameState.value = {
      drawnItem: item,
      buildPath: await createBuildPath(item),
      remainingAttempts: defaultAttemps,
      status: "playing",
    };
    router.push("/play");
  }

  function resetGame() {
    gameState.value = {
      drawnItem: null,
      buildPath: null,
      remainingAttempts: defaultAttemps,
      status: "standby",
    };
    router.push("/");
  }

  function addItem(id: string, position: number) {
    if (!gameState.value.buildPath) return;
    gameState.value.buildPath.from.forEach((child) => {
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
    if (!gameState.value.buildPath) return;
    gameState.value.buildPath.from.forEach((child) => {
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
    if (!gameState.value.buildPath) return;
    gameState.value.buildPath.from.forEach((child) => {
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
    if (!gameState.value.buildPath) return;

    gameState.value.buildPath.from.forEach((child) => {
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

    gameState.value.remainingAttempts--;

    if (statusBar.value) {
      if (statusBar.value.every((status) => status === "valid")) {
        gameState.value.status = "win";
        return;
      }
      if (gameState.value.remainingAttempts > 0) return;
      gameState.value.status = "lose";
    }
  }

  return {
    statusBar,
    gameState,
    newGame,
    resetGame,
    addItem,
    switchItem,
    deleteItem,
    validateItem,
  };
});
