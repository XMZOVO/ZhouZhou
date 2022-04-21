<template>
  <article v-if="visible" class="mb-5 flex items-start">
    <div class="relative min-w-0 flex-auto space-y-1 px-2">
      <div class="flex border-t py-2">
        <img
          :src="picSrc"
          alt=""
          width="60"
          height="60"
          class="flex-none rounded-md bg-transparent"
        />

        <div class="h-full w-full flex-col">
          <p class="ml-3 truncate pr-20 text-sm font-semibold text-white">
            {{ message.message }}
          </p>

          <p
            class="top-auto flex items-end justify-end pt-5 pr-1 text-sm text-white"
          >
            总评价数：{{ message.good + message.bad }}
          </p>
        </div>
      </div>

      <div
        class="mt-2 flex w-full justify-center space-x-3 border-t pt-2 font-normal"
      >
        <div class="flex items-center space-x-1">
          <svg
            @click="closeComment"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 cursor-pointer rounded-full border p-[2px] text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <dd class="text-sm text-white">关闭</dd>
        </div>

        <div class="flex items-center space-x-1">
          <svg
            @click="goodComment"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 cursor-pointer rounded-full border p-[2px] text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <dd class="text-sm text-white">好评</dd>
        </div>
        <div class="flex items-center space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            @click="badComment"
            class="h-5 w-5 cursor-pointer rounded-full border p-[2px] text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <dd class="text-sm text-white">恶评</dd>
        </div>
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
import axios from "axios";
import { ref, toRef } from "vue";
import { defineProps } from "vue";

const props = defineProps({
  message: Object,
});

const msg = toRef(props, "message");
const visible = ref(true);
const num = Math.floor(Math.random() * 10);
console.log(num);

const httpUrl = "43.154.8.62";
// const httpUrl = 'localhost'

const picSrc = ref("/eldenRing/" + num + ".png");

function goodComment() {
  msg.value.good += 1;
  axios
    .put("http://" + httpUrl + ":8080/message/update", msg.value)
    .then((resp) => {});
}

function badComment() {
  msg.value.bad += 1;
  axios
    .put("http://" + httpUrl + ":8080/message/update", msg.value)
    .then((resp) => {});
}

function closeComment() {
  visible.value = false;
  axios
    .delete("http://" + httpUrl + ":8080/message/delete/" + msg.value.id)
    .then((resp) => {});
}
</script>
