<script setup lang="ts" type="module">
import { ref } from "vue";

const jsRootPath = ref("/JsRoot700");
const detecMid = ref("/index.htm?nobrowser&noprogress&file=");
const HttpUrl = ref("http://43.154.8.62:8080");
const detectorSrc = ref(
  jsRootPath.value +
    detecMid.value +
    HttpUrl.value +
    "/root/NaI.root&item=Default;1&opt=transp60;zoomFACTOR=110"
);
</script>

<template>
  <iframe :src="detectorSrc" frameborder="0" class="h-screen w-full"></iframe>
</template>
