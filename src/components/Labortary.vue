<script setup lang="ts">
import { ref, onMounted } from "vue";
import { BasicScene } from "../Babylon/Labortary/BasicScene";

const bjsCanvas = ref();

onMounted(() => {
  new BasicScene(bjsCanvas.value);
});
</script>

<template>
  <canvas ref="bjsCanvas" class="h-screen w-full"></canvas>
</template>

<style scoped></style>
