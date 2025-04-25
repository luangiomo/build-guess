<script setup lang="ts">
import { ref, useTemplateRef, type DialogHTMLAttributes } from "vue";

const dialogRef = useTemplateRef<HTMLDialogElement | null>("my-dialog");

const closeModal = () => {
  dialogRef.value?.close();
  document.body.style.overflow = "";
};
</script>

<template>
  <dialog
    ref="my-dialog"
    class="bg-gray-800/60 absolute top-0 w-screen h-screen z-50 flex justify-center items-center"
    open
  >
    <slot />
  </dialog>
</template>
