import { defineStore } from "pinia";
import { ref } from "vue";
import { useBuildPathStore } from "./buildPath";

export const useDndStore = defineStore("dnd", () => {
  const { addItem, switchItem } = useBuildPathStore();
  const isDraggin = ref(false);

  function onDragStart(
    event: DragEvent,
    sender: { id: string; position: number | null }
  ) {
    if (event.dataTransfer) {
      isDraggin.value = true;
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("sender", JSON.stringify(sender));
    }
  }

  function onDrop(
    event: DragEvent,
    receiver: { id: string; position: number }
  ) {
    if (event.dataTransfer) {
      const sender: { id: string; position: number | null } = JSON.parse(
        event.dataTransfer.getData("sender")
      );
      if (!sender.position || event.altKey) {
        addItem(sender.id, receiver.position);
        isDraggin.value = false;
        return;
      }

      switchItem(
        {
          id: sender.id,
          position: sender.position,
        },
        {
          id: receiver.id,
          position: receiver.position,
        }
      );
      isDraggin.value = false;
    }
  }

  function onDragEnd(event: DragEvent) {
    if (event.dataTransfer) {
      isDraggin.value = false;
      event.dataTransfer.clearData("sender");
    }
  }

  return { isDraggin, onDragStart, onDragEnd, onDrop };
});
