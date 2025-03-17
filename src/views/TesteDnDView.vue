<script setup>
import { ref, onMounted } from "vue";

const version = ref("13.1.1"); // Versão mais recente do Data Dragon
const champions = ref([]);
const draggedChampion = ref(null);
const dragOverChampion = ref(null);

// Busca a lista de campeões da API do Data Dragon
const fetchChampions = async () => {
  try {
    const response = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${version.value}/data/pt_BR/champion.json`
    );
    const data = await response.json();
    champions.value = Object.values(data.data); // Converte o objeto em uma array
  } catch (error) {
    console.error("Erro ao buscar campeões:", error);
  }
};

// Manipula o início do arrasto
const handleDragStart = (event, champion) => {
  draggedChampion.value = champion;
  event.dataTransfer.setData("text/plain", champion.id);
};

// Manipula o arrasto sobre um item
const handleDragOver = (event, champion) => {
  event.preventDefault();
  if (draggedChampion.value && draggedChampion.value.id !== champion.id) {
    dragOverChampion.value = champion;
  }
};

// Manipula a entrada do cursor em um item
const handleDragEnter = (event, champion) => {
  if (draggedChampion.value && draggedChampion.value.id !== champion.id) {
    dragOverChampion.value = champion;
  }
};

// Manipula a saída do cursor de um item
const handleDragLeave = () => {
  dragOverChampion.value = null;
};

// Manipula o soltar do item
const handleDrop = (event, targetChampion) => {
  event.preventDefault();
  const draggedChampionId = event.dataTransfer.getData("text/plain");
  const draggedChampion = champions.value.find(
    (champ) => champ.id === draggedChampionId
  );
  const targetIndex = champions.value.indexOf(targetChampion);
  const draggedIndex = champions.value.indexOf(draggedChampion);

  // Reordena os campeões
  champions.value.splice(draggedIndex, 1);
  champions.value.splice(targetIndex, 0, draggedChampion);

  // Reseta os estados
  draggedChampion.value = null;
  dragOverChampion.value = null;
};

// Busca os campeões ao montar o componente
onMounted(() => {
  fetchChampions();
});
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-center my-6">
      Campeões do League of Legends
    </h1>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
    >
      <div
        v-for="champion in champions"
        :key="champion.id"
        :draggable="true"
        @dragstart="handleDragStart($event, champion)"
        @dragover="handleDragOver($event, champion)"
        @dragenter="handleDragEnter($event, champion)"
        @dragleave="handleDragLeave"
        @drop="handleDrop($event, champion)"
        :class="[
          'p-4 border border-gray-300 rounded-lg cursor-move transition-all duration-300 bg-white hover:bg-gray-50 flex flex-col items-center',
          { 'opacity-80 scale-95': draggedChampion?.id === champion.id }, // Estilo para o item sendo arrastado
          {
            'border-2 border-dashed border-blue-500 bg-blue-50':
              dragOverChampion?.id === champion.id,
          }, // Estilo para o item sob o cursor
        ]"
      >
        <img
          :src="`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`"
          :alt="champion.name"
          class="w-24 h-24 rounded-full mb-2"
        />
        <span class="text-lg font-semibold">{{ champion.name }}</span>
        <span class="text-sm text-gray-600">{{ champion.title }}</span>
      </div>
    </div>
  </div>
</template>
