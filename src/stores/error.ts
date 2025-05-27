import { defineStore } from "pinia";
import { ref } from "vue";

export const useErrorStore = defineStore("error", () => {
  const error = ref<string>();

  function setError(newError: string) {
    error.value = newError;
  }

  return {
    error,
    setError,
  };
});
